import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../controllers/product-card/product-card.component";
import { ProductsService } from '../../../services/products-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsListComponent {
  private productsService = inject(ProductsService);
  public products: Observable<any[]> = this.productsService.getAllProducts();}
