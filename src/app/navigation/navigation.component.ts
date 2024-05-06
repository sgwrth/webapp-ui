import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { SetMyRoute } from '../ngxs-store/route.actions';
import { FileTransferService } from '../shared/file-transfer.service';
import { NavRoute } from '../shared/models/nav-route';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  
  route$: Observable<NavRoute[]>
  routeForNav!: string
  profilePic$?: Observable<any>
  image?: SafeUrl

  constructor(
    private router: Router,
    private translateServ: TranslateService,
    private store: Store,
    private fileServ: FileTransferService,
  ) {
    this.route$ = this.store.select(state => state.myRoute.myRoute)
    this.profilePic$ = this.store.select(state => state.profilePic.profilePic)
  }

  updateRoute(route: string): void {
    this.store.dispatch(new SetMyRoute(route))
    this.updateRouteForNav()
  }

  // improve!
  updateRouteForNav() {
    this.route$
        // .pipe(
        //   tap(res => {
        //     let highestIndex = res.length - 1
        //     this.routeForNav = res[highestIndex].navRoute
        //   })
        // )
        .subscribe(res => {
            let highestIndex = res.length - 1
            this.routeForNav = res[highestIndex].navRoute
        })
  }

  // hack!
  refreshEmployeeList(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(["/employees"])
        })
  }

  selectTranslation(lang: string) {
    switch (lang) {
      case 'de':
        this.translateServ.use('de')
        // document.documentElement.lang = 'de'
        break
      case 'en':
        this.translateServ.use('en')
        // document.documentElement.lang = 'en'
        break
    }
  }

  ngOnInit() {
    this.fileServ.getProfilePic()
        .subscribe(res => this.fileServ.setProfilePic(res.path, res.fileName))
    this.profilePic$?.subscribe(res => this.image = res[0])

    this.routeForNav = this.router.url
  }

}