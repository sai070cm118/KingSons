import { Component, OnInit, ViewChild  } from '@angular/core';
import { AppsService } from './apps.service';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { AppConfig } from '../../shared/config/appConfig';
import { GridComponent, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {
  public data: DataManager;
  public value: any;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  private apiSessionController: string = 'AppManager';

  @ViewChild('grid') public grid: GridComponent;

  constructor(private _appsService: AppsService, private _authService: AuthService) { }


  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.filterSettings = { type: 'Menu' };


    this.getData();

  }

  actionComplete(args) {
    // console.log(args);
    if ( args.action === 'add' || args.action === 'edit' ) {
      console.log(args.data);
      this._appsService.postApp(args.data).subscribe(res => {
        console.log(res);
        this.getData();
      });
    }
  }

  getData() {
    this._appsService.getApps().subscribe(x => {
      console.log(x);
      this.data = x.Result;
    });
  }
  dataBound() {
      // this.grid.autoFitColumns(['ShipAddress', 'ShipName']);
  }
}
