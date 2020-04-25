import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private apiSessionController: string = 'AppRoutes';

  constructor(private http: HttpClient) { }

  getRoutes(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetRoutes`, excepiton);
  }

  postRoute(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Add`, data);
  }

}
