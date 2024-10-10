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
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
