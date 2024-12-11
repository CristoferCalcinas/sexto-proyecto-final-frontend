import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { catchError, tap } from 'rxjs';

import { User } from '@models/user.interface';
import { UserService } from '@services/user.service';

import { UserListComponent } from './ui/user-list/user-list.component';
import { EmployeesListComponent } from './ui/employees-list/employees-list.component';

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
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(
        tap((users) => {
          // Actualizar el signal con los usuarios cargados
          this.usersSignal.set(users);

          // Activar automáticamente las listas si hay usuarios en cada categoría
          this.isVisibleUserList.set(this.getUsersByRole('Cliente').length > 0);
          this.isVisibleAdminList.set(
            this.getUsersByRole('Administrador').length > 0
          );
          this.isVisibleSupplierList.set(
            this.getUsersByRole('Empleado').length > 0
          );
        }),
        catchError((err) => {
          console.error('Error al cargar usuarios', err);
          return [];
        })
      )
      .subscribe();
  }

  updateClientRoleToEmployee(userId: string): void {
    this.userService.chageRoleToEmployee(+userId).subscribe((user) => {
      // Actualizar el signal con los nuevos datos de usuario y recargar los usuarios
      this.loadUsers();
    });
  }

  updateEmployeeRoleToClient(userId: string): void {
    // Implement the logic to change the role of the employee to 'Cliente'
    this.userService.chageRoleToUser(+userId).subscribe((user) => {
      // Update the signal with the new user data and reload the users
      this.loadUsers();
    });
  }

  inactiveAdministrator(userId: string) {
    console.log(userId);
    this.userService.changeToInactive(+userId).subscribe((user) => {
      this.loadUsers();
    });
  }
}
