import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API_URL = 'http://localhost:5210/api';
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<any[]>(`${this.API_URL}/Productos`);
  }

  getProductsByName(name: string) {
    return this.http
      .get<any[]>(`${this.API_URL}/Productos/search/${name}`)
      .pipe(catchError(() => of([])));
  }
}
