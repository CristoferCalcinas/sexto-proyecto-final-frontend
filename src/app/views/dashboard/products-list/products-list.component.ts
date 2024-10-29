import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { ProductsService } from '../../../services/products-list.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, TitleComponent],
  templateUrl: './products-list.component.html',
  styles: ``,
})
export default class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);

  public products: any[] = [];

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
