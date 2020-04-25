// Angular Default Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { AppAsideModule, AppBreadcrumbModule, AppHeaderModule, AppFooterModule, AppSidebarModule } from '@coreui/angular';

// Bootstrapping Application
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

// Auth service
import { AuthModule } from './shared/auth.module';

// Syncfusion Modules
import { GridModule, GridAllModule, ResizeService, EditService, ToolbarService  } from '@syncfusion/ej2-angular-grids';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

// Application Modules
import { PublicModule } from './BeforeOrAfterLogin/public.module';
import { AnonymousModule } from './BeforeLogin/anonymous.module';
import { HomeModule } from './AfterLogin/home.module';
import { AppsModule } from './AfterLogin/AppPageModules/apps/apps.module';
import { LogsModule } from './AfterLogin/AppPageModules/logs/logs.module';
import { UserModule } from './AfterLogin/AppPageModules/users/user.module';
import { LayoutComponent } from './AfterLogin/layout/layout.component';
import { WindowSize } from './Shared/CustomObservables/WindowService';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AuthModule,
    PublicModule,
    AnonymousModule,
    HomeModule,
    AppsModule,
    LogsModule,
    UserModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  WindowSize
],
  bootstrap: [
    AppComponent]
})
export class AppModule { }
