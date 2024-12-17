import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface ShoppingCard {
  id:              number;
  usuarioId:       number;
  fechaCreacion:   Date;
  estadoCarrito:   string;
  detalleCarritos: ShoppingCardDetail[];
  usuario:         User;
}

export interface ShoppingCardDetail {
  id:             number;
  carritoId:      number;
  productoId:     number;
  cantidad:       number;
  precioUnitario: number;
  carrito:        ShoppingCard;
  producto:       Product;
}
