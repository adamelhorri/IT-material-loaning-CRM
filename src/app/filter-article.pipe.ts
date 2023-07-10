import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArticle'
})
export class FilterArticlePipe implements PipeTransform {
  transform(items: any[], searchText: string , page: number, pageSize: number): any[] {
    if (!items) return [];
    if (!searchText) return items.slice((page - 1) * pageSize, page * pageSize);

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
         ( item.sn_article && item.sn_article.toString().toLowerCase().includes(searchText)) ||
        (item.name_article && item.name_article.toString().toLowerCase().includes(searchText)) ||
        (item.description_article && item.description_article.toString().toLowerCase().includes(searchText)) ||
        (item.purchase && item.po_purchase && item.po_purchase.toString().toLowerCase().includes(searchText))||
        (item.article && item.article.type_article && item.article.type_article.toString().toLowerCase().includes(searchText))||
        (item.price_article && item.price_article.toString().toLowerCase().includes(searchText))
      );
    });
  }
}
