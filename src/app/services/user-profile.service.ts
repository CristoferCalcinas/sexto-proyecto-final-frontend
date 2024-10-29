import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly urlUserProfile = 'http://localhost:5210/api';
  private http = inject(HttpClient);
  getUserProfileById(id: number) {
    return this.http.get<any>(`${this.urlUserProfile}/Cliente/${id}`);
  }
}
