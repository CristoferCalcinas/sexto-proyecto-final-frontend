import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  public sidebarItems = [
    {
      label: 'Listado de Productos',
      icon: 'label',
      url: './products-list',
    },
    {
      label: 'Buscar Producto',
      icon: 'search',
      url: './search',
    },
    {
      label: 'Productos en Oferta',
      icon: 'local_offer',
      url: './products-on-sale',
    },
    {
      label: 'Perfil del Usuario',
      icon: 'person',
      url: './user-profile',
    },
    {
      label: 'Historial de Compras',
      icon: 'history',
      url: './purchase-history',
    },
    {
      label: 'Carrito de Compras',
      icon: 'shopping_cart',
      url: './shopping-cart',
    },
    {
      label: 'Favoritos',
      icon: 'favorite',
      url: './favorites',
    },
    {
      label: 'Soporte',
      icon: 'support',
      url: './support',
    },
  ];

  public sidebarItemsAdmin = [
    {
      label: 'Listado de Productos',
      icon: 'label',
      url: './admin-products-list',
    },
    {
      label: 'Añadir Producto',
      icon: 'add',
      url: './admin-add-product',
    },
    {
      label: 'Buscar Producto',
      icon: 'search',
      url: './admin-search',
    },
    {
      label: 'Gestión de Usuarios',
      icon: 'people',
      url: './admin-user-management',
    },
    {
      label: 'Reportes',
      icon: 'bar_chart',
      url: './admin-reports',
    },
    // {
    //   label: 'Configuración',
    //   icon: 'settings',
    //   url: './admin-settings',
    // },
  ];
}
