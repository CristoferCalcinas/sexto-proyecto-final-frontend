import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-dialog-category',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCategoryComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<DialogCategoryComponent>); // Inyectamos MatDialogRef

  public myForm = this.fb.group({
    nombreCategoria: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
  });

  createCategory() {
    if (!this.myForm.valid) return;

    this.categoryService.addCategory(this.myForm.value).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res); // Enviamos la categoría creada
    });
  }
}
