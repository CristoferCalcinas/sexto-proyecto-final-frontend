import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'shared-favorite-card-component',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './favorite-card-component.component.html',
  styles: ``,
})
export class FavoriteCardComponentComponent {
  deleteFavorite() {
    console.log('deleteFavorite');
  }
}
