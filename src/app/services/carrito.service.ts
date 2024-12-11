import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '@env/environments';

import { ShoppingCard } from '@models/carrito.interface';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private API_URL = `${environments.baseUrl}/Carrito`;
  private http = inject(HttpClient);

  getCarritoByUserId(userId: number) {
    return this.http.get<ShoppingCard>(`${this.API_URL}/last/${userId}`);
  }
}
