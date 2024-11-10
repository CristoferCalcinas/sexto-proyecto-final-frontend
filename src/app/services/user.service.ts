import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = environments.baseUrl;
  private http = inject(HttpClient);
  getUserProfileById(id: number) {
    return this.http.get<any>(`${this.API_URL}/Cliente/${id}`);
  }

  getAllUsers() {
    return this.http
      .get<any>(`${this.API_URL}/Cliente`)
      .pipe(catchError(() => of([])));
  }
}