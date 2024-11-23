import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddProductComponent {
  private fb = inject(FormBuilder);
  public myForm = this.fb.group({
    productTitle: ['', Validators.required],
    productDescription: ['', Validators.required],
    productPrice: ['', Validators.required],
    productQuantity: ['', Validators.required],
    productCategory: ['', Validators.required],
    productSupplier: ['', Validators.required],
  });
}
