import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeService } from '../../../../../services/employee.service';

@Component({
  selector: 'ui-employees-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './employees-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  private employeeService = inject(EmployeeService);
  public employees = this.employeeService.getAllEmployees();

  printTest() {
    console.log(this.employees.subscribe((a) => console.log(a)));
  }

  optionsEmployee(id: any) {
    console.log(id);
  }
}
