import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly API_URL = 'http://localhost:5210/api';
  private http = inject(HttpClient);

  getAllEmployees() {
    return this.http
      .get(`${this.API_URL}/Empleado`)
      .pipe(catchError(() => of([])));
  }
}
