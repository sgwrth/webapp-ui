import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  accountname: string = ''
  email: string = ''

  constructor() { }

}