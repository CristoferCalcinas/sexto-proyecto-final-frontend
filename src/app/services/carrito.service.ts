import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private API_URL = environments.baseUrl;
  private http = inject(HttpClient);

  getCarritoByUserId(userId: number) {
    return this.http.get<any>(`${this.API_URL}/Carrito/last/${userId}`);
  }
}
