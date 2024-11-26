import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DetalleCarritoService } from '../../../services/detalle-carrito.service';

@Component({
  selector: 'shared-card-item-component',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card-item-component.component.html',
  styles: ``,
})
export class CardItemComponentComponent {
  public detalle: any = input.required();
  private detalleCarritoService = inject(DetalleCarritoService);

  changeQuantity(quantity: number) {
    if (quantity < 0 && this.detalle().cantidad === 1) {
      return;
    }
    this.detalle().cantidad += quantity;
    this.detalleCarritoService
      .patchDetalleCarrito(this.detalle().id, {
        cantidad: this.detalle().cantidad,
      })
      .subscribe();
  }

  onDeleteItem() {
    console.log('onDeleteItem', this.detalle().id);
    this.detalleCarritoService.deleteDetalleCarrito(this.detalle().id).subscribe();
  }
}
