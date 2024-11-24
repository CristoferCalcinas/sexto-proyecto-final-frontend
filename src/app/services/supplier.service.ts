import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private API_URL = 'http://localhost:5210/api';
  private http = inject(HttpClient);

  getSuppliers() {
    return this.http
      .get<any[]>(`${this.API_URL}/Proveedor`)
      .pipe(catchError(() => of([])));
  }

  addSupplier(supplier: any) {
    return this.http.post(`${this.API_URL}/Proveedor`, supplier);
  }
}
