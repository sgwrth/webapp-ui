import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'http://3.67.169.17:8081/api/v1/auth/authenticate'
  checkCreds(user: User): Observable<any> {
    return this.http.post(this.baseUrl, {
      "email": user.email,
      "password": user.password
    })
  }
}
