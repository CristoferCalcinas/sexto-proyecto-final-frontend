import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public customers: any = input.required();
  public onUserClick = input<(id: string) => void>();

  changeUserRole(id: any) {
    const handleClick = this.onUserClick();
    if (handleClick) {
      handleClick(id);
    }
  }
}
