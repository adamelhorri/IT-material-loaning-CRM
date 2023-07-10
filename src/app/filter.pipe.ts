import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string , page: number, pageSize: number): any[] {
    if (!items) return [];
    if (!searchText) return items.slice((page - 1) * pageSize, page * pageSize);

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        (item.user && item.user.fname_user && item.user.fname_user.toString().toLowerCase().includes(searchText)) ||
        (item.user && item.user.name_user && item.user.name_user.toString().toLowerCase().includes(searchText)) ||
        (item.user && item.user.departement_user && item.user.departement_user.toString().toLowerCase().includes(searchText)) ||
        (item.article && item.article.name_article && item.article.name_article.toString().toLowerCase().includes(searchText)) ||
        (item.id_attribution && item.id_attribution.toString().toLowerCase().includes(searchText)) ||
         ( item.sn_article && item.sn_article.toString().toLowerCase().includes(searchText)) ||
        (item.po_purchase && item.po_purchase.toString().toLowerCase().includes(searchText)) ||
        (item.id_user && item.id_user.toString().toLowerCase().includes(searchText))
      );
    });
  }
}