import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../services/products-list.service';

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
    precio: ['', Validators.required],
    cantidadStock: ['', Validators.required],
    categoriaId: [''],
    proveedorId: [''],
  });

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productService.getProductById(id)))
      .subscribe((product) => {
        if (!product) return;
        this.myForm.patchValue(product);
      });
  }

  updateProduct() {
    if (this.myForm.invalid) return;
    if (this.myForm.pristine) return;

    this.productService
      .updateProduct({
        ...this.myForm.value,
        id: +this.activatedRoute.snapshot.params['id'],
      })
      .subscribe((product) => {
        console.log(product);
        this.router.navigate(['/admin/products-list']);
      });
  }
}
