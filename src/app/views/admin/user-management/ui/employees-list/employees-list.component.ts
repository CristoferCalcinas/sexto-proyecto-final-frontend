import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'ui-employees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  public title = input.required<string>();
  public employees: any = input.required();
  private userService = inject(UserService);


  changeEmployeeToUser(id: any) {
    console.log(id);
    this.userService.chageRoleToUser(id).subscribe((res) => {
      console.log(res);
    });
  }
}
