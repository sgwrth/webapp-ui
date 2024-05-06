import { Injectable } from '@angular/core';
import { NavRoute } from './models/nav-route';

@Injectable({
  providedIn: 'root'
})
export class NavRouteService {

  constructor() { }

  getNavRoute(route: string): NavRoute {
    return {
      navRoute: route
    }
  }

}
