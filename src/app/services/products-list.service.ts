import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API_URL = environments.baseUrl;
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<any[]>(`${this.API_URL}/Productos`);
  }

  getProductsByName(name: string) {
    return this.http
      .get<any[]>(`${this.API_URL}/Productos/search/${name}`)
      .pipe(catchError(() => of([])));
  }

  getProductById(id: string) {
    return this.http
      .get<any>(`${this.API_URL}/Productos/${id}`)
      .pipe(catchError(() => of(null)));
  }

  addProduct(product: any) {
    return this.http.post<any>(`${this.API_URL}/Productos`, product);
  }
}
