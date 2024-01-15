import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'http://localhost:8080/user'
  checkCreds(user: User) {
    return this.http.post(this.baseUrl, {
      "username": user.username,
      "password": user.password
    },
    { responseType: 'text' })
  }
}
