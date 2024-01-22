import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';
import { LoggedInUserService } from './logged-in-user.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // baseUrl = 'http://localhost:8081/api/v1/employees'
  baseUrl = 'http://3.67.169.17:8081/api/v1/employees'

  constructor(
      private http: HttpClient,
      private tokenService: TokenService,
      private loggedInUserService: LoggedInUserService
  ) { }

  token: string = this.tokenService.token
  bearerToken: string = "Bearer " + this.token
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.bearerToken
  }) 
  userInfo: string =
      `${this.loggedInUserService.accountname} (${this.loggedInUserService.email})`

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, { headers: this.httpHeaders })
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(
        `${this.baseUrl}/${id}`, { headers: this.httpHeaders}
    )
  }
  
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      lastEditedBy: this.userInfo
    },
    { headers: this.httpHeaders })
  }

  addNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      lastEditedBy: this.userInfo,
      createdBy: this.userInfo
    },
    { headers: this.httpHeaders })
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${employee.id}`,
    { headers: this.httpHeaders })
  }

}