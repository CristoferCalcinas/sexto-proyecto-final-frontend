import { Product } from "./product.interface";

export interface Category {
  id:              number;
  nombreCategoria: string;
  descripcion:     string;
  productos:       Product[];
}
