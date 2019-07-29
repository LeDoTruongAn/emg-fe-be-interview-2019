import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ) { }

  canActivateChild(): Observable<boolean> | boolean {
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (1 === 1) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
