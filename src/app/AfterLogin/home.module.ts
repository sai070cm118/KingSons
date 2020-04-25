import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { SyncfusinTestComponent } from './AppPageModules/syncfusin-test/syncfusin-test.component'

import { data } from '../Shared/datasource';

import {ResizeService, GridAllModule, GridModule, PageService, ToolbarService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SyncfusinTestComponent ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    DropDownListAllModule
  ],
  providers: [
    EditService,
    PageService,
    ToolbarService
  ]
})
export class HomeModule { }
