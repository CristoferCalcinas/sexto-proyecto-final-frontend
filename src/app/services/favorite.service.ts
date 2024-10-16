import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  public wishList: string[] = [];

  constructor() {
    this.wishList = ['One', 'Two', 'Three'];
  }

  deleteFavorite(itemId: number) {
    this.wishList.splice(itemId, 1);
  }
}
