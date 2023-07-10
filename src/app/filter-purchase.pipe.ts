import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPurchase'
})
export class FilterPurchasePipe implements PipeTransform {
  transform(items: any[], searchText: string , page: number, pageSize: number): any[] {
    if (!items) return [];
    if (!searchText) return items.slice((page - 1) * pageSize, page * pageSize);

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
         ( item.po_purchase && item.po_purchase.toString().toLowerCase().includes(searchText)) ||
        (item.status_purchase && item.status_purchase.toString().toLowerCase().includes(searchText)) ||
        (item.date_delivery_purchase && item.date_delivery_purchase.toString().toLowerCase().includes(searchText))
      );
    });
  }
}
