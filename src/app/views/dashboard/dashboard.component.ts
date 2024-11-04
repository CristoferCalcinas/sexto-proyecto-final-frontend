import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '@shared/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardLayoutComponent],
  template: '<shared-dashboard-layout></shared-dashboard-layout>',
  styles: ``,
})
export default class DashboardComponent {}
