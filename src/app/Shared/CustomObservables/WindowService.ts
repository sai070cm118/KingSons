import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { map, filter, switchMap , debounceTime } from 'rxjs/operators';
import { AppConfig } from '../config/appConfig';

@Injectable({
  providedIn: 'root'
})
export class WindowSize {

  public windowObs = fromEvent( window, 'resize').pipe(debounceTime(100))
  .pipe(startWith({ target: window }), map((event: any) => {
    return { width: event.target.innerWidth, height: event.target.innerHeight };
  }))
  .pipe(distinctUntilChanged());

  publicavailWindowWidth = this.windowObs.pipe(map((dimentions: any) => {
    return dimentions.width;
  }));

  public availWindowHeight = this.windowObs.pipe(map((dimentions: any) => {
    return dimentions.height - AppConfig.HeaderHeight - AppConfig.BreadcomHeight - 
    AppConfig.GridHeaderHeight - AppConfig.FooterHeight - AppConfig.LayoutMarginHeight;
  }));

  public availHeight: any;


  constructor() {
    this.availHeight = window.innerHeight - AppConfig.HeaderHeight - AppConfig.BreadcomHeight -
    AppConfig.GridHeaderHeight - AppConfig.FooterHeight - AppConfig.LayoutMarginHeight;
  }

  getAvailHeight() {
    return window.innerHeight - AppConfig.HeaderHeight - AppConfig.BreadcomHeight - AppConfig.GridHeaderHeight -
    AppConfig.FooterHeight - AppConfig.LayoutMarginHeight;
  }

}

