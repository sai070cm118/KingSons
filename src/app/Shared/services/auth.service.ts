import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../config/appConfig';
import { Tokens } from '../models/tokens';
import { NotificationService } from '../tosterservice/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private apiSessionController: string = 'Session';

  constructor(private http: HttpClient,
    private notificationService: NotificationService) {}

  login(user: { Email: string, Password: string }): Observable<boolean> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/LoginAsEmployee`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.Email, tokens)),
        mapTo(true),
        catchError(error => {
          // alert(error.error);
          this.notificationService.show500Error('Login Response!');
          return of(false);
        }));
  }

  authRouteTest(): Observable<boolean> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}appuser/UpdateUserName`, { })
      .pipe(
        tap(tokens => {
           console.log(tokens);
          } ),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  logout() {
    return this.http.get<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/logout`, {
      headers: {
        'RefreshToken': this.getRefreshToken()
      }
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        // alert(error.error);

        this.notificationService.show500Error('Login Response!');
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    console.log('Doing refresh.');
    return this.http.get<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Refresh`, {
      headers: {
        'RefreshToken':  this.getRefreshToken()
      }
    }).pipe(tap((tokens: any) => {
      console.log(tokens.Code);
      if (tokens.Code > 0 ) {
        this.storeJwtToken(tokens.Result.AuthToken);
      } else {
        this.notificationService.showInfo('Page is redirecting to login page.', 'UnAutherized Request!');
        this.doLogoutUser();
      }
    }));
  }

  switchApp( appId: number ) {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/SwitchApp`, {Id: appId}, {
      headers: {
        'RefreshToken':  this.getRefreshToken()
      }
    }).pipe(
      tap(tokens => this.doLoginUser(tokens.Email, tokens)),
      mapTo(true),
      catchError(error => {
        // alert(error.error);
        this.notificationService.show500Error('Login Response!');
        return of(false);
    }));
  }

  getJwtToken() {
    // TODO: Should be validate the token with the Private key.

    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, resp: any) {
    console.log(resp);

    if (resp.IsError) {
      this.notificationService.showError( resp.Message, 'Login Response!');
    } else {
      this.notificationService.showSuccess( resp.Message, 'Login Response!');
    }

    if ( resp.Code > 0 ) {
      this.loggedUser = username;
      this.storeTokens({jwt: resp.Result.AuthToken, refreshToken: resp.Result.RefreshToken});
    } else {
      console.log(resp.Message);
    }

  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    console.log(localStorage.getItem(this.REFRESH_TOKEN));
    return localStorage.getItem(this.REFRESH_TOKEN) == null ? '' : localStorage.getItem(this.REFRESH_TOKEN) ;
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  public storeSwitchTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    location.reload(true);
  }
}
