import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { environments } from '@env/environments';
import { ShoppingCardDetail } from '@models/carrito.interface';

interface DetalleCarritoChanges {
  cantidad?: number;
}

@Injectable({ providedIn: 'root' })
export class DetalleCarritoService {
  private readonly API_URL = `${environments.baseUrl}/DetalleCarrito`;
  private http = inject(HttpClient);

  patchDetalleCarrito(id: number, changes: DetalleCarritoChanges) {
    return this.http
      .patch<ShoppingCardDetail>(`${this.API_URL}/${id}`, changes)
      .pipe(catchError(() => of([])));
  }

  createDetalleCarrito(
    carritoId: number,
    productoId: number,
    precioUnitario: number,
    cantidad: number = 1
  ) {
    const detalleCarritoBody = {
      carritoId,
      productoId,
      cantidad,
      precioUnitario,
    } as Partial<ShoppingCardDetail>;

    return this.http.post<ShoppingCardDetail>(
      `${this.API_URL}`,
      detalleCarritoBody
    );
  }

  deleteDetalleCarrito(id: number) {
    return this.http.delete<ShoppingCardDetail>(`${this.API_URL}/${id}`);
  }
}
