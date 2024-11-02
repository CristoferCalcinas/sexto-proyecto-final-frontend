import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-bento-grid-component',
  standalone: true,
  imports: [],
  templateUrl: './bento-grid-component.component.html',
  styles: ``,
})
export class BentoGridComponentComponent implements OnChanges {
  public promotions: any = input.required();
  public bentoGridItems: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promotions']) {
      this.processPromotions();
    }
  }

  private processPromotions(): void {
    const promotionsData = this.promotions();

    // Verificar si hay promociones
    if (!promotionsData || promotionsData.length === 0) {
      this.bentoGridItems = [];
      return;
    }

    // Transformar las promociones de manera más eficiente
    this.bentoGridItems = promotionsData
      .slice(0, 4)
      .map((promotion: any, index: number) => ({
        [`item_${index + 1}`]: promotion || {},
      }));
  }

  // Método opcional para manejar casos límite o realizar transformaciones adicionales
  public getItemDetails(itemIndex: number): any {
    return this.bentoGridItems[itemIndex] || {};
  }
}
