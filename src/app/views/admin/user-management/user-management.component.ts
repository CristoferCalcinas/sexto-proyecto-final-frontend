import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserListComponent } from './ui/user-list/user-list.component';
import { EmployeesListComponent } from './ui/employees-list/employees-list.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, EmployeesListComponent],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManagementComponent {
  public visibleUserList = true;
  public visibleEmployeeList = true;
}
