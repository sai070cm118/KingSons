
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  private apiSessionController: string = 'AppProcedures';
  private apiProcedureParamController: string = 'AppProcedureParams';

  constructor(private http: HttpClient) { }

  getProcedures(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetProcedures`, excepiton);
  }

  postProcedure(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Add`, data);
  }


  getProcedureParams(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiProcedureParamController}/GetParams`, excepiton);
  }

  postProcedureParam(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiProcedureParamController}/Add`, data);
  }
}
