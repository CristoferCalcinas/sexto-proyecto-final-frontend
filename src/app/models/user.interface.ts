export interface User {
  id:                number;
  nombreUsuario:     string;
  correoElectronico: string;
  contrasena:        string;
  rolId:             number;
  fechaRegistro:     Date;
  telefono:          string;
  estado:            boolean;
  carritos:          any[];
  compras:           any[];
  rol:               Rol;
}

export interface Rol {
  id:          number;
  nombreRol:   NombreRol;
  descripcion: string;
  usuarios:    null[];
}

export enum NombreRol {
  Administrador = "Administrador",
  Cliente = "Cliente",
  Proveedor = "Proveedor",
}
