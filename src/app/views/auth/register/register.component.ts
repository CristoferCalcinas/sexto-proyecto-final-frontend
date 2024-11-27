import { Component, inject } from '@angular/core';
import { AuthLayoutComponent } from '@shared/layouts/auth-layout/auth-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { catchError, EMPTY, tap } from 'rxjs';

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
      .register({ nombreCliente, correoElectronico })
      .pipe(
        tap((resp) => {
          if (!resp) return;

          // Guardar información esencial en localStorage
          localStorage.setItem('userId', resp.id.toString());
          localStorage.setItem('userEmail', resp.correoElectronico);

          // Información sensible NO debe guardarse en localStorage
          console.log('Registro exitoso');
        }),
        catchError((error) => {
          // Manejo de errores en el registro
          console.error('Error en el registro', error);
          return EMPTY;
        })
      )
      .subscribe({
        next: () => {
          // Navegación tras registro exitoso
          this.router.navigate(['/dashboard/products-list']);
        },
      });
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.myForm.get(controlName)!;
    return control.hasError(errorName) && (control.dirty || control.touched);
  }
}
