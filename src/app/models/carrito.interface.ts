export interface ShoppingCard {
  id:              number;
  usuarioId:       number;
  fechaCreacion:   Date;
  estadoCarrito:   string;
  detalleCarritos: any[];
  usuario:         null;
}

export interface ShoppingCardDetail {
  id:             number;
  carritoId:      number;
  productoId:     number;
  cantidad:       number;
  precioUnitario: number;
  carrito:        ShoppingCard;
  producto:       null;
}
