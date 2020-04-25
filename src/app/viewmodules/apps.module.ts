import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps/apps.component';

// Syncfustion
import {ResizeService, GridAllModule, GridModule, PageService, ToolbarService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';

// Components Routing
import { AppsRoutingModule } from './apps-routing.module';
import { CustomErrorsComponent } from './customErrors/custom-errors.component';
import { from } from 'rxjs';
import { AppsService } from './apps/apps.service';
import { CustomErrorsService } from './customErrors/custom-errors.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppsComponent, CustomErrorsComponent],
  imports: [
    CommonModule,
    AppsRoutingModule,
    GridModule,
    GridAllModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EditService,
    PageService,
    ToolbarService,
    SortService,
    FilterService,
    GroupService,
    AppsService,
    ResizeService,
    CustomErrorsService
  ]
})
export class AppsModule { }
