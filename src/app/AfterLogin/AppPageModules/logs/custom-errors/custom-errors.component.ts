import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { CustomerrorService } from '../../../../ApiCalls/customerror.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IAuditLog } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-custom-errors',
  templateUrl: './custom-errors.component.html',
  styleUrls: ['./custom-errors.component.scss']
})
export class CustomErrorsComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: IAuditLog[] = [];
  public customErrorData: IAuditLog;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('customErrorForm', { static: false }) public customErrorForm: FormGroup;
  @ViewChild('customErrorGrid', { static: false }) public customErrorGrid: GridComponent;

  // Construction
  constructor(
    private _customErrorService: CustomerrorService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
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
            this_.customErrorGrid.height = event  + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._customErrorService.getCustomErrors({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
      console.log(data);
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.customErrorGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.customErrorGrid.refresh();
  }

  actionBegin(args: any): void {

    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.customErrorData = Object.assign({}, args.rowData);
    } else if (args.requestType === 'save') {
        if (this.customErrorForm.valid) {
            const this_ = this;
            this._customErrorService.postCustomError(this.customErrorData).subscribe((data: any) => {
              this_.notificationService.showMessage(data, 'App Add/Edit');
              this.loadDataFormService( this.customErrorGrid.pageSettings.currentPage, this.customErrorGrid.pageSettings.pageSize);
            }, (error) => {
              this_.notificationService.showUnableToProcess();
            });
            args.dialog.close();
        }
    } else if ( args.requestType === 'paging') {
      this.loadDataFormService( this.customErrorGrid.pageSettings.currentPage, this.customErrorGrid.pageSettings.pageSize);
    } else if ( args.requestType === 'cancel' ) {
      this.loadDataFormService( this.customErrorGrid.pageSettings.currentPage, this.customErrorGrid.pageSettings.pageSize);
    }

  }

}
