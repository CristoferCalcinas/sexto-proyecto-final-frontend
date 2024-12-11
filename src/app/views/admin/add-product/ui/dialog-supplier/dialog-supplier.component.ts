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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SupplierService } from '@services/supplier.service';

@Component({
  selector: 'app-dialog-supplier',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-supplier.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSupplierComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(SupplierService);
  private dialogRef = inject(MatDialogRef<DialogSupplierComponent>); // Inyectamos MatDialogRef

  public myForm = this.fb.group({
    telefono: ['', [Validators.required, Validators.minLength(3)]],
    correoElectronico: ['', [Validators.required, Validators.minLength(10)]],
    direccion: ['', [Validators.required, Validators.minLength(10)]],
  });

  createSupplier() {
    if (!this.myForm.valid) return;

    this.categoryService.addSupplier(this.myForm.value).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res); // Enviamos el proveedor creado
    });
  }
}
