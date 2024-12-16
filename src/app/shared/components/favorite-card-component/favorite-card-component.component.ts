import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { CarritoService } from '@services/carrito.service';
import { DetalleCarritoService } from '@services/detalle-carrito.service';
import { FavoriteService } from '@services/favorite.service';
import { ProductsService } from '@services/product.service';

import type { Product } from '@models/product.interface';

@Component({
  selector: 'shared-favorite-card-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './favorite-card-component.component.html',
  styles: ``,
})
export class FavoriteCardComponent implements OnInit {
  public itemId = input.required<number>();
  public favoriteService = inject(FavoriteService);
  private productService = inject(ProductsService);
  private carritoService = inject(CarritoService);
  private detalleCarritoService = inject(DetalleCarritoService);
  private router = inject(Router);
  public product: Product | undefined;

  deleteFavorite() {
    this.favoriteService.removeFromWishList(this.itemId());
  }

  addProductToCart(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.product?.id || !this.product?.precio) {
      console.error('No se puede agregar un producto inexistente al carrito');
      return;
    }

    this.carritoService
      .getCarritoByUserId(+userId)
      .pipe(
        switchMap((carrito) =>
          this.detalleCarritoService.createDetalleCarrito(
            carrito.id,
            this.product!.id,
            this.product!.precio
          )
        ),
        catchError((error) => {
          console.error('Error al agregar producto al carrito', error);
          return of(null);
        })
      )
      .subscribe((resp) => {
        console.log(resp);
      });
    this.favoriteService.removeFromWishList(this.itemId());
  }

  ngOnInit(): void {
    this.productService
      .getProductById(this.itemId().toString())
      .subscribe((product) => {
        console.log(product);
        if (product) {
          this.product = product;
        }
      });
  }
}
