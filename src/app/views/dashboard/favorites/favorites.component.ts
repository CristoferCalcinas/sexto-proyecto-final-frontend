import { Component, OnInit } from '@angular/core';
import { TitleComponentComponent } from '@shared/components/title-component/title-component.component';
import { FavoriteCardComponentComponent } from '../../../shared/components/favorite-card-component/favorite-card-component.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatOption,
} from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    AsyncPipe,
    FavoriteCardComponentComponent,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    TitleComponentComponent,
  ],
  templateUrl: './favorites.component.html',
  styles: ``,
})
export default class FavoritesComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
