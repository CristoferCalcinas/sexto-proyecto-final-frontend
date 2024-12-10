import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'ui-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public customers: any = input.required();

  private userProfileService = inject(UserService);
  public users = this.userProfileService.getAllUsers();

  changeUserRole(id: any) {
    console.log(id);
    console.log(this.customers());
  }
}
