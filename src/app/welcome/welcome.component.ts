import { Component } from '@angular/core';
import { LoggedInUserService } from '../shared/logged-in-user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  loggedInUser: string = 'User'

  constructor(private loggedInUserService: LoggedInUserService) {}

  ngOnInit() {
    this.loggedInUser = this.loggedInUserService.accountname
  }
}
