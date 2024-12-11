import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { EmptyComponent } from "./ui/empty.component";
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { FavoriteCardComponentComponent } from '@shared/components/favorite-card-component/favorite-card-component.component';

import { FavoriteService } from '@services/favorite.service';

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
    TitleComponent,
    EmptyComponent
],
  templateUrl: './favorites.component.html',
  styles: ``,
})
export default class FavoritesComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = inject(FavoriteService).wishList;
  // options: string[] = [];
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
