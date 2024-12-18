import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';

import { environments } from '@env/environments';
import type { Purchase } from '@models/purchase.interface';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private API_URL = `${environments.baseUrl}/Compra`;
  private http = inject(HttpClient);

  // getPurchaseHistory(): Observable<Purchase[]> {
  //   return this.http.get<Purchase[]>(`${this.API_URL}/purchases/history`);
  // }

  getPurchaseHistoryByUserId(userId: string): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>(`${this.API_URL}/purchases/user?userId=${userId}`)
      .pipe(catchError(() => of([] as Purchase[])));
  }
}
