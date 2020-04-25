import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page2Component } from './page2/page2.component';
import { LoginComponent } from '../Shared/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    data: {
      title: 'Login'
    },
    component: LoginComponent
  },
  {
    path: 'page2',
    data: {
      title: 'Page2'
    },
    component: Page2Component
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousRoutingModule {}
