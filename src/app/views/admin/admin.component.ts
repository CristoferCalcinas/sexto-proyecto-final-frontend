import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutComponent } from "../../shared/layouts/dashboard-layout/dashboard-layout.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  template: `<shared-dashboard-layout></shared-dashboard-layout>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export default class AdminComponent {}
