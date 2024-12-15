import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { environments } from '@env/environments';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private API_URL = `${environments.baseUrl}/Proveedor`;
  private http = inject(HttpClient);

  getSuppliers() {
    return this.http
      .get<any[]>(`${this.API_URL}`)
      .pipe(catchError(() => of([])));
  }

  addSupplier(supplier: any) {
    return this.http.post(`${this.API_URL}`, supplier);
  }

  deleteSuppliers(ids: number[]) {
    return this.http.delete(`${this.API_URL}/batch`, {
      body: ids,
    });
  }
}
