// Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import canActivate guards
import { RouteAuthGuard } from './shared/guard/routeauth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';

// Module Components
import { P404Component } from './BeforeOrAfterLogin/Errors/p404/p404.component';
import { LayoutComponent } from './AfterLogin/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
    canActivate: [RouteAuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'Home',
        canActivate: [RouteAuthGuard],
        loadChildren: () => import('./AfterLogin/home.module').then(m => m.HomeModule)
      },
      {
        path: 'AppManagement',
        canActivate: [RouteAuthGuard],
        loadChildren: () => import('./AfterLogin/AppPageModules/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'Logs',
        canActivate: [RouteAuthGuard],
        loadChildren: () => import('./AfterLogin/AppPageModules/logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'Users',
        canActivate: [RouteAuthGuard],
        loadChildren: () => import('./AfterLogin/AppPageModules/users/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'whatsis',
    data: {
      title: 'Whatsis'
    },
    canActivate: [SecureInnerPagesGuard],
    children: [
      {
        path: '',
        canActivate: [SecureInnerPagesGuard],
        loadChildren: () => import('./BeforeLogin/anonymous.module').then(m => m.AnonymousModule)
      }
    ]
  },
  {
    path: 'common',
    data: {
      title: 'common'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./BeforeOrAfterLogin/public.module').then(m => m.PublicModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
