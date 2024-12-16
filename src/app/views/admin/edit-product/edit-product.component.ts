import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductsService } from '@services/product.service';
import type { Product } from '@models/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public myForm = this.fb.group({
    nombreProducto: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0)]],
    cantidadStock: ['', [Validators.required, Validators.min(0)]],
    categoriaId: [''],
    proveedorId: [''],
  });

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productService.getProductById(id)))
      .subscribe((product) => {
        if (!product) return;
        this.myForm.patchValue({
          nombreProducto: product.nombreProducto,
          descripcion: product.descripcion,
          precio: product.precio.toString(),
          cantidadStock: product.cantidadStock.toString(),
          categoriaId: product.categoriaId?.toString(),
          proveedorId: product.proveedorId?.toString(),
        });
      });
  }

  updateProduct() {
    if (this.myForm.invalid) return;
    if (this.myForm.pristine) return;

    const formValues = this.myForm.value;

    const productToUpdate: Partial<Product> = {
      id: +this.activatedRoute.snapshot.params['id'],
      nombreProducto: formValues.nombreProducto || '',
      descripcion: formValues.descripcion || '',
      precio: formValues.precio ? +formValues.precio : 0,
      cantidadStock: formValues.cantidadStock ? +formValues.cantidadStock : 0,
      categoriaId: formValues.categoriaId ? +formValues.categoriaId : undefined,
      proveedorId: formValues.proveedorId ? +formValues.proveedorId : undefined,
    };

    this.productService.updateProduct(productToUpdate).subscribe((product) => {
      console.log(product);
      this.router.navigate(['/admin/products-list']);
    });
  }
}
