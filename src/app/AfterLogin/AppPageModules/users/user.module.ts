

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing';
import { ExceptionsService } from '../../../ApiCalls/exceptions.service';

// Syncfusion Imports
import {ResizeService, GridAllModule, GridModule, PageService, ToolbarService, SortService, FilterService,
  GroupService, EditService  } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';

import { RolesComponent } from './roles/roles.component';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { UserroleroutesComponent } from './userroleroutes/userroleroutes.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddedituserComponent } from './addedituser/addedituser.component';

@NgModule({
  declarations: [RolesComponent, UserroleroutesComponent, ManageUserComponent, AddedituserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    DropDownListAllModule,
    CheckBoxModule,
    DialogModule,
    ButtonModule,
    SwitchModule
  ],
  providers: [
    ExceptionsService,
    EditService,
    PageService,
    ToolbarService
  ]
})
export class UserModule { }
