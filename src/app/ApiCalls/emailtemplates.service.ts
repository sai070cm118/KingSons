
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap  } from 'rxjs/operators';
import { AppConfig } from '../shared/config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class EmailtemplatesService {

  private apiSessionController: string = 'EmailTemplate';

  constructor(private http: HttpClient) { }

  getEmailTemplates(excepiton): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/GetEmailTemplates`, excepiton);
  }

  postEmailTemplate(data: any): Observable<any> {
    return this.http.post<any>(`${AppConfig.BASE_API_URL}${this.apiSessionController}/Add`, data);
  }


}
