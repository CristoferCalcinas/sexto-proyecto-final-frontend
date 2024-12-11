import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  public nameButton = input.required<string>();
  public onEmployeeClick = input<(id: string) => void>();

  changeEmployeeToUser(id: string) {
    const handleClick = this.onEmployeeClick();
    if (handleClick) {
      handleClick(id);
    }
  }
}
