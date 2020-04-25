import { DataUtil } from '@syncfusion/ej2-data';

const purchaseData: string = JSON.stringify([
    {
        'OrderID': 10248,
        'CustomerID': 'VINET',
        'OrderDate': '1996-07-04T10:10:00.000Z',
        'ShippedDate': '1996-07-16T12:20:00.000Z',
        'Freight': 32.38,
        'ShipName': 'Vins et alcools Chevalier',
        'ShipAddress': '59 rue de lAbbaye',
        'ShipCity': 'Reims',
        'ShipRegion': null,
        'ShipCountry': 'France'
    }
]);


export const orderDataSource: Object[] = JSON.parse(purchaseData, (field: any, value: any) => {
    return value;
});
