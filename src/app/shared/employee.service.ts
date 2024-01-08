import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'https://cmkxvlaa86.execute-api.eu-central-1.amazonaws.com/dev/employee'
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`)
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}`, {
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName
    })
  }
}
