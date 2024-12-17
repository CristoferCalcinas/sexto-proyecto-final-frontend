import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Purchase {
  id:             number;
  usuarioId:      number;
  fechaCompra:    Date;
  totalCompra:    number;
  estado:         string;
  detalleCompras: PurchaseDetail[];
  envios:         any[];
  usuario:        User;
}

export interface PurchaseDetail {
  id:             number;
  compraId:       number;
  productoId:     number;
  cantidad:       number;
  precioUnitario: number;
  subtotal:       number;
  compra:         Purchase;
  producto:       Product;
}
