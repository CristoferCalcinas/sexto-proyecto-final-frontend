import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '@shared/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
