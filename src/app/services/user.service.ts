import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { environments } from '@env/environments';

import { User } from '@models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = `${environments.baseUrl}/Usuario`;
  private http = inject(HttpClient);

  getAllUsers() {
    return this.http
      .get<User[]>(`${this.API_URL}`)
      .pipe(catchError(() => of([])));
  }

  login(email: string, password: string) {
    // console.log(password);
    return this.http.post<{
      message: string;
      usuario: User;
    }>(`${this.API_URL}/login`, {
      correoElectronico: email,
      password: password,
    });
  }

  register(userName: string, email: string, password: string) {
    return this.http.post<User>(`${this.API_URL}`, {
      nombreUsuario: userName,
      correoElectronico: email,
      contrasena: password,
    });
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  chageRoleToUser(id: number) {
    return this.http.patch<User>(`${this.API_URL}`, {
      userId: id,
    });
  }

  chageRoleToEmployee(id: number) {
    return this.http.patch<User>(`${this.API_URL}/employee`, {
      userId: id,
    });
  }

  changeToInactive(id: number) {
    return this.http.patch<User>(`${this.API_URL}/inactive`, {
      userId: id,
    });
  }
}
