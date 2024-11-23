import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';
import { ProductsService } from '../../../services/products-list.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddProductComponent {
  private fb = inject(FormBuilder);
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
      cantidadStock: Number.parseInt(this.myForm.get('productQuantity')?.value ?? '0'),
      categoriaId: Number.parseInt(this.myForm.get('productCategory')?.value ?? '0'),
      proveedorId: Number.parseInt(this.myForm.get('productSupplier')?.value ?? '0'),
    };
    this.productService.addProduct(transformedProduct).subscribe((res) => {
      console.log(res);
    });

    this.myForm.reset();
  }
}
