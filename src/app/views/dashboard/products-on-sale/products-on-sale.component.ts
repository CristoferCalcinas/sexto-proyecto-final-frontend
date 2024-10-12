import { Component } from '@angular/core';
import { TitleComponentComponent } from "../../../shared/components/title-component/title-component.component";
import { ProductCardComponent } from "../../../controllers/product-card/product-card.component";
import { BentoGridComponentComponent } from "../../../shared/components/bento-grid-component/bento-grid-component.component";

@Component({
  selector: 'app-products-on-sale',
  standalone: true,
  imports: [TitleComponentComponent, ProductCardComponent, BentoGridComponentComponent],
  templateUrl: './products-on-sale.component.html',
  styles: ``
})
export default class ProductsOnSaleComponent {

}
