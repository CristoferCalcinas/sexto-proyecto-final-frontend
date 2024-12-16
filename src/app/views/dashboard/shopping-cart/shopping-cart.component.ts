import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { Router } from '@angular/router';
import {
  catchError,
  EMPTY,
  filter,
  map,
  mergeMap,
  of,
  retry,
  tap,
} from 'rxjs';

import { AdminCartComponent } from './ui/admin-cart/admin-cart.component';
import { CardItemComponent } from '@shared/components/card-item-component/card-item-component.component';
import { CardSummaryComponent } from '@shared/components/card-summary-component/card-summary-component.component';

import { ProductsService } from '@services/product.service';
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
  private shoppingCardId: number = 0;

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
        this.shoppingCardId = data[0].id;
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

    this.productService
      .discountProductQuantity(cantidades)
      .pipe(
        // Solo continúa si se aplica correctamente el descuento
        filter(Boolean),
        // Combina con la actualización del carrito de compras
        mergeMap(() =>
          this.shoppingCartService
            .changeStateShoppingCart(this.shoppingCardId)
            .pipe(
              retry(3) // Reintenta hasta 3 veces en caso de error
            )
        ),
        // Maneja resultados y errores
        tap((_resp) => {
          console.warn(_resp);
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          console.error('Transaction failed:', error);
          // Puedes añadir aquí notificaciones para el usuario
          return EMPTY; // Finaliza el flujo en caso de error crítico
        })
      )
      .subscribe();
  }
}
