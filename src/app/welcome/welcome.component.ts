import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  userNgxs$: Observable<any>

  constructor(
      private store: Store
  ) {
    this.userNgxs$ = this.store.select(state => state.userNgxs.userNgxs)
  }

  ngOnInit() {
  }

}
