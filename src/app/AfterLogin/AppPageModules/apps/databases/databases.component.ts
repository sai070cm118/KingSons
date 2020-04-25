import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { DatabasesService } from '../../../../ApiCalls/databases.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IDatabases } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})
export class DatabasesComponent  implements OnInit , AfterViewChecked {

  // Component Data
  public data: IDatabases[] = [];
  public databaseData: IDatabases;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('databasesForm', { static: false }) public databasesForm: FormGroup;
  @ViewChild('databasesGrid', { static: false }) public databasesGrid: GridComponent;

  // Construction
  constructor(
    private _databasesService: DatabasesService,
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
            this_.databasesGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._databasesService.getDatabases({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.databasesGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.databasesGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.databaseData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.databasesForm.valid) {
              const this_ = this;
              this._databasesService.postDatabase(this.databaseData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.databasesGrid.pageSettings.currentPage, this.databasesGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.databasesGrid.pageSettings.currentPage, this.databasesGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.databasesGrid.pageSettings.currentPage, this.databasesGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }
  syncProcedures (event: any, inData: any) {

    const this_ = this;
    this._databasesService.syncProcedures({Id: inData.Id}).subscribe((data: any) => {
      this_.notificationService.showMessage(data, 'App Add/Edit');
    }, (error) => {
      this_.notificationService.showUnableToProcess();
    });
}
}



