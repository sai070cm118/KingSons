import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { EmployeeService } from '../../../../ApiCalls/employee.service';
import {  AppsService } from '../../../../ApiCalls/appService';
import {  RoleService } from '../../../../ApiCalls/role.service';
import {  RoutesService } from '../../../../ApiCalls/routes.service';
import { WindowSize } from '../../../../Shared/CustomObservables/WindowService';
import { RandomstringService } from '../../../../Shared/randomstring.service';
import { NotificationService } from '../../../../Shared/tosterservice/notification.service';
import { IAppUser, IRole, IRoutes } from '../../../../ApiCalls/Models/model';
import { AppConfig } from '../../../../Shared/config/appConfig';
import {Router, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.scss']
})
export class AddedituserComponent  implements OnInit , AfterViewChecked {

  // Component Data
  public userData: IAppUser = {};
  public UserRole: any[] = [];
  public UserRoutes: any;
  public IsNewUser: boolean = true;
  public rolesList: IRole[] = [];
  public routesList: IRoutes[] = [];
  public groupView: any[] = [];
  public hasCustom: boolean = false;

  // Grid Settings
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public appsList: any[] = [];

  public fields: Object = { text: 'Name', value: 'Id' };
  // Forms
  @ViewChild('manageUserForm', { static: false }) public manageUserForm: FormGroup;
  @ViewChild('manageUserRolesForm', { static: false }) public manageUserRolesForm: FormGroup;
  @ViewChild('manageUserRoleForm', { static: false }) public manageUserRoleForm: FormGroup;

  // Construction
  constructor(
    private _employeeService: EmployeeService,
    private _windowSize: WindowSize,
    private notificationService: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _appsService: AppsService,
    private _randomstringService: RandomstringService,
    private _roleService: RoleService,
    private _routesService: RoutesService
  ) { }

  ngOnInit(): void {

      this.pageSettings = {   pageSize: AppConfig.PAGESIZE, pageSizes: AppConfig.PAGESIZES};
      console.log(this._route.snapshot);
      if (this._route.snapshot.params['id'] !== undefined) {
        this.IsNewUser = false;
      }

      console.log(this._route.snapshot.params['id']);
      this.loadDataFormService(AppConfig.PAGENO, AppConfig.PAGESIZE, this._route.snapshot.params['id'] );
  }

  ngAfterViewChecked() {

  }


  loadDataFormService(PageNo: number, PageSize: number, Id: number) {
    const this_ = this;

    if (this_.IsNewUser) {
      this_._appsService.getApps({PageNo: 1, PageSize: 1000}).subscribe((appsData) => {
        this_.appsList = appsData.Result;
      });


    }

    this_._roleService.getRoles({PageNo: PageNo , PageSize: PageSize}).subscribe((response) => {
        this_.rolesList = response.Result;
        this_._employeeService.getUserRoles({PageNo: 1, PageSize: 1000, UserId: this._route.snapshot.params['id'] })
        .subscribe((appsData) => {
          this_.UserRole = appsData.Result;
          this_.hasCustom = false;
          (this_.UserRole).forEach(element1 => {
            (this_.rolesList).forEach(element2 => {
              if (element1.RoleId === element2.Id) {
                element2['HasAccess'] = true;
                if (element2.IsCustom === true) {
                  this_.hasCustom = true;
                }
              }
            });
          });
          if ( this_.hasCustom ) {
            this_.loadRoutes();
          } else {
            this_.groupView = [];
          }
        });

        this_._employeeService.getEmployee({PageNo: PageNo , PageSize: PageSize, Id: Id}).subscribe((data) => {
          if ( data.Result.length > 0 ) {
            this_.userData = data.Result[0];
          }
      });
    });
  }

  saveUser() {
    const this_ = this;
    console.log(this_.userData);
    this._employeeService.postEmployee(this.userData).subscribe((data) => {
        console.log(data);
        if (!data.IsError) {
          // this_.loadDataFormService(1, 10, data.CreatedId);
          this._router.navigate(['Users/AddEditUser', this_.userData.Id  ?  this_.userData.Id : data.CreatedId]);
        }
        this_.notificationService.showMessage(data, 'App Add/Edit');
    });
  }

  activeUser() {
    const this_ = this;
    setTimeout(function() {
      this_._employeeService.changeActiveStatus(this_.userData).subscribe((data) => {
        if (!data.IsError) {
          this_._router.navigate(['Users/AddEditUser', this_.userData.Id  ?  this_.userData.Id : data.CreatedId]);
        }
        this_.notificationService.showMessage(data, 'App Add/Edit');
      });
    }, 1000 );
  }

  newUser() {
    this._router.navigate(['Users/AddEditUser']);
  }

  generateRandomPass() {
    this.userData.Password = this._randomstringService.randomString(8);
  }

  resetPassword() {
    const this_ = this;
    this_._employeeService.resetPassword(this_.userData).subscribe((response) => {
      this_.notificationService.showMessage(response, 'App Add/Edit');
    });
  }

  changeRole(event: any, roleId: number) {
    const this_ = this;
    this_._employeeService.ChangeRole({UserId: this_.userData.Id, RoleId: roleId, HasAccess: event.checked }).subscribe((result) => {
      this_.notificationService.showMessage(result, 'App Add/Edit');
      this.loadDataFormService(AppConfig.PAGENO, AppConfig.PAGESIZE, this._route.snapshot.params['id'] );
    });
  }

  loadRoutes() {
    const this_ = this;

    this_._employeeService.getUserRoutes({ UserId: this._route.snapshot.params['id'] }).subscribe((userroleRouteData) => {


      this._routesService.getRoutes({ PageNo: 1 , PageSize: 10000 }).subscribe((data) => {
        this_.routesList = data.Result;

        this_.routesList.map((todo, i) => {
          // console.log(roleRouteData.Result.filter(function(node) {return node.RouteId === this_.routes[i].Id; }));
          if (userroleRouteData.Result.filter(function(node) {return node.RouteId === this_.routesList[i].Id; }).length > 0) {
            this_.routesList[i].IsChecked = true;
          } else {
            this_.routesList[i].IsChecked = false;
          }
        });

        const groupSize = 2;
        const groups = this.routesList.map(item => item.Group).filter((value, index, self) => self.indexOf(value) === index);
        const sectionCount = Math.ceil(groups.length / groupSize);
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
                Routes: this.routesList.filter(function(route) {
                  return route.Group === element;
                })
              });
          });
        }

      });
    });
  }

  changeRoute(event: any, routeId: number) {
    const this_ = this;
    this_._employeeService.changeRoute({UserId: this_.userData.Id, RouteId: routeId, HasAccess: event.checked }).subscribe((result) => {
      this_.notificationService.showMessage(result, 'App Add/Edit');
    });
  }
}



