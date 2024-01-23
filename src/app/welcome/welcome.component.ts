import { Component } from '@angular/core';
import { LoggedInUserService } from '../shared/logged-in-user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  loggedInUser: string = 'User'
  userNgxs$: Observable<any>

  constructor(
      private loggedInUserService: LoggedInUserService,
      private store: Store
  ) {
    this.userNgxs$ = this.store.select(state => state.userNgxs.userNgxs)
  }

  ngOnInit() {
    this.loggedInUser = this.loggedInUserService.accountname
  }
}
