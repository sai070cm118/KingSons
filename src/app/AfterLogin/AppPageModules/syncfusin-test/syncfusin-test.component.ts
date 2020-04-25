
import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, PageSettingsModel, ToolbarItems , GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { AppsService } from '../../../ApiCalls/appService';
import { WindowSize } from '../../../Shared/CustomObservables/WindowService';

@Component({
  selector: 'app-syncfusin-test',
  templateUrl: './syncfusin-test.component.html',
  styleUrls: ['./syncfusin-test.component.scss']
})
export class SyncfusinTestComponent implements OnInit , AfterViewChecked {

  title = 'syncfustionTest';
  public data: IOrderModel[] = [
    {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
    },
    {
        OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
        ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
        ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
    },
    {
        OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
        ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
        ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
    },
    {
        OrderID: 10251, CustomerID: 'VICTE', EmployeeID: 3, OrderDate: new Date(8367642e5),
        ShipName: 'Victuailles en stock', ShipCity: 'Lyon', ShipAddress: '2, rue du Commerce',
        ShipRegion: 'CJ', ShipPostalCode: '69004', ShipCountry: 'France', Freight: 41.34, Verified: !0
    },
    {
        OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 4, OrderDate: new Date(8368506e5),
        ShipName: 'Suprêmes délices', ShipCity: 'Charleroi', ShipAddress: 'Boulevard Tirou, 255',
        ShipRegion: 'CJ', ShipPostalCode: 'B-6000', ShipCountry: 'Belgium', Freight: 51.3, Verified: !0
    },
    {
        OrderID: 10253, CustomerID: 'HANAR', EmployeeID: 3, OrderDate: new Date(836937e6),
        ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
        ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 58.17, Verified: !0
    },
    {
        OrderID: 10254, CustomerID: 'CHOPS', EmployeeID: 5, OrderDate: new Date(8370234e5),
        ShipName: 'Chop-suey Chinese', ShipCity: 'Bern', ShipAddress: 'Hauptstr. 31',
        ShipRegion: 'CJ', ShipPostalCode: '3012', ShipCountry: 'Switzerland', Freight: 22.98, Verified: !1
    },
    {
        OrderID: 10255, CustomerID: 'RICSU', EmployeeID: 9, OrderDate: new Date(8371098e5),
        ShipName: 'Richter Supermarkt', ShipCity: 'Genève', ShipAddress: 'Starenweg 5',
        ShipRegion: 'CJ', ShipPostalCode: '1204', ShipCountry: 'Switzerland', Freight: 148.33, Verified: !0
    },
    {
        OrderID: 10256, CustomerID: 'WELLI', EmployeeID: 3, OrderDate: new Date(837369e6),
        ShipName: 'Wellington Importadora', ShipCity: 'Resende', ShipAddress: 'Rua do Mercado, 12',
        ShipRegion: 'SP', ShipPostalCode: '08737-363', ShipCountry: 'Brazil', Freight: 13.97, Verified: !1
    },
    {
        OrderID: 10257, CustomerID: 'HILAA', EmployeeID: 4, OrderDate: new Date(8374554e5),
        ShipName: 'HILARION-Abastos', ShipCity: 'San Cristóbal', ShipAddress: 'Carrera 22 con Ave. Carlos Soublette #8-35',
        ShipRegion: 'Táchira', ShipPostalCode: '5022', ShipCountry: 'Venezuela', Freight: 81.91, Verified: !0
    },
    {
        OrderID: 10258, CustomerID: 'ERNSH', EmployeeID: 1, OrderDate: new Date(8375418e5),
        ShipName: 'Ernst Handel', ShipCity: 'Graz', ShipAddress: 'Kirchgasse 6',
        ShipRegion: 'CJ', ShipPostalCode: '8010', ShipCountry: 'Austria', Freight: 140.51, Verified: !0
    },
    {
        OrderID: 10259, CustomerID: 'CENTC', EmployeeID: 4, OrderDate: new Date(8376282e5),
        ShipName: 'Centro comercial Moctezuma', ShipCity: 'México D.F.', ShipAddress: 'Sierras de Granada 9993',
        ShipRegion: 'CJ', ShipPostalCode: '05022', ShipCountry: 'Mexico', Freight: 3.25, Verified: !1
    },
    {
        OrderID: 10260, CustomerID: 'OTTIK', EmployeeID: 4, OrderDate: new Date(8377146e5),
        ShipName: 'Ottilies Käseladen', ShipCity: 'Köln', ShipAddress: 'Mehrheimerstr. 369',
        ShipRegion: 'CJ', ShipPostalCode: '50739', ShipCountry: 'Germany', Freight: 55.09, Verified: !0
    },
    {
        OrderID: 10261, CustomerID: 'QUEDE', EmployeeID: 4, OrderDate: new Date(8377146e5),
        ShipName: 'Que Delícia', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua da Panificadora, 12',
        ShipRegion: 'RJ', ShipPostalCode: '02389-673', ShipCountry: 'Brazil', Freight: 3.05, Verified: !1
    },
    {
        OrderID: 10262, CustomerID: 'RATTC', EmployeeID: 8, OrderDate: new Date(8379738e5),
        ShipName: 'Rattlesnake Canyon Grocery', ShipCity: 'Albuquerque', ShipAddress: '2817 Milton Dr.',
        ShipRegion: 'NM', ShipPostalCode: '87110', ShipCountry: 'USA', Freight: 48.29, Verified: !0
    }];

