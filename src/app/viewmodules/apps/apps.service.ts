import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  private apiSessionController: string = 'AppManager';

  constructor(private http: HttpClient) {

  }

  getApps(): Observable<any> {
    return this.http.get<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetApp`);
  }

  postApp(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/AddApp`, data);
  }

}
