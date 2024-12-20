import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { catchError, of, switchMap } from 'rxjs';

import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';

import { CarritoService } from '@services/carrito.service';
import { DetalleCarritoService } from '@services/detalle-carrito.service';
import { ProductsService } from '@services/product.service';

import { Product } from '@models/product.interface';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, TitleComponent, CommonModule],
  templateUrl: './products-list.component.html',
  styles: ``,
})
export default class ProductsListComponent implements OnInit {
  private router = inject(Router);
  private productsService = inject(ProductsService);
  private carritoService = inject(CarritoService);
  private detalleCarritoService = inject(DetalleCarritoService);
  public productsByCategory: { [key: string]: Product[] } = {};

  async ngOnInit(): Promise<void> {
    this.productsService.getAllProducts().subscribe((products) => {
      // this.products = products;
      // Agrupar los productos por categoría
      this.productsByCategory = products.reduce((acc: { [key: string]: Product[] }, product) => {
        const category = product.categoria.nombreCategoria;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(product);
        return acc;
      }, {});
    });
  }

  addProductToCart(product: Product): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService
      .getCarritoByUserId(+userId)
      .pipe(
        switchMap((carrito) =>
          this.detalleCarritoService.createDetalleCarrito(
            carrito.id,
            product.id,
            product.precio
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
  }

  getCategories(): string[] {
    return Object.keys(this.productsByCategory);
  }
}
