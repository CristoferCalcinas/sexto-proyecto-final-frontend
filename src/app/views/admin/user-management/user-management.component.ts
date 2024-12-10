import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { UserListComponent } from './ui/user-list/user-list.component';
import { EmployeesListComponent } from './ui/employees-list/employees-list.component';
import { UserService } from '../../../services/user.service';
import { User } from '@models/user.interface';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, EmployeesListComponent],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManagementComponent implements OnInit {
  private userService = inject(UserService);

  // Usar signals para una gestión más reactiva del estado
  usersSignal = signal<User[]>([]);

  isVisibleUserList = signal(false);
  isVisibleAdminList = signal(false);
  isVisibleSupplierList = signal(false);

  getUsersByRole(role: string): User[] {
    return this.usersSignal().filter((user) => user.rol.nombreRol === role);
  }

  ngOnInit(): void {
    this.userService.getAllUsers().pipe(
      tap((users) => {
        // Actualizar el signal con los usuarios cargados
        this.usersSignal.set(users);

        // Activar automáticamente las listas si hay usuarios en cada categoría
        this.isVisibleUserList.set(this.getUsersByRole('Cliente').length > 0);
        this.isVisibleAdminList.set(this.getUsersByRole('Administrador').length > 0);
        this.isVisibleSupplierList.set(this.getUsersByRole('Proveedor').length > 0);
      }),
      catchError((err) => {
        console.error('Error al cargar usuarios', err);
        return [];
      })
    ).subscribe();
  }
}
