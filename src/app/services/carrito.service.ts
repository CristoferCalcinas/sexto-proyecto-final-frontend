import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '@env/environments';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private API_URL = environments.baseUrl;
  private http = inject(HttpClient);

  getCarritoByUserId(userId: number) {
    return this.http.get<any>(`${this.API_URL}/Carrito/last/${userId}`);
  }
}
