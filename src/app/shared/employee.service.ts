import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://localhost:8080/employees'
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl, {
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName
    })
  }
  addNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, {
      employeeId: uuidv4(),
      firstName: employee.firstName,
      lastName: employee.lastName 
    })
  }
  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${employee.employeeId}`)
  }
}
