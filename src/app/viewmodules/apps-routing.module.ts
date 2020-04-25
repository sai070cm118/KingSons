import { RouteAuthGuard } from '../shared/guard/routeauth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppsComponent } from './apps/apps.component';
import { CustomErrorsComponent } from './customErrors/custom-errors.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Apps'
    },
    component: AppsComponent
  },
  {
    path: 'CustomErrors',
    data: {
      title: 'Custom Errors'
    },
    component: CustomErrorsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule {}
