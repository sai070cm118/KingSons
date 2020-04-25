import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { AuditlogserviceService } from '../../../../ApiCalls/auditlogservice.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IAuditLog } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: IAuditLog[] = [];
  public appData: IAuditLog;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  // @ViewChild('appForm', { static: false }) public appForm: FormGroup;
  @ViewChild('auditlogGrid', { static: false }) public auditlogGrid: GridComponent;

  // Construction
  constructor(
    private _auditlogService: AuditlogserviceService,
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
            this_.auditlogGrid.height = (event + AppConfig.GridHeaderHeight ) + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._auditlogService.getAuditLogs({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
      console.log(data);
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.auditlogGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.auditlogGrid.refresh();
  }

  actionBegin(args: any): void {

    if ( args.requestType === 'paging') {
      this.loadDataFormService( this.auditlogGrid.pageSettings.currentPage, this.auditlogGrid.pageSettings.pageSize);
    }

  }

}
