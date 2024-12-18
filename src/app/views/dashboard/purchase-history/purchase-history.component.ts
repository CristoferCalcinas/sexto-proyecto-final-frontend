import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { TitleComponent } from '@shared/components/title-component/title-component.component';

import { PurchaseService } from '@services/purchase.service';

interface HistorySummary {
  productName: string;
  quantity: number;
  unitPrice: number;
}

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, TitleComponent],
  templateUrl: './purchase-history.component.html',
  styles: ``,
})
export default class PurchaseHistoryComponent implements OnInit {
  private purchaseService = inject(PurchaseService);

  public displayedColumns: string[] = ['productName', 'quantity', 'unitPrice'];
  public purchaseHistory = signal<HistorySummary[]>([]);

  getTotalCost() {
    return this.purchaseHistory().reduce(
      (acc, value) => acc + value.quantity * value.unitPrice,
      0
    );
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) return;

    this.purchaseService
      .getPurchaseHistoryByUserId(userId)
      .subscribe((purchase) => {
        if (!purchase.length) return;

        const products: HistorySummary[] = purchase.map((detalle) => {
          const { cantidad = 0, precioUnitario = 0 } = detalle.detalleCompras[0] || {};
          return {
            productName: detalle.detalleCompras
              .map((detalleCompra) => detalleCompra.producto.nombreProducto)
              .join(', '),
            quantity: cantidad,
            unitPrice: precioUnitario,
          };
        });

        this.purchaseHistory.set(products);
      });
  }
}
