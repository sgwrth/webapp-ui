import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {

  baseUrl = environment.baseUrlAuth

  constructor(
    private http: HttpClient
  ) { }

  checkCreds(user: User): Observable<any> {
    return this.http.post(this.baseUrl, {
      "email": user.email,
      "password": user.password
    })
  }

}
