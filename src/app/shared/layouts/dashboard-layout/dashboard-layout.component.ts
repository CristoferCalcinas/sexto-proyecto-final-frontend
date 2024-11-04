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
  public isAdmin = true;

  public sidebarItems = [
    {
      label: 'Listado de Productos',
      icon: 'label',
      url: '/dashboard/products-list',
    },
    {
      label: 'Buscar Producto',
      icon: 'search',
      url: '/dashboard/search',
    },
    {
      label: 'Carrito de Compras',
      icon: 'shopping_cart',
      url: '/dashboard/shopping-cart',
    },
    {
      label: 'Productos en Oferta',
      icon: 'local_offer',
      url: '/dashboard/products-on-sale',
    },
    {
      label: 'Historial de Compras',
      icon: 'history',
      url: '/dashboard/purchase-history',
    },
    {
      label: 'Favoritos',
      icon: 'favorite',
      url: '/dashboard/favorites',
    },
    {
      label: 'Soporte',
      icon: 'support',
      url: '/dashboard/support',
    },
  ];

  public sidebarItemsAdmin = [
    {
      label: 'Añadir Producto',
      icon: 'add',
      url: '/admin/add-product',
    },
    {
      label: 'Listado de Productos (Deep)',
      icon: 'label',
      url: '/admin/products-list',
    },
    {
      label: 'Buscar Producto (Deep)',
      icon: 'search',
      url: '/admin/search',
    },
    {
      label: 'Gestión de Usuarios',
      icon: 'people',
      url: '/admin/user-management',
    },
    {
      label: 'Reportes',
      icon: 'bar_chart',
      url: '/admin/reports',
    },
    // {
    //   label: 'Configuración',
    //   icon: 'settings',
    //   url: './settings',
    // },
  ];
}
