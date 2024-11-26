import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthLayoutComponent } from '@shared/layouts/auth-layout/auth-layout.component';
import { UserService } from '../../../services/user.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'view-login',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public hidePassword = true;

  public myForm = this.fb.group({
    correoElectronico: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * Maneja el envío del formulario
   */
  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { correoElectronico, contraseña } = this.myForm.value;

    if (!correoElectronico?.trim() || !contraseña?.trim()) return;

    this.userService
      .login(correoElectronico, contraseña)
      .pipe(
        tap((resp) => {
          if (!resp) return;

          // Guardar información esencial en localStorage
          localStorage.setItem('userId', resp.id.toString());
          localStorage.setItem('userEmail', resp.correoElectronico);

          // Opcional: Guardar información adicional como JSON
          // localStorage.setItem(
          //   'userFullData',
          //   JSON.stringify({
          //     id: resp.id,
          //     nombreCliente: resp.nombreCliente,
          //     correoElectronico: resp.correoElectronico,
          //     fechaRegistro: resp.fechaRegistro,
          //   })
          // );

          // Información sensible NO debe guardarse en localStorage
          console.log('Inicio de sesión exitoso');
        }),
        catchError((error) => {
          // Manejo de errores de inicio de sesión
          console.error('Error de inicio de sesión', error);
          return EMPTY;
        })
      )
      .subscribe({
        next: () => {
          // Navegación tras inicio de sesión exitoso
          this.router.navigate(['/dashboard']);
        },
      });
  }

  /**
   * Método para simplificar la verificación de errores en los controles del formulario
   * @param controlName Nombre del control
   * @param errorName Nombre del error a verificar
   * @returns boolean
   */
  public hasError(controlName: string, errorName: string): boolean {
    const control = this.myForm.get(controlName)!;
    return control.hasError(errorName) && (control.dirty || control.touched);
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
