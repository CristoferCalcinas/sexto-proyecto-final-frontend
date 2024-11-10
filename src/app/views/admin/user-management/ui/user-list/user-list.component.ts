import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'ui-user-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private userProfileService = inject(UserService);
  public users = this.userProfileService.getAllUsers();

  changeUserRole(id: any) {
    console.log(id);
  }
}
