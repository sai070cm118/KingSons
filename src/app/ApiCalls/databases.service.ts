import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class DatabasesService {

  private apiSessionController: string = 'AppDatabase';

  constructor(private http: HttpClient) { }

  getDatabases(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetDatabases`, excepiton);
  }

  postDatabase(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Add`, data);
  }

  syncProcedures(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/SyncProcedures`, data);
  }

}
