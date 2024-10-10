import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthLayoutComponent } from "./shared/layouts/auth-layout/auth-layout.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, AuthLayoutComponent, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Libreria';
}
