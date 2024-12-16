import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

import { ProductsService } from '@services/product.service';

import { Product } from '@models/product.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoService } from '@services/carrito.service';
import { DetalleCarritoService } from '@services/detalle-carrito.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styles: ``,
})
export default class ProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private carritoService = inject(CarritoService);
  private productsService = inject(ProductsService);
  private detalleCarritoService = inject(DetalleCarritoService);

  public product?: Product;
  public loading = true;
  public quantity = this.fb.control(1, [Validators.min(1), Validators.max(5)]);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // delay(1500),
        switchMap(({ id }) => this.productsService.getProductById(id))
      )
      .subscribe((product) => {
        if (!product) return this.router.navigate(['/dashboard/products-list']);

        this.product = product;
        this.loading = false;
        // console.log(this.product);
        return;
      });

    // TODO: Agregar la cantidad de productos al carrito, min(1) max(5)
  }

  addProductToCart() {
    if (!this.product) return;

    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.carritoService
      .getCarritoByUserId(+userId)
      .pipe(
        switchMap((carrito) =>
          this.detalleCarritoService.createDetalleCarrito(
            carrito.id,
            this.product!.id,
            this.product!.precio,
            this.quantity.value ? this.quantity.value : 1
          )
        ),
        catchError((error) => {
          console.error('Error al agregar producto al carrito', error);
          return of(null);
        })
      )
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['dashboard/shopping-cart']);
      });
  }
}
