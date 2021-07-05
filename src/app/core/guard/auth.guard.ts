import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate //, CanActivateChild, CanDeactivate<unknown>, CanLoad 
{

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

 /* canActivate() {
    const isAuth = this.accountService.isLogged();
    if (!isAuth) {
      this.router.navigateByUrl('login');
    }
    return isAuth;
  }*/

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (!user) {
      // not logged in so redirect to login page with the return url
      this.router.navigateByUrl('/account/login');
      return false;
    }    
    return true;
  }
  
  /*
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
}
