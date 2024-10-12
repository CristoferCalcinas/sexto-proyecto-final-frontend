import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component'),
    children: [
      {
        path: 'products-list',
        title: 'Lista de Productos',
        loadComponent: () =>
          import('./views/dashboard/products-list/products-list.component'),
      },
      {
        path: 'product',
        title: 'Producto',
        loadComponent: () =>
          import('./views/dashboard/product/product.component'),
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
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
