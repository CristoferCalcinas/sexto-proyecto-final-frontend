import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../services/products-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styles: ``,
})
export default class ProductComponent implements OnInit {
  public product: any = null;
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productsService.getProductById(id)))
      .subscribe((product) => {
        if (!product) return this.router.navigate(['/dashboard/products-list']);

        this.product = product;
        return;
      });
  }
}
