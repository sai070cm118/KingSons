
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiAppEmployeeController: string = 'AppEmployee';

  constructor(private http: HttpClient) { }

  getEmployee(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/GetAppEmployee`, excepiton);
  }

  getEmployees(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/GetAppEmployees`, excepiton);
  }

  postEmployee(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/Add`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/ResetPassword`, data);
  }

  changeActiveStatus(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/ChangeActiveStatus`, data);
  }

  ChangeRole(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/ChangeRole`, data);
  }


  getUserRoles(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/GetUserRoles`, data);
  }

  changeRoute(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/ChangeRoute`, data);
  }


  getUserRoutes(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiAppEmployeeController}/GetUserRoutes`, data);
  }

}
