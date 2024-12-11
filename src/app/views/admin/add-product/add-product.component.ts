import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DialogCategoryComponent } from './ui/dialog-category/dialog-category.component';
import { DialogSupplierComponent } from './ui/dialog-supplier/dialog-supplier.component';
import { DeleteCategoryDialogComponent } from './ui/delete-category-dialog/delete-category-dialog.component';
import { DeleteSupplierDialogComponent } from './ui/delete-supplier-dialog/delete-supplier-dialog.component';

import { CategoryService } from '@services/category.service';
import { ProductsService } from '@services/products-list.service';
import { SupplierService } from '@services/supplier.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddProductComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router)
  private supplierService = inject(SupplierService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductsService);

  public suppliers$ = this.supplierService.getSuppliers();
  public categories$ = this.categoryService.getCategories();

  public myForm = this.fb.group({
    productTitle: ['', Validators.required],
    productDescription: ['', Validators.required],
    productPrice: ['', Validators.required],
    productQuantity: ['', Validators.required],
    productCategory: ['', Validators.required],
    productSupplier: ['', Validators.required],
  });

  saveProduct() {
    if (!this.myForm.valid) return;

    let transformedProduct = {
      nombreProducto: this.myForm.get('productTitle')?.value ?? '',
      descripcion: this.myForm.get('productDescription')?.value ?? '',
      precio: Number.parseFloat(this.myForm.get('productPrice')?.value ?? '0'),
      cantidadStock: Number.parseInt(
        this.myForm.get('productQuantity')?.value ?? '0'
      ),
      categoriaId: Number.parseInt(
        this.myForm.get('productCategory')?.value ?? '0'
      ),
      proveedorId: Number.parseInt(
        this.myForm.get('productSupplier')?.value ?? '0'
      ),
    };
    this.productService.addProduct(transformedProduct).subscribe((res) => {
      console.log(res);
      this.router.navigate(['admin/edit-product', res.id])
    });

    this.myForm.reset();
  }

  readonly dialog = inject(MatDialog);

  addCategory() {
    const dialogRef = this.dialog.open(DialogCategoryComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.categories$ = this.categoryService.getCategories();
        this.myForm.patchValue({
          productCategory: result.id,
        });
      }
    });
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
    });
  }

  addSupplier() {
    const dialogRef = this.dialog.open(DialogSupplierComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.suppliers$ = this.supplierService.getSuppliers();
        this.myForm.patchValue({
          productSupplier: result.id,
        });
      }
    });
  }

  deleteSupplier() {
    const dialogRef = this.dialog.open(DeleteSupplierDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
    });
  }
}
