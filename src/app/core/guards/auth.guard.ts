import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
  
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(string => `/${string}`).join('');
    return this.checkAuthState(url).pipe(take(1));
  }

  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthenticate.pipe(
      tap(is => {
        if(!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }
  
}
