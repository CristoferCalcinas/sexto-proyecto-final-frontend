import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';

import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';

import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    TitleComponent,
    ProductCardComponent,
  ],
  templateUrl: './search.component.html',
  styles: ``,
})
export default class SearchComponent implements OnInit {
  private productsService = inject(ProductsService);
  readonly searchControl = new FormControl('');

  filteredOptions$: Observable<string[]> = new Observable<string[]>();
  searchResults$ = new BehaviorSubject<any[]>([]);

  readonly placeholders = Array(4).fill(null);

  private productNames: string[] = [];

  ngOnInit(): void {
    this.initializeProductNames();
    this.initializeAutocomplete();
    this.initializeSearch();
  }

  private initializeProductNames(): void {
    this.productsService
      .getAllProducts()
      .pipe(
        map((products) => products.map((product) => product.nombreProducto)),
        catchError(() => [])
      )
      .subscribe((productNames) => {
        this.productNames = productNames;
      });
  }

  private initializeAutocomplete(): void {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value || ''))
    );
  }

  private initializeSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.onSearchInput());
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSearchInput(): void {
    const searchTerm = this.searchControl.value;
    if (!searchTerm?.trim()) {
      this.searchResults$.next([]);
      return;
    }

    this.productsService.getProductsByName(searchTerm).subscribe({
      next: (products) => this.searchResults$.next(products),
      error: () => this.searchResults$.next([]),
    });
  }
}
