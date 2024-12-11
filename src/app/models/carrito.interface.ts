export interface ShoppingCard {
  id:              number;
  usuarioId:       number;
  fechaCreacion:   Date;
  estadoCarrito:   string;
  detalleCarritos: any[];
  usuario:         null;
}
