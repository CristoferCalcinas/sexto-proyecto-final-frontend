import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { BentoGridComponentComponent } from '@shared/components/bento-grid-component/bento-grid-component.component';

import { PromotionService } from '@services/promotion.service';

@Component({
  selector: 'app-products-on-sale',
  standalone: true,
  imports: [
    TitleComponent,
    BentoGridComponentComponent,
    RouterLink,
  ],
  templateUrl: './products-on-sale.component.html',
  styles: ``,
})
export default class ProductsOnSaleComponent implements OnInit {
  private promotionService = inject(PromotionService);
  public promotions: any[] = [];

  ngOnInit(): void {
    this.promotionService.getAllPromotions().subscribe((promotions) => {
      this.promotions = promotions;
    });
  }

  /**
   * Divide el array de promociones en grupos de 4 elementos
   * @returns Array de arrays, donde cada subarray tiene máximo 4 elementos
   */
  public getPromotionGroups(): any[][] {
    const groups: any[][] = [];
    const totalPromotions = this.promotions.length;

    for (let i = 0; i < totalPromotions; i += 4) {
      groups.push(this.promotions.slice(i, i + 4));
    }

    return groups;
  }
}
