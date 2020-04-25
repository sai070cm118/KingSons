import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ElementRef  } from '@angular/core';
import {  DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ExceptionsService } from '../../../../ApiCalls/exceptions.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IException } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: IException[] = [];
  public exceptionData: IException;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  // @ViewChild('appForm', { static: false }) public appForm: FormGroup;
  @ViewChild('exceptionsGrid', { static: false }) public exceptionsGrid: GridComponent;

  // Construction
  constructor(
    private _exceptionService: ExceptionsService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
      this.toolbar = ['Edit'];
      this.pageSettings = {   pageSize: AppConfig.PAGESIZE, pageSizes: AppConfig.PAGESIZES};
      this.loadDataFormService(AppConfig.PAGENO, AppConfig.PAGESIZE );
  }

  ngAfterViewChecked() {

  }

  gridInitialize() {
    const this_ = this;
    this._windowSize.availWindowHeight.subscribe({
        next: function(event: any) {
            this_.exceptionsGrid.height = (event + AppConfig.GridHeaderHeight ) + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._exceptionService.getExcepitons({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
      console.log(data);
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.exceptionsGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.exceptionsGrid.refresh();
  }

  actionBegin(args: any): void {

    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        this.exceptionData = Object.assign({}, args.rowData);
    }
    if ( args.requestType === 'paging') {
      this.loadDataFormService( this.exceptionsGrid.pageSettings.currentPage, this.exceptionsGrid.pageSettings.pageSize);
    }

    console.log(args.requestType);
    const dialogObj = args.dialog;
    console.log(args);
    console.log(dialogObj);
    // dialogObj.element.querySelectorAll('.e-primary')[0].innerHTML = 'Save & New';

  }

  actionComplete(args: any): void {
    console.log(args);
  }

}


