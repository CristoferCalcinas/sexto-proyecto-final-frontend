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
    this.purchaseService
      .getPurchaseHistoryByUserId('4')
      .subscribe((purchase) => {
        console.log(purchase);
        if (!purchase.detalleCompras) return;

        const products: HistorySummary[] = purchase.detalleCompras.map(
          (detalle) => {
            return {
              productName: detalle.producto.nombreProducto,
              quantity: detalle.cantidad,
              unitPrice: detalle.producto.precio,
            };
          }
        );

        this.purchaseHistory.set(products);
      });
  }
}
