import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { EmployeeService } from '../../../../ApiCalls/employee.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { ISettings } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';
import {Router, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: ISettings[] = [];
  public userData: ISettings;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  // Grid Controls
  @ViewChild('userForm', { static: false }) public userForm: FormGroup;
  @ViewChild('userGrid', { static: false }) public userGrid: GridComponent;

  // Construction
  constructor(
    private _employeeService: EmployeeService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute
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
            this_.userGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._employeeService.getEmployees({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.userGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.userGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'add') {
        this._router.navigate(['Users/AddEditUser']);
      } else if (args.requestType === 'beginEdit') {
          this.userData = Object.assign({}, args.rowData);
          // this._router.navigate(['Users/AddEditUser', this.userData.Id], { relativeTo: this._route });
          this._router.navigate(['Users/AddEditUser', this.userData.Id]);
      } else if (args.requestType === 'save') {
          if (this.userForm.valid) {
              const this_ = this;
              this._employeeService.postEmployee(this.userData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.userGrid.pageSettings.currentPage, this.userGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.userGrid.pageSettings.currentPage, this.userGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.userGrid.pageSettings.currentPage, this.userGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }

}



