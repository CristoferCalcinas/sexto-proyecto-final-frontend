import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';
import { DialogDeleteProductComponent } from './ui/dialog-delete-product/dialog-delete-product.component';

import { ProductsService } from '@services/products-list.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private productsSubject = new BehaviorSubject<any[]>([]);
  public products = this.productsSubject.asObservable();

  editProduct(product: any) {
    this.router.navigate(['/admin/edit-product', product.id]);
  }

  deleteProduct(product: any) {
    console.log(product);
    this.openDialog('50ms', '100ms', product);
  }

  private loadProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    product: any
  ): void {
    const dialogRef = this.dialog.open(DialogDeleteProductComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: product,
    });

    dialogRef
      .afterClosed()
      .pipe(
        // Si el diálogo confirma la eliminación, llamamos al servicio de eliminación
        switchMap((result) =>
          result ? this.productsService.deleteProduct(product.id) : []
        ),
        // Una vez eliminado, volvemos a cargar los productos
        tap(() => this.loadProducts())
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.loadProducts();
  }
}
