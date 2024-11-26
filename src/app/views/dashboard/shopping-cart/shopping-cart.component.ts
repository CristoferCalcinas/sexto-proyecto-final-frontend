import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { CardItemComponentComponent } from '@shared/components/card-item-component/card-item-component.component';
import { CardSummaryComponentComponent } from '../../../shared/components/card-summary-component/card-summary-component.component';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    TitleComponent,
    CardItemComponentComponent,
    CardSummaryComponentComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styles: ``,
})
export default class ShoppingCartComponent implements OnInit {
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);

  public shoppingCartItems: any[] = [];

  public detalles: any[] = [];

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.shoppingCartService
      .getShoppingCartByUserId(+userId)
      .subscribe((data: any) => {
        this.shoppingCartItems = data;
        this.detalles = data[0].detalleCarritos;
      });
  }

  get calcularTotal(): number {
    let total = 0;
    this.detalles.forEach((element) => {
      total += element.cantidad * element.producto.precio;
    });
    return total;
  }
}
