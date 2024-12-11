import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { catchError, of } from 'rxjs';
import { User } from '@models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = environments.baseUrl;
  private http = inject(HttpClient);
  getUserProfileById(id: number) {
    return this.http.get<any>(`${this.API_URL}/Cliente/${id}`);
  }

  getAllUsers() {
    return this.http
      .get<any>(`${this.API_URL}/Usuario`)
      .pipe(catchError(() => of([])));
  }

  login(email: string, password: string) {
    // console.log(password);
    return this.http.post<any>(`${this.API_URL}/Usuario/login`, {
      correoElectronico: email,
      password: password,
    });
  }

  register(data: any) {
    return this.http.post<any>(`${this.API_URL}/Cliente`, data);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`${this.API_URL}/Cliente/email/${email}`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.API_URL}/Usuario/${id}`);
  }

  chageRoleToUser(id: number) {
    return this.http.patch<User>(`${this.API_URL}/Usuario`, {
      userId: id,
    });
  }

  chageRoleToEmployee(id: number) {
    return this.http.patch<User>(`${this.API_URL}/Usuario/employee`, {
      userId: id,
    });
  }
}
