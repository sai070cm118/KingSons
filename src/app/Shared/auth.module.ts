import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouteAuthGuard } from './guard/routeauth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
// import { ErrorInterceptor  } from './interceptors/error.interceptor';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [LoginComponent],
  providers: [
    RouteAuthGuard,
    SecureInnerPagesGuard,
    // ErrorInterceptor,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ]
})
export class AuthModule { }
