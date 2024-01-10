import { Component, Input } from '@angular/core';
import { CheckUserService } from '../shared/check-user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private checkUser: CheckUserService
  ) {}
  loginSuccessful: boolean = false
  passwordIncorrect: boolean = false
  userUnknown: boolean = false
  waiting: boolean = false
  username: string = ''
  password: string = ''
  checkCredentials(): void {
    this.waiting = true
    this.checkUser.checkCreds({
      "username": this.username,
      "password": this.password
    }).pipe(
      tap(result => {
        if (result == 'login successful!') {
          console.log('login successful!')
          this.loginSuccessful = true
          this.waiting = false
        }
        if (result == 'password incorrect') {
          console.log('password incorrect')
          this.userUnknown = false
          this.passwordIncorrect = true
          this.waiting = false
        }
        if (result == 'user not found') {
          console.log('user not found')
          this.userUnknown = true
          this.passwordIncorrect = false
          this.waiting = false
        }
      })
    ).subscribe()
  }
  killError(): void {
    this.passwordIncorrect = false
    this.userUnknown = false
  }
}
