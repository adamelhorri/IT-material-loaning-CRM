import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


import { Article } from 'app/models/article';
@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent {
  @Input() articles: Article[]=[]; 
  @Output() articleSelected = new EventEmitter<Article>();
   @Input() articleName = '';
   @Input() articleSn?:number;
  @Input() name:string='';

  suggestedArticles: Article[] = [];
  formatArticleResult = (article: Article) => `----${article.name_article} sn: ${article.sn_article}------`;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? [] : this.getFilteredArticles(term))
    );
    searchSn = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? [] : this.getFilteredArticlesSn(term))
    );

  getFilteredArticles(searchTerm: string): Article[] {
   
     return this.articles.filter(article => article.name_article.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  selectArticle(article: Article)  {
    this.articleName = article.name_article;
    
    
    this.articleSelected.emit(article);
    
  }
  getFilteredArticlesSn(searchTerm: string): Article[] {
   
    return this.articles.filter(article => article.sn_article?.toString().includes(searchTerm.toLowerCase()));
 }

 selectArticleSn(article: Article)  {
   this.articleSn = article.sn_article;
   
   
   this.articleSelected.emit(article);
   
 }
 
}
