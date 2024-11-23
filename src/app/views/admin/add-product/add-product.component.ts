import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';

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

  printTest() {
    console.log('Changes detected');
    console.log(this.suppliers$);
  }

  saveProduct() {
    console.log(this.myForm.valid);
  }
}
