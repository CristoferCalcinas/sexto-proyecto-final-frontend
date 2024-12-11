import { ShoppingCardDetail } from "./carrito.interface";
import { Category } from "./category.interface";

export interface Product {
  id:                      number;
  nombreProducto:          string;
  descripcion:             string;
  precio:                  number;
  cantidadStock:           number;
  categoriaId:             number;
  fechaIngreso:            Date;
  proveedorId:             number;
  categoria:               Category;
  detalleCarritos:         ShoppingCardDetail[];
  detalleCompras:          any[];
  detallePedidoProveedors: any[];
  inventarios:             any[];
  promocions:              any[];
  proveedor:               null;
}
