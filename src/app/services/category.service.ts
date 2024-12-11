import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { environments } from '@env/environments';
import { Category } from '@models/category.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private API_URL = `${environments.baseUrl}/Categorium`;
  private http = inject(HttpClient);

  getCategories() {
    return this.http
      .get<Category[]>(`${this.API_URL}`)
      .pipe(catchError(() => of([])));
  }

  addCategory(category: any) {
    return this.http
      .post<Category>(`${this.API_URL}`, category)
      .pipe(catchError(() => of(null)));
  }

  deleteCategories(ids: number[]) {
    return this.http
      .delete<Category>(`${this.API_URL}/batch`, {
        body: ids,
      })
      .pipe(catchError(() => of(null)));
  }
}
