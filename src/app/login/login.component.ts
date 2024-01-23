import { Component, Input, OnInit } from '@angular/core';
import { CheckUserService } from '../shared/check-user.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenService } from '../shared/token.service';
import { LoggedInUserService } from '../shared/logged-in-user.service';
import { Store } from '@ngxs/store';
import { AddUserNgxs } from '../ngxs-store/user-ngxs.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userNgxs: Observable<any>
  loginSuccessful: boolean = false
  isCredentialsIncorrect = false
  waiting: boolean = false
  email: string = ''
  password: string = ''

  constructor(
      private checkUser: CheckUserService,
      private tokenService: TokenService,
      private loggedInUserService: LoggedInUserService,
      private store: Store
  ) {
    this.userNgxs = this.store.select(state => state.userNgxs.userNgxs)
  }
  
  checkCredentials(): void {
    this.waiting = true
    this.checkUser.checkCreds({
      "email": this.email,
      "password": this.password
    }).pipe(
      catchError(error => {
        this.isCredentialsIncorrect = true
        this.loginSuccessful = false
        this.waiting = false
        return throwError(() => new Error(error))
      }),
      tap(response => {
        if (response.token != null) {
          console.log('login successful!')
          this.loginSuccessful = true
          this.waiting = false
          console.log('token: ' + response.token)
          this.tokenService.token = response.token
          this.loggedInUserService.accountname = response.accountname
          this.loggedInUserService.email = response.email
          const email = response.email
          const accountname = response.accountname
          const token = response.token
          console.log(email, accountname, token)
          this.store.dispatch(new AddUserNgxs({email, accountname, token}))
          this.userNgxs.subscribe(user => console.log(user))
        }
      })
    ).subscribe()
  }
  killError(): void {
    this.isCredentialsIncorrect = false
  }
}
