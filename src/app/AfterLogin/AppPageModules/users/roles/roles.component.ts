import { Component, OnInit, ViewChild, AfterViewInit , AfterViewChecked, ElementRef} from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { RoleService } from '../../../../ApiCalls/role.service';
import { RoutesService } from '../../../../ApiCalls/routes.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IRole, IRoutes } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit , AfterViewChecked {

  // Component Data
  public data: IRole[] = [];
  public roleData: IRole;
  public routes: any[] = [];
  public roleRoutes: IRoutes[] = [];
  public groupView: any[] = [];


  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public paramDialogPos: object = {  Y: 100 };

  // Grid Controls
  @ViewChild('roleForm', { static: false }) public roleForm: FormGroup;
  @ViewChild('rolesGrid', { static: false }) public rolesGrid: GridComponent;

  @ViewChild('ejDialog', { static: false }) ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { static: true , read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  // Construction
  constructor(
    private _roleService: RoleService,
    private _routesService: RoutesService,
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
            this_.rolesGrid.height = event + 'px';
        }
    });
  }

  loadDataFormService(PageNo: number, PageSize: number) {
    const this_ = this;
    this._roleService.getRoles({PageNo: PageNo , PageSize: PageSize}).subscribe((data) => {
        this_.bindDateToGrid(data);
    });
  }

  bindDateToGrid(data: any) {
    const this_ = this;
    this_.rolesGrid.dataSource = {
        result: data.Result,
        count: data.Total
    };
    this_.rolesGrid.refresh();
  }

  actionBegin(args: any): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.roleData = Object.assign({}, args.rowData);
      } else if (args.requestType === 'save') {
          if (this.roleForm.valid) {
              const this_ = this;
              console.log(this.roleData);
              this._roleService.postRole(this.roleData).subscribe((data: any) => {
                this_.notificationService.showMessage(data, 'App Add/Edit');
                this_.loadDataFormService( this.rolesGrid.pageSettings.currentPage, this.rolesGrid.pageSettings.pageSize);
              }, (error) => {
                this_.notificationService.showUnableToProcess();
              });
              args.dialog.close();
          }
      } else if ( args.requestType === 'paging') {
        this.loadDataFormService( this.rolesGrid.pageSettings.currentPage, this.rolesGrid.pageSettings.pageSize);
      } else if ( args.requestType === 'cancel' ) {
        this.loadDataFormService( this.rolesGrid.pageSettings.currentPage, this.rolesGrid.pageSettings.pageSize);
      }

  }

  actionComplete(args: DialogEditEventArgs): void {

  }

  onOpenDialog(event: any, inData: any) {
      this.ejDialog.show();
      this.roleData = inData;
      this.loadRoutes();
  }

  loadRoutes() {
    const this_ = this;

    this_._roleService.getRoleRoutes({ RoleId: this_.roleData.Id }).subscribe((roleRouteData) => {


      this._routesService.getRoutes({ PageNo: 1 , PageSize: 10000 }).subscribe((data) => {
        this_.routes = data.Result;

        this_.routes.map((todo, i) => {
          // console.log(roleRouteData.Result.filter(function(node) {return node.RouteId === this_.routes[i].Id; }));
          if (roleRouteData.Result.filter(function(node) {return node.RouteId === this_.routes[i].Id; }).length > 0) {
            this_.routes[i].IsChecked = true;
          } else {
            this_.routes[i].IsChecked = false;
          }
        });

        const groups = this.routes.map(item => item.Group).filter((value, index, self) => self.indexOf(value) === index);
        const sectionCount = Math.ceil(groups.length / 3);
        const groupSize = 3;
        this_.groupView = [];

        for (let i = 0; i < sectionCount; i++) {

          this_.groupView.push({
            Section: i + 1,
            Groups: []
          });

          const secGroups = groups.slice(i * groupSize, (i + 1) * groupSize);
          (secGroups).forEach(element => {
            this_.groupView[i].Groups.push({
                Group: element,
                Routes: this.routes.filter(function(route) {
                  return route.Group === element;
                })
              });
          });
        }

      });
    });
  }

  saveRoleRoutes() {

    const this_ = this;
    let roleRoutes: any[] = [];
    this_.groupView.forEach(section => {
      section.Groups.forEach(Groups => {
        Groups.Routes.forEach(Route => {
          roleRoutes.push({
            RoleId: this_.roleData.Id,
            RouteId: Route.Id,
            IsChecked: Route.IsChecked
          });
        });
      });
    });

    this._roleService.postRoleRoutes(roleRoutes).subscribe((response) => {
      this_.notificationService.showMessage(response, 'App Add/Edit');
      this_.ejDialog.hide();
    });
    console.log(roleRoutes);
  }

}

