import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly urlAllProducts = 'http://localhost:5210/api/Productos';
  private http = inject(HttpClient);
  getAllProducts() {
    return this.http.get<any[]>(this.urlAllProducts);
  }
}
