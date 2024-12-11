import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '@env/environments';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor() {}
  private API_URL = `${environments.baseUrl}/Categorium`;
  private http = inject(HttpClient);

  getCategories() {
    return this.http
      .get<any[]>(`${this.API_URL}`)
      .pipe(catchError(() => of([])));
  }

  addCategory(category: any) {
    return this.http.post<any>(`${this.API_URL}`, category);
    // .pipe(catchError(() => of([])));
  }

  deleteCategories(ids: number[]) {
    return this.http.delete<any>(`${this.API_URL}/batch`, {
      body: ids,
    });
  }
}
