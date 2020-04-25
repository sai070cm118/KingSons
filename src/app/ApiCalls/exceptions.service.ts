import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../Shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class ExceptionsService {

  private apiSessionController: string = 'ErrorLogger';

  constructor(private http: HttpClient) { }

  getExcepitons(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetExceptions`, excepiton);
  }

}
