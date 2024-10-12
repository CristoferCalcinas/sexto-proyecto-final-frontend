import { Component } from '@angular/core';
import { TitleComponentComponent } from "@shared/components/title-component/title-component.component";
import { CardItemComponentComponent } from "@shared/components/card-item-component/card-item-component.component";
import { CardSummaryComponentComponent } from "../../../shared/components/card-summary-component/card-summary-component.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [TitleComponentComponent, CardItemComponentComponent, CardSummaryComponentComponent],
  templateUrl: './shopping-cart.component.html',
  styles: ``
})
export default class ShoppingCartComponent {

}
