import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManagementComponent {
  private userProfileService = inject(UserService);
  public users = this.userProfileService.getAllUsers();

  changeUserRole(id: any) {
    console.log(id);
  }
}
