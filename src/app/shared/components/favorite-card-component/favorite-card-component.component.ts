import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { FavoriteService } from '@services/favorite.service';

@Component({
  selector: 'shared-favorite-card-component',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './favorite-card-component.component.html',
  styles: ``,
})
export class FavoriteCardComponent {
  public itemId = input.required<number>();
  public favoriteService = inject(FavoriteService);

  deleteFavorite() {
    this.favoriteService.removeFromWishList(this.itemId());
  }
}
