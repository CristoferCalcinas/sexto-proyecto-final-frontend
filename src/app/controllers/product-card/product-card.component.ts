import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';

import { FavoriteService } from '@services/favorite.service';
import { Product } from '@models/product.interface';

@Component({
  selector: 'components-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public product = input.required<Product>();
  public favoriteService = inject(FavoriteService);

  toggleFavorite(event: Event) {
    // Detener la propagación para que no se active el routerLink
    event.stopPropagation();

    const productId = this.product().id;

    if (this.favoriteService.isProductInWishList(productId)) {
      this.favoriteService.removeFromWishList(productId);
    } else {
      this.favoriteService.addToWishList(productId);
    }
  }
}
