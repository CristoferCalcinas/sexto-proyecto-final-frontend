import { Component } from '@angular/core';
import { ProductCardComponent } from "../../../controllers/product-card/product-card.component";
import { TitleComponentComponent } from "../../../shared/components/title-component/title-component.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, TitleComponentComponent],
  templateUrl: './products-list.component.html',
  styles: ``
})
export default class ProductsListComponent {

}
