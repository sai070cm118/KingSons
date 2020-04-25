import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { AppsService } from '../../../../ApiCalls/appService';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IAppModel } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';
import { AuthService } from '../../../../Shared/services/auth.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: IAppModel[] = [];
  public appData: IAppModel;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('appForm', { static: false }) public appForm: FormGroup;
  @ViewChild('appGrid', { static: false }) public appGrid: GridComponent;

  // Construction
  constructor(
    private _appsService: AppsService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService,
    private _authService: AuthService
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
            this_.appGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._appsService.getApps({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.appGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.appGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.appData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.appForm.valid) {
              const this_ = this;
              this._appsService.postApp(this.appData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.appGrid.pageSettings.currentPage, this.appGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.appGrid.pageSettings.currentPage, this.appGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.appGrid.pageSettings.currentPage, this.appGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }

  switchApp(event: any, data: any) {

    console.log(data);
    // Get new token
    const this_ = this;
    this_._authService.switchApp(data.Id).subscribe((result) => {
      console.log(result);
    });

  }

}


