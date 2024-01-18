import { Component, Input } from '@angular/core';
import { CheckUserService } from '../shared/check-user.service';
import { catchError, tap, throwError } from 'rxjs';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
      private checkUser: CheckUserService,
      private tokenService: TokenService
  ) {}
  loginSuccessful: boolean = false
  isCredentialsIncorrect = false
  waiting: boolean = false
  email: string = ''
  password: string = ''

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
        return throwError(error)
      }),
      tap(response => {
        if (response.token != null) {
          console.log('login successful!')
          this.loginSuccessful = true
          this.waiting = false
          console.log('token: ' + response.token)
          this.tokenService.token = response.token
        }
      })
    ).subscribe()
  }
  killError(): void {
    this.isCredentialsIncorrect = false
  }
}
