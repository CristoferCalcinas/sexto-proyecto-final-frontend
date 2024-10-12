import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TitleComponentComponent } from '@shared/components/title-component/title-component.component';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, TitleComponentComponent],
  templateUrl: './purchase-history.component.html',
  styles: ``,
})
export default class PurchaseHistoryComponent {
  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },
    { item: 'Sunscreen', cost: 4 },
    { item: 'Cooler', cost: 25 },
    { item: 'Swim suit', cost: 15 },
  ];

  getTotalCost() {
    return this.transactions
      .map((t) => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }
}
