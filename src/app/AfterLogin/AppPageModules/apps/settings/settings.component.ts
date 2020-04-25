import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { SettingsService } from '../../../../ApiCalls/settings.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { ISettings } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent  implements OnInit , AfterViewChecked {

  // Component Data
  public data: ISettings[] = [];
  public settingData: ISettings;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('settingsForm', { static: false }) public settingsForm: FormGroup;
  @ViewChild('settingsGrid', { static: false }) public settingsGrid: GridComponent;

  // Construction
  constructor(
    private _settingsService: SettingsService,
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
            this_.settingsGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._settingsService.getSettings({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.settingsGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.settingsGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.settingData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.settingsForm.valid) {
              const this_ = this;
              this._settingsService.postSetting(this.settingData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.settingsGrid.pageSettings.currentPage, this.settingsGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.settingsGrid.pageSettings.currentPage, this.settingsGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.settingsGrid.pageSettings.currentPage, this.settingsGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }

}



