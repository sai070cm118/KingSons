import { Component, OnInit, ViewChild  } from '@angular/core';
import { CustomErrorsService } from './custom-errors.service';
import { AuthService } from '../../Shared/services/auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { AppConfig } from '../../Shared/config/appConfig';
import { GridComponent } from '@syncfusion/ej2-angular-grids';



@Component({
  selector: 'app-custom-errors',
  templateUrl: './custom-errors.component.html',
  styleUrls: ['./custom-errors.component.css']
})
export class CustomErrorsComponent implements OnInit {
  public data: DataManager;
  public value: any;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];

  private apiSessionController: string = 'AppManager';

  constructor(private _customErrorService: CustomErrorsService, private _authService: AuthService) { }

  @ViewChild('grid') public grid: GridComponent;

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
      this._customErrorService.post(args.data).subscribe(res => {
        console.log(res);
        this.getData();
      });
    }
  }

  getData() {
    this._customErrorService.get().subscribe(x => {
      console.log(x);
      this.data = x.Result;
    });
  }
  dataBound() {
      // this.grid.autoFitColumns(['ShipAddress', 'ShipName']);
  }
}
