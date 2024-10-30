import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'shared-card-summary-component',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './card-summary-component.component.html',
  styles: ``,
})
export class CardSummaryComponentComponent {
  public total: any = input.required();
}
