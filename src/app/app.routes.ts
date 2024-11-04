import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component'),
    children: [
      {
        path: 'favorites',
        title: 'Productos Favoritos',
        loadComponent: () =>
          import('./views/dashboard/favorites/favorites.component'),
      },
      {
        path: 'product/:id',
        title: 'Producto',
        loadComponent: () =>
          import('./views/dashboard/product/product.component'),
      },
      {
        path: 'products-list',
        title: 'Lista de Productos',
        loadComponent: () =>
          import('./views/dashboard/products-list/products-list.component'),
      },
      {
        path: 'products-on-sale',
        title: 'Productos en Oferta',
        loadComponent: () =>
          import(
            './views/dashboard/products-on-sale/products-on-sale.component'
          ),
      },
      {
        path: 'purchase-history',
        title: 'Historial de Compras',
        loadComponent: () =>
          import(
            './views/dashboard/purchase-history/purchase-history.component'
          ),
      },
      {
        path: 'search',
        title: 'Buscar Producto',
        loadComponent: () =>
          import('./views/dashboard/search/search.component'),
      },
      {
        path: 'shopping-cart',
        title: 'Carrito de Compras',
        loadComponent: () =>
          import('./views/dashboard/shopping-cart/shopping-cart.component'),
      },
      {
        path: 'support',
        title: 'Soporte Técnico',
        loadComponent: () =>
          import('./views/dashboard/support/support.component'),
      },
      {
        path: 'user-profile',
        title: 'Perfil del Usuario',
        loadComponent: () =>
          import('./views/dashboard/user-profile/user-profile.component'),
      },
      {
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./views/auth/login/login.component'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./views/auth/register/register.component'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./views/admin/admin.component'),
    children: [
      {
        path: 'add-product',
        title: 'Agregar Producto',
        loadComponent: () =>
          import('./views/admin/add-product/add-product.component'),
      },
      {
        path: 'products-list',
        title: 'Listado de Productos (Deep)',
        loadComponent: () =>
          import('./views/admin/products-list/products-list.component'),
      },
      {
        path: 'search',
        title: 'Buscar Producto (Deep)',
        loadComponent: () => import('./views/admin/search/search.component'),
      },
      {
        path: 'user-management',
        title: 'Gestión de Usuarios',
        loadComponent: () =>
          import('./views/admin/user-management/user-management.component'),
      },
      {
        path: 'reports',
        title: 'Reportes',
        loadComponent: () => import('./views/admin/reports/reports.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
