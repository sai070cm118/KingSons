import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ElementRef  } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';

import { DataManager, Query } from '@syncfusion/ej2-data';
import {  ProceduresService  } from '../../../../ApiCalls/procedures.service';
import {  RoutesService  } from '../../../../ApiCalls/routes.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IProcedures, IRoutes } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent  implements OnInit , AfterViewChecked {

  // Component Data
  public data: IRoutes[] = [];
  public routesData: IRoutes;
  public proceduresList: IProcedures[] = [];
  public fields: Object = { text: 'Name', value: 'Id' };

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public paramEditSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('routesForm', { static: false }) public routesForm: FormGroup;
  @ViewChild('routesGrid', { static: false }) public routesGrid: GridComponent;

  @ViewChild('ejDialog', { static: false }) ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { static: true , read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  // Construction
  constructor(
    private _proceduresService: ProceduresService,
    private _routesService: RoutesService,
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
            this_.routesGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._proceduresService.getProcedures({PageNo: 1 , PageSize: 10000}).subscribe((data) => {
      this_.proceduresList = data.Result;
      this_._routesService.getRoutes({PageNo: PageNo , PageSize: PageSize}).subscribe((resdata) => {
          this_.bindDateToGrid(resdata);
      });
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.routesGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.routesGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.routesData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.routesForm.valid) {
              const this_ = this;
              this._routesService.postRoute(this.routesData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.routesGrid.pageSettings.currentPage, this.routesGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.routesGrid.pageSettings.currentPage, this.routesGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.routesGrid.pageSettings.currentPage, this.routesGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }
}

