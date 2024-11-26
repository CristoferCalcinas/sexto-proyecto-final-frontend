import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../controllers/product-card/product-card.component';
import { TitleComponent } from '@shared/components/title-component/title-component.component';
import { ProductsService } from '../../../services/products-list.service';
import { CarritoService } from '../../../services/carrito.service';
import { DetalleCarritoService } from '../../../services/detalle-carrito.service';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, TitleComponent],
  templateUrl: './products-list.component.html',
  styles: ``,
})
export default class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private carritoService = inject(CarritoService);
  private detalleCarritoService = inject(DetalleCarritoService);

  public products: any[] = [];

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addProductToCart(product: any) {
    this.carritoService
      .getCarritoByUserId(1)
      .pipe(
        switchMap((carrito) =>
          this.detalleCarritoService.createDetalleCarrito(
            carrito.id,
            product.id,
            1,
            product.precio
          )
        ),
        catchError((error) => {
          console.error('Error al agregar producto al carrito', error);
          return of(null);
        })
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
