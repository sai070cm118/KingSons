import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAuthGuard } from '../Shared/guard/routeauth.guard';
import { SyncfusinTestComponent } from './AppPageModules/syncfusin-test/syncfusin-test.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteAuthGuard],
    redirectTo: 'Dashboard',
    pathMatch: 'full'
  },
  {
    path: 'Dashboard',
    canActivate: [RouteAuthGuard],
    loadChildren: () => import('../views/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'AppManagement',
    canActivate: [RouteAuthGuard],
    loadChildren: () => import('./AppPageModules/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'SyncTest',
    canActivate: [RouteAuthGuard],
    component: SyncfusinTestComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
