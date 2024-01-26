import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'http://localhost:8081/api/v1/employees'
  // baseUrl = 'http://3.67.169.17:8081/api/v1/employees'
  userNgxs$: Observable<any>
  TOKEN_PREFIX: string = 'Bearer'

  constructor(
      private http: HttpClient,
      private store: Store,
  ) {
    this.userNgxs$ = this.store.select(state => state.userNgxs.userNgxs)
  }

  createHttpHeaders(): HttpHeaders {
    let tokenStr: string = ''
    this.userNgxs$
        .pipe(
            tap(res => tokenStr = res[0].token)
        )
        .subscribe()
    return new HttpHeaders({Authorization: `${this.TOKEN_PREFIX} ${tokenStr}`})
  }

  getUserInfo(): string {
    let userInfo: string = ''
    this.userNgxs$
        .pipe(
            tap(res => userInfo = `${res[0].accountname} (${res[0].email})`)
        ) 
        .subscribe()
    return userInfo
  }

  getEmployees(): Observable<Employee[]> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.get<Employee[]>(this.baseUrl, { headers: httpHeaders })
  }

  getEmployeeById(id: number): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.get<Employee>(
        `${this.baseUrl}/${id}`, { headers: httpHeaders}
    )
  }
  
  updateEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      lastEditedBy: this.getUserInfo()
    },
    { headers: httpHeaders })
  }

  addNewEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.post<Employee>(this.baseUrl, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      salary: employee.salary,
      lastEditedBy: this.getUserInfo(),
      createdBy: this.getUserInfo()
    },
    { headers: httpHeaders })
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.delete<Employee>(`${this.baseUrl}/${employee.id}`,
    { headers: httpHeaders })
  }

}