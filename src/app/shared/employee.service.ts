import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedInUserService } from './logged-in-user.service';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // baseUrl = 'http://localhost:8081/api/v1/employees'
  baseUrl = 'http://3.67.169.17:8081/api/v1/employees'
  userNgxs$: Observable<any>
  tokenPrefix: string = 'Bearer'
  userInfo: string =
      `${this.loggedInUserService.accountname} (${this.loggedInUserService.email})`

  constructor(
      private http: HttpClient,
      private store: Store,
      private loggedInUserService: LoggedInUserService
  ) {
    this.userNgxs$ = this.store.select(state => state.userNgxs.userNgxs)
  }

  createHttpHeaders(): HttpHeaders {
    let tokenStr: string = ''
    this.userNgxs$
        .pipe(tap(res => tokenStr = res[0].token))
        .subscribe()
    return new HttpHeaders({Authorization: `${this.tokenPrefix} ${tokenStr}`})
  }

  getEmployees(): Observable<Employee[]> {
    const httpHeaders = this.createHttpHeaders()
    console.log(httpHeaders)
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
      lastEditedBy: this.userInfo
    },
    { headers: httpHeaders })
  }

  addNewEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.post<Employee>(this.baseUrl, {
      firstName: employee.firstName,
      lastName: employee.lastName,
      lastEditedBy: this.userInfo,
      createdBy: this.userInfo
    },
    { headers: httpHeaders })
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = this.createHttpHeaders()
    return this.http.delete<Employee>(`${this.baseUrl}/${employee.id}`,
    { headers: httpHeaders })
  }

}