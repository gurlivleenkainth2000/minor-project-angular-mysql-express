import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STAFF_LOGIN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(
    private router: Router
  ){ }

  canActivate(): boolean {
    if(localStorage.getItem('loginType') == STAFF_LOGIN) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}
