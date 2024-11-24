import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';
import { ProductsService } from '../../../services/products-list.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsListComponent {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public products: Observable<any[]> = this.productsService.getAllProducts();

  editProduct(product: any) {
    this.router.navigate(['/admin/edit-product', product.id]);
  }

  deleteProduct(product: any) {
    console.log(product);
  }
}
