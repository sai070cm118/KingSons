import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAuthGuard } from '../../../Shared/guard/routeauth.guard';
import { AppsComponent } from './apps/apps.component';
import { SettingsComponent } from './settings/settings.component';
import { DatabasesComponent } from './databases/databases.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { RoutesComponent } from './routes/routes.component';
import { EmailtemplatesComponent } from './emailtemplates/emailtemplates.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteAuthGuard],
    redirectTo: 'Apps',
    pathMatch: 'full'
  },
  {
    path: 'Apps',
    canActivate: [RouteAuthGuard],
    component: AppsComponent
  },
  {
    path: 'Settings',
    canActivate: [RouteAuthGuard],
    component: SettingsComponent
  },
  {
    path: 'Databases',
    canActivate: [RouteAuthGuard],
    component: DatabasesComponent
  },
  {
    path: 'Procedures',
    canActivate: [RouteAuthGuard],
    component: ProceduresComponent
  },
  {
    path: 'Routes',
    canActivate: [RouteAuthGuard],
    component: RoutesComponent
  },
  {
    path: 'EmailTemplates',
    canActivate: [RouteAuthGuard],
    component: EmailtemplatesComponent
  },
  {
    path: 'Support',
    canActivate: [RouteAuthGuard],
    component: SupportComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule {}
