import { Component, inject } from '@angular/core';

import { EmptyComponent } from './ui/empty.component';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { FavoriteCardComponentComponent } from '@shared/components/favorite-card-component/favorite-card-component.component';

import { FavoriteService } from '@services/favorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FavoriteCardComponentComponent, TitleComponent, EmptyComponent],
  templateUrl: './favorites.component.html',
  styles: ``,
})
export default class FavoritesComponent {
  public favoriteService = inject(FavoriteService);
  favoriteList = this.favoriteService.wishList;
}
