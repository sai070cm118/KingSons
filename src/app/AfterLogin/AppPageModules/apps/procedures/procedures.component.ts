import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ElementRef  } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';

import { DataManager, Query } from '@syncfusion/ej2-data';
import {  ProceduresService  } from '../../../../ApiCalls/procedures.service';
import {  DatabasesService  } from '../../../../ApiCalls/databases.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IProcedures, IDatabases, IProcedureParams } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent  implements OnInit , AfterViewChecked {

  // Component Data
  public data: IProcedures[] = [];
  public procedureData: IProcedures;
  public procedureParamData: IProcedureParams;
  public procedureParams: IProcedureParams[] = [];
  public databasesList: IDatabases[] = [];
  public dataTypes: any[] = [
    {Id: 'varchar', Name: 'varchar'},
    {Id: 'datetime', Name: 'datetime'},
    {Id: 'bit', Name: 'bit'},
    {Id: 'nvarchar', Name: 'nvarchar'},
    {Id: 'text', Name: 'text'},
    {Id: 'int', Name: 'int'},
    {Id: 'bigint', Name: 'bigint'},
    {Id: 'tinyint', Name: 'tinyint'},
    {Id: 'smallint', Name: 'smallint'},
    {Id: 'float', Name: 'float'},
    {Id: 'numeric', Name: 'numeric'},
    {Id: 'decimal', Name: 'decimal'},
    {Id: 'real', Name: 'real'},
    {Id: 'date', Name: 'date'},
    {Id: 'datetime2', Name: 'datetime2'},
    {Id: 'datetimeoffset', Name: 'datetimeoffset'},
    {Id: 'smalldatetime', Name: 'smalldatetime'},
    {Id: 'time', Name: 'time'},
    {Id: 'smallmoney', Name: 'smallmoney'},
    {Id: 'uniqueidentifier', Name: 'uniqueidentifier'},
    {Id: 'money', Name: 'money'},
    {Id: 'binary', Name: 'binary'},
    {Id: 'varbinary', Name: 'varbinary'},
    {Id: 'image', Name: 'image'},
    {Id: 'xml', Name: 'xml'},
    {Id: 'char', Name: 'char'},
    {Id: 'nchar', Name: 'nchar'},
    {Id: 'ntext', Name: 'ntext'},
    {Id: 'tvp', Name: 'tvp'},
    {Id: 'udt', Name: 'udt'},
    {Id: 'geography', Name: 'geography'},
    {Id: 'geometry', Name: 'geometry'},
    {Id: 'variant', Name: 'variant'}
  ];

  public fields: Object = { text: 'Name', value: 'Id' };
  public paramDialogPos: object = {  Y: 100 };

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public paramEditSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('proceduresForm', { static: false }) public proceduresForm: FormGroup;
  @ViewChild('procedureParamForm', { static: false }) public procedureParamForm: FormGroup;
  @ViewChild('proceduresGrid', { static: false }) public proceduresGrid: GridComponent;
  @ViewChild('procedureParamGrid', { static: false }) public procedureParamGrid: GridComponent;

  @ViewChild('ejDialog', { static: false }) ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { static: true , read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  // Construction
  constructor(
    private _proceduresService: ProceduresService,
    private _databasesService: DatabasesService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
      this.paramEditSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
      this.toolbar = ['Add', 'Edit'];
      this.pageSettings = {   pageSize: AppConfig.PAGESIZE, pageSizes: AppConfig.PAGESIZES};
      this.loadDataFormService(AppConfig.PAGENO, AppConfig.PAGESIZE );
  }

  ngAfterViewChecked() {

  }

  gridInitialize() {
    const this_ = this;
    this._windowSize.availWindowHeight.subscribe({
        next: function(event: any) {
            this_.proceduresGrid.height = event + 'px';
        }
    });
  }

  paramGridInitialize() {
    this.procedureParamGrid.height = '380px';
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._databasesService.getDatabases({PageNo: 1 , PageSize: 10000}).subscribe((data) => {
      this_.databasesList = data.Result;
      this_._proceduresService.getProcedures({PageNo: PageNo , PageSize: PageSize}).subscribe((resdata) => {
          this_.bindDateToGrid(resdata);
      });
    });
  }

  loadParamDataFormService(id: any ) {
    const this_ = this;
    console.log(this_.procedureData);
    this_._proceduresService.getProcedureParams({PageNo: 1 , PageSize: 10000, AppProcedureId: id}).subscribe((paramData) => {
      this_.bindParamDateToGrid(paramData);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.proceduresGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.proceduresGrid.refresh();
  }

  bindParamDateToGrid(data: any) {
    const this_ = this;
    this_.procedureParamGrid.dataSource = {
        result: data.Result
    };
    this_.procedureParamGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.procedureData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.proceduresForm.valid) {
              const this_ = this;
              this._proceduresService.postProcedure(this.procedureData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.proceduresGrid.pageSettings.currentPage, this.proceduresGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.proceduresGrid.pageSettings.currentPage, this.proceduresGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.proceduresGrid.pageSettings.currentPage, this.proceduresGrid.pageSettings.pageSize);
      }

  }

  paramActionBegin(args: any): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.procedureParamData = Object.assign({}, args.rowData);
    } else if (args.requestType === 'save') {
        if (this.procedureParamForm.valid) {
            const this_ = this;
            this_.procedureParamData.AppProcedureId = this_.procedureData.Id;
            this._proceduresService.postProcedureParam(this.procedureParamData).subscribe((data: any) => {
              this_.notificationService.showMessage(data, 'App Add/Edit');
              this.loadParamDataFormService(this_.procedureData.Id);
            }, (error) => {
              this_.notificationService.showUnableToProcess();
            });
            args.dialog.close();
        }
    }
  }

    actionComplete(args: DialogEditEventArgs): void {

    }

    onOpenDialog(event: any, inData: any) {
        // Call the show method to open the Dialog
        this.ejDialog.show();
        this.procedureData = inData;
        this.loadParamDataFormService(inData.Id);
    }
}




