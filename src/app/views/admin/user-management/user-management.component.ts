import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserListComponent } from './ui/user-list/user-list.component';
import { EmployeesListComponent } from './ui/employees-list/employees-list.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, EmployeesListComponent],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  public visibleUserList = true;
  public visibleEmployeeList = true;

  public suppliers: any[] = [];
  public admins: any[] = [];
  public customers: any[] = [];

  ngOnInit(): void {
    // Tener todos los usuarios en un solo arreglo
    const users = this.userService.getAllUsers().subscribe((users) => {

      const categorizedUsers = {
        suppliers: [] as any[],
        admins: [] as any[],
        customers: [] as any[],
      };

      // Filtrar usuarios por rol
      users.forEach((user: any) => {
        if (user.rol.nombreRol === 'Proveedor') {
          categorizedUsers.suppliers.push(user);
        } else if (user.rol.nombreRol === 'Administrador') {
          categorizedUsers.admins.push(user);
        } else {
          categorizedUsers.customers.push(user);
        }
      });

      // Asignar a las propiedades de la clase
      this.suppliers = categorizedUsers.suppliers;
      this.admins = categorizedUsers.admins;
      this.customers = categorizedUsers.customers;

    });
  }
}
