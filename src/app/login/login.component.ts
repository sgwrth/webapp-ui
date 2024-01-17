import { Component, Input } from '@angular/core';
import { CheckUserService } from '../shared/check-user.service';
import { tap } from 'rxjs';
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
      tap(result => {
        if (result.token != null) {
          console.log('login successful!')
          this.loginSuccessful = true
          this.waiting = false
          console.log('token: ' + result.token)
          this.tokenService.token = result.token
        }
        if (result.token == null) {
          console.log('username and/or password incorrect')
          this.isCredentialsIncorrect = true
          this.waiting = false
        }
      })
    ).subscribe()
  }
  killError(): void {
    this.isCredentialsIncorrect = false
  }
}
