import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-card-item-component',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './card-item-component.component.html',
  styles: ``,
})
export class CardItemComponentComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