    gridData: any;

  gridHeight: '10';
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderData: IOrderModel;
  public pageSettings: PageSettingsModel;
  @ViewChild('orderForm', { static: false }) public orderForm: FormGroup;
  public shipCityDistinctData: IOrderModel[];
  public shipCountryDistinctData: IOrderModel[];
  @ViewChild('grid', { static: false }) public grid: GridComponent;

  constructor(private _appsService: AppsService , private _windowSize: WindowSize) {

  }

  ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
      this.toolbar = ['Add', 'Edit', 'Delete'];
      this.shipCityDistinctData = DataUtil.distinct(this.data, 'ShipCity', true);
      this.shipCountryDistinctData = DataUtil.distinct(this.data, 'ShipCountry', true );
      this.pageSettings = { pageSizes: true,  pageSize: 10, pageCount: 10 };

  }

  ngAfterViewChecked() {
    // this.grid.height = this._windowSize.availHeight + 'px';
    // this.grid.refresh();
  }

  created() {
    console.log('created');

    const this_ = this;
    this._windowSize.availWindowHeight.subscribe({
        next: function(event: any) {
            console.log(event);
            // this.gridHeight = event + 'px';
            this_.grid.height = event + 'px';
            this_.grid.dataSource = {
                result: this_.data,
                count: 92
            };
            this_.grid.refresh();
        }
    });
  }


  actionBegin(args: SaveEventArgs): void {

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          this.orderData = Object.assign({}, args.rowData);
      }
      if (args.requestType === 'save') {
          if (this.orderForm.valid) {
              args.data = this.orderData;
          } else {
              args.cancel = true;
          }
      }

      if ( args.requestType === 'paging') {
        this.created();
      }

  }

  actionComplete(args: DialogEditEventArgs): void {
      if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          args.form.ej2_instances[0].rules = {};
          // Set initail Focus
          if (args.requestType === 'beginEdit') {
              (args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
          }
      }
      console.log(args);
      // this.created();
  }
}

export interface IOrderModel {
  OrderID?: number;
  CustomerID?: string;
  ShipCity?: string;
  OrderDate?: Date;
  EmployeeID?: number;
  Freight?: number;
  ShipCountry?: string;
  ShipAddress?: string;
  ShipName?: string;
  ShipRegion?: string;
  ShipPostalCode?: string;
  Verified?: boolean;

}
