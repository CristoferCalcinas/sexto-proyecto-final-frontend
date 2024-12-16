import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthLayoutComponent } from '@shared/layouts/auth-layout/auth-layout.component';

import { UserService } from '@services/user.service';

@Component({
  selector: 'view-register',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styles: ``,
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public myForm = this.fb.group({
    nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { nombreCliente, correoElectronico, contraseña } = this.myForm.value;

    if (
      !nombreCliente?.trim() ||
      !correoElectronico?.trim() ||
      !contraseña?.trim()
    )
      return;

    this.userService
      .register(nombreCliente, correoElectronico, contraseña)
      .pipe(
        // Verificamos que la respuesta sea válida
        tap((resp) => {
          if (!resp) {
            throw new Error('Registro fallido: respuesta inválida');
          }
        }),
        // Limpiamos y configuramos el localStorage
        tap((resp) => {
          localStorage.clear();
          localStorage.setItem('userId', resp.id.toString());
          localStorage.setItem('userEmail', resp.correoElectronico);
        }),
        // Redirigimos al usuario tras registro exitoso
        switchMap(() => this.router.navigate(['/dashboard/products-list'])),
        // Manejamos errores globalmente
        catchError((error) => {
          console.error('Error en el registro o redirección:', error);
          return EMPTY; // Finalizamos el flujo
        })
      )
      .subscribe();
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.myForm.get(controlName)!;
    return control.hasError(errorName) && (control.dirty || control.touched);
  }
}
