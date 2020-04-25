import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAuthGuard } from '../../../Shared/guard/routeauth.guard';

import { RolesComponent } from './roles/roles.component';
import { UserroleroutesComponent } from './userroleroutes/userroleroutes.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddedituserComponent } from './addedituser/addedituser.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteAuthGuard],
    redirectTo: 'ManageUsers',
    pathMatch: 'full'
  },
  {
    path: 'ManageUsers',
    canActivate: [RouteAuthGuard],
    component: ManageUserComponent
  },
  {
    path: 'AddEditUser',
    canActivate: [RouteAuthGuard],
    component: AddedituserComponent
  },
  {
    path: 'AddEditUser/:id',
    canActivate: [RouteAuthGuard],
    component: AddedituserComponent
  },
  {
    path: 'Roles',
    canActivate: [RouteAuthGuard],
    component: RolesComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
