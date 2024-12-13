import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Product } from '@models/product.interface';

import { FavoriteService } from '@services/favorite.service';
import { ProductsService } from '@services/products.service';
import { CommonModule } from '@angular/common';

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
  public product: Product | undefined;

  deleteFavorite() {
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
