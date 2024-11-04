import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { ProductsService } from '../../../services/products-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styles: ``,
})
export default class ProductComponent implements OnInit {
  public product: any = null;
  public loading = true;
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1500),
        switchMap(({ id }) => this.productsService.getProductById(id))
      )
      .subscribe((product) => {
        if (!product) return this.router.navigate(['/dashboard/products-list']);

        this.product = product;
        this.loading = false;
        console.log(this.product);
        return;
      });

    // TODO: Agregar la cantidad de productos al carrito, min(1) max(5)
  }

  addProductToCart() {
    if (!this.product) return;
    console.log('Product added to cart');
    console.log(this.product);
  }
}
