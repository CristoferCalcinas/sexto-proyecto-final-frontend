import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-card-summary-component',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './card-summary-component.component.html',
  styles: ``,
})
export class CardSummaryComponentComponent {
  public total: any = input.required();
  public proceedToPayment = output<boolean>();

  onProceedToPayment() {
    this.proceedToPayment.emit(true);
  }
}
