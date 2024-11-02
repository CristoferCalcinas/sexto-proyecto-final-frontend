import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private readonly API_URL = 'http://localhost:5210/api';
  private http = inject(HttpClient);

  getAllPromotions() {
    return this.http
      .get<any[]>(`${this.API_URL}/Promocion`)
      .pipe(catchError(() => of([])));
  }
}
