import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { ProductsService } from '../../../services/products-list.service';
import { CarritoService } from '../../../services/carrito.service';
import { DetalleCarritoService } from '../../../services/detalle-carrito.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

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

  public productsByCategory: any = {};

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      // this.products = products;
      // Agrupar los productos por categoría
      this.productsByCategory = products.reduce((acc, product) => {
        const category = product.categoria.nombreCategoria;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(product);
        return acc;
      }, {});
    });
  }

  addProductToCart(product: any) {
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
            1,
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
