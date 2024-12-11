import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { environments } from '@env/environments';
import { Product } from '@models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API_URL = `${environments.baseUrl}/Productos`;
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<Product[]>(`${this.API_URL}`);
  }

  getProductsByName(name: string) {
    return this.http
      .get<Product[]>(`${this.API_URL}/search/${name}`)
      .pipe(catchError(() => of([])));
  }

  getProductById(id: string) {
    return this.http
      .get<Product>(`${this.API_URL}/${id}`)
      .pipe(catchError(() => of(null)));
  }

  addProduct(product: Partial<Product>) {
    return this.http.post<Product>(`${this.API_URL}`, product);
  }

  updateProduct(product: Partial<Product>) {
    return this.http.put<Product>(`${this.API_URL}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.API_URL}/${id}`);
  }
}
