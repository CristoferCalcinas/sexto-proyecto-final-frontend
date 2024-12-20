import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environments } from '@env/environments';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private API_URL = `${environments.baseUrl}/Carrito`;

  private http = inject(HttpClient);

  getShoppingCartByUserId(id: number) {
    return this.http.get(`${this.API_URL}/details/${id}`);
  }

  changeStateShoppingCart(id: number) {
    return this.http.patch(`${this.API_URL}/changeState`, {
      carritoId: id,
    });
  }
}
