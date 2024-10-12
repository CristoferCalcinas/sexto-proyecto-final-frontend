import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthLayoutComponent } from "./shared/layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./shared/layouts/dashboard-layout/dashboard-layout.component";
import DashboardComponent from "./views/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, AuthLayoutComponent, DashboardLayoutComponent, DashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Libreria';
}
