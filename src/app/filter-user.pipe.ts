import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], searchText: string , page: number, pageSize: number): any[] {
    if (!items) return [];
    if (!searchText) return items.slice((page - 1) * pageSize, page * pageSize);

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
         ( item.id_user && item.id_user.toString().toLowerCase().includes(searchText)) ||
        (item.name_user && item.name_user.toString().toLowerCase().includes(searchText)) ||
        (item.fname_user && item.fname_user.toString().toLowerCase().includes(searchText)) ||
        (item.departement_user && item.departement_user.toString().toLowerCase().includes(searchText))
      );
    });
  }
}

