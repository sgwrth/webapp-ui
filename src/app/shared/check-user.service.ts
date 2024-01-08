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
  baseUrl: string = 'https://nrl5yjho5h.execute-api.eu-central-1.amazonaws.com/users-dev/users'
  checkCreds(user: User) {
    return this.http.post(this.baseUrl, {
      "username": user.username,
      "password": user.password
    },
    { responseType: 'text' })
  }
}
