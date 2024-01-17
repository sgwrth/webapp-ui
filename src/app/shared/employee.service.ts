import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://3.67.169.17:8081/api/v1/employees'

  constructor(
      private http: HttpClient,
      private tokenService: TokenService
  ) { }

  token: string = this.tokenService.token
  bearerToken: string = "Bearer " + this.token
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.bearerToken
  }) 

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, { headers: this.httpHeaders })
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, {
      firstName: employee.firstName,
      lastName: employee.lastName
    },
    { headers: this.httpHeaders })
  }
  addNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, {
      firstName: employee.firstName,
      lastName: employee.lastName 
    },
    { headers: this.httpHeaders })
  }
  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${employee.id}`,
    { headers: this.httpHeaders })
  }
}
