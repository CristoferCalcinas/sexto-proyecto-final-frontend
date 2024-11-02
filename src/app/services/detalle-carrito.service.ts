import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { catchError, of } from 'rxjs';

interface DetalleCarritoChanges {
  cantidad?: number;
}

@Injectable({ providedIn: 'root' })
export class DetalleCarritoService {
  private readonly API_URL = environments.baseUrl;
  private http = inject(HttpClient);

  patchDetalleCarrito(id: number, changes: DetalleCarritoChanges) {
    return this.http
      .patch(`${this.API_URL}/DetalleCarrito/${id}`, changes)
      .pipe(catchError(() => of([])));
  }
}
