import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';

import { MatListModule, MatSelectionList } from '@angular/material/list';

import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-delete-category-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatListModule,
    AsyncPipe,
  ],
  templateUrl: './delete-category-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCategoryDialogComponent {
  private categoryService = inject(CategoryService);
  public categories$ = this.categoryService.getCategories();
  @ViewChild('ctgy') categoryList!: MatSelectionList;

  deleteCategories() {
    const selectedOptions = this.categoryList.selectedOptions.selected;
    const selectedCategories = selectedOptions.map((option) => option.value);

    if (!selectedCategories.length) return;

    this.categoryService
      .deleteCategories(selectedCategories)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
