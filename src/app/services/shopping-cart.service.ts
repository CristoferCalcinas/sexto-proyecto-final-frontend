import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private API_URL = environments.baseUrl;

  private http = inject(HttpClient);

  getShoppingCartByUserId(id: number) {
    return this.http.get(`${this.API_URL}/Carrito/details/${id}`);
  }
}
