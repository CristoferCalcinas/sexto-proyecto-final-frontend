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
import { User } from '@models/user.interface';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, EmployeesListComponent],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  public isVisibleUserList = true;
  public isVisibleAdminList = true;
  public isVisibleSupplierList = true;

  public allUsers: User[] = [];

  getUsersByRole(role: string): User[] {
    return this.allUsers.filter((user) => user.rol.nombreRol === role);
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }
}
