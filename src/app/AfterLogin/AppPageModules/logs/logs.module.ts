import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { EventsComponent } from './events/events.component';
import { CustomErrorsComponent } from './custom-errors/custom-errors.component';
import { LogsRoutingModule } from './logs.routing';
import { ExceptionsService } from '../../../ApiCalls/exceptions.service';

// Syncfusion Imports
import {ResizeService, GridAllModule, GridModule, PageService, ToolbarService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [ExceptionsComponent, EventsComponent, CustomErrorsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    DropDownListAllModule,
    CheckBoxModule,
    DialogModule
  ],
  providers: [
    ExceptionsService,
    EditService,
    PageService,
    ToolbarService
  ]
})
export class LogsModule { }
