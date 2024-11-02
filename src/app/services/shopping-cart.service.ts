import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private API_URL = 'http://localhost:5210/api';

  private http = inject(HttpClient);

  getShoppingCartByUserId(id: number) {
    return this.http.get(`${this.API_URL}/Carrito/details/${id}`);
  }
}
