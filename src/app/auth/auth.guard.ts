import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
      const isAuth = !!user; // return !!user; should have been the case for the tap operation implementation below
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']); // alternative was using tap as commented below
    })
      // tap(isAuth => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
