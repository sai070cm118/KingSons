import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps/apps.component';
import { data } from '../../../Shared/datasource';
import { AppsRoutingModule } from './apps.routing';
import { AppsService } from '../../../ApiCalls/appService';

// Syncfusion Imports
import {ResizeService, GridAllModule, GridModule, PageService, ToolbarService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SettingsComponent } from './settings/settings.component';
import { DatabasesComponent } from './databases/databases.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { RoutesComponent } from './routes/routes.component';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { EmailtemplatesComponent } from './emailtemplates/emailtemplates.component';
import { SupportComponent } from './support/support.component';

import { RichTextEditorAllModule  } from '@syncfusion/ej2-angular-richtexteditor';
import {  LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@NgModule({
  declarations: [AppsComponent, SettingsComponent, DatabasesComponent, ProceduresComponent,
    RoutesComponent, EmailtemplatesComponent, SupportComponent],
  imports: [
    CommonModule,
    AppsRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    DropDownListAllModule,
    CheckBoxModule,
    DialogModule,
    ButtonModule,
    RichTextEditorAllModule
  ],
  providers: [
    AppsService,
    EditService,
    PageService,
    ToolbarService, LinkService, ImageService, HtmlEditorService
  ]
})
export class AppsModule { }
