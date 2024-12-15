import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AdminCartComponent } from './ui/admin-cart/admin-cart.component';
import { CardItemComponent } from '@shared/components/card-item-component/card-item-component.component';
import { CardSummaryComponent } from '@shared/components/card-summary-component/card-summary-component.component';

import { ProductsService } from '@services/products.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    TitleComponent,
    CardItemComponent,
    CardSummaryComponent,
    AdminCartComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styles: ``,
})
export default class ShoppingCartComponent implements OnInit {
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private userService = inject(UserService);
  private productService = inject(ProductsService);

  public isAdmin: boolean = false;
  public shoppingCartItems: any[] = [];

  public detalles: any[] = [];

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.shoppingCartService
      .getShoppingCartByUserId(+userId)
      .subscribe((data: any) => {
        if (!data.length) return;

        this.shoppingCartItems = data;
        this.detalles = data[0].detalleCarritos;
      });

    this.userService
      .getUserById(+userId)
      .pipe(
        // Transformar la respuesta para obtener el valor booleano
        map((user) => user.rol.nombreRol),
        // Manejar errores y devolver `false` directamente si ocurre uno
        catchError(() => of(false))
      )
      .subscribe((isAdmin) => {
        this.isAdmin = !(isAdmin === 'Cliente');
      });
  }

  removeItem(id: number): void {
    this.detalles = this.detalles.filter((detalle) => detalle.id !== id);
  }

  get calcularTotal(): number {
    return this.detalles.reduce((total, element) => {
      return total + element.cantidad * element.producto.precio;
    }, 0);
  }

  onProceedToPayment(confirm: boolean): void {
    if (!confirm) return;

    const cantidades = this.detalles.map((detalle) => ({
      cantidad: detalle.cantidad,
      productoId: detalle.producto.id,
    }));
    this.productService.discountProductQuantity(cantidades).subscribe((products) => {
      // this.router.navigate(['/dashboard/payment']);
      if(products) {
        // marcar como completado el carrito de compras y redirigir al dashboard
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
