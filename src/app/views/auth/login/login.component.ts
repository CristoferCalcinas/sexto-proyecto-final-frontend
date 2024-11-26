import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthLayoutComponent } from '@shared/layouts/auth-layout/auth-layout.component';

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
      this.myForm.markAllAsTouched(); // Muestra errores en todos los campos si el formulario es inválido
      return;
    }
    const { correoElectronico, contraseña } = this.myForm.value;
    console.log('Datos del formulario:', correoElectronico, contraseña);

    // Simula la redirección después de un inicio de sesión exitoso
    // this.router.navigate(['/dashboard']);
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
