

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiSessionController: string = 'AppRole';
  private apiRoleRouteController: string = 'AppRoleRoutes';

  constructor(private http: HttpClient) { }

  getRoles(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetRoles`, excepiton);
  }

  postRole(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Add`, data);
  }

  getRoleRoutes(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiRoleRouteController}/GetRoleRoutes`, excepiton);
  }

  postRoleRoutes(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiRoleRouteController}/Add`, data);
  }
}
