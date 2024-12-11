import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AdminCartComponent } from './ui/admin-cart/admin-cart.component';
import { CardItemComponentComponent } from '@shared/components/card-item-component/card-item-component.component';
import { CardSummaryComponentComponent } from '@shared/components/card-summary-component/card-summary-component.component';

import { UserService } from '@services/user.service';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    TitleComponent,
    CardItemComponentComponent,
    CardSummaryComponentComponent,
    AdminCartComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styles: ``,
})
export default class ShoppingCartComponent implements OnInit {
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private userService = inject(UserService);

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
    console.log(confirm);
    if (!confirm) return;

    console.log(this.detalles);
    const cantidades = this.detalles.map((detalle) => ({
      cantidad: detalle.cantidad,
      productoId: detalle.producto.id,
    }));
    console.log(cantidades);
  }
}
