import { Component } from '@angular/core';
import { ProductCardComponent } from "../../../controllers/product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styles: ``
})
export default class ProductsListComponent {

}
