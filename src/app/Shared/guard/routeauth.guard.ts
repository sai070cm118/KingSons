import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/appConfig';


@Injectable({
  providedIn: 'root'
})

export class RouteAuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn() !== true) {
      // window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate([AppConfig.Login_URL] );
    }
    return true;
  }

}
