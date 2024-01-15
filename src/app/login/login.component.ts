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
  isCredentialsIncorrect = false
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
        if (result == 'username and/or password incorrect') {
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
