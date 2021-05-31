import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STUDENT_LOGIN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private router: Router
  ){ }

  canActivate( ): boolean {
    if(localStorage.getItem('loginType') == STUDENT_LOGIN) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}
