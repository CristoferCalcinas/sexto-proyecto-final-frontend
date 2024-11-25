import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor() {}
  private API_URL = 'http://localhost:5210/api';
  private http = inject(HttpClient);

  getCategories() {
    return this.http
      .get<any[]>(`${this.API_URL}/Categorium`)
      .pipe(catchError(() => of([])));
  }

  addCategory(category: any) {
    return this.http.post<any>(`${this.API_URL}/Categorium`, category);
    // .pipe(catchError(() => of([])));
  }

  deleteCategories(ids: number[]) {
    return this.http.delete<any>(`${this.API_URL}/Categorium/batch`, {
      body: ids,
    });
  }
}
