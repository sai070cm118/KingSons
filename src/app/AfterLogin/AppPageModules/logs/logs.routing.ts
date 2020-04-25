import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAuthGuard } from '../../../Shared/guard/routeauth.guard';

import { CustomErrorsComponent } from './custom-errors/custom-errors.component';
import { EventsComponent } from './events/events.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteAuthGuard],
    redirectTo: 'Exceptions',
    pathMatch: 'full'
  },
  {
    path: 'Exceptions',
    canActivate: [RouteAuthGuard],
    component: ExceptionsComponent
  },
  {
    path: 'Events',
    canActivate: [RouteAuthGuard],
    component: EventsComponent
  },
  {
    path: 'CustomErrors',
    canActivate: [RouteAuthGuard],
    component: CustomErrorsComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule {}
