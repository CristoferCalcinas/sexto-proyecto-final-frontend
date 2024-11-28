import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { catchError, map, of } from 'rxjs';

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
export class DashboardLayoutComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  public isAdmin: boolean = false;
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

  logout(): void {
    try {
      // Check if localStorage is available
      if (!window.localStorage) {
        console.error('localStorage is not available');
        this.router
          .navigate(['/auth/login'])
          .catch((err) => console.error('Navigation failed:', err));
        return;
      }

      // Safely remove items if they exist
      if (localStorage.getItem('userId')) {
        localStorage.removeItem('userId');
      }

      if (localStorage.getItem('userEmail')) {
        localStorage.removeItem('userEmail');
      }

      // Navigate with error handling
      this.router.navigate(['/auth/login']).catch((error) => {
        console.error('Navigation error:', error);
        // Fallback navigation
        window.location.href = '/auth/login';
      });
    } catch (error) {
      console.error('Error during session closure:', error);
      // Ensure user is logged out even if something fails
      window.location.href = '/auth/login';
    }
  }

  ngOnInit(): void {
    this.userService
      .login(localStorage.getItem('userEmail')!, 'password')
      .pipe(
        // Transformar la respuesta para obtener el valor booleano
        map((user) => !user.cargo),
        // Manejar errores y devolver `false` directamente si ocurre uno
        catchError(() => of(false))
      )
      .subscribe((isAdmin) => {
        this.isAdmin = !isAdmin;
      });
  }
}
