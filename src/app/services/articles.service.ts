import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Article } from '../models/article';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
 private url="Article"
  constructor(private http:HttpClient) {}
  public getArticles():Observable<Article[]>{
   const element= this.http.get<Article[]>(`${environment.apiUrl}/${this.url}`);
   console.log(element)
   return element;
  }
  public getArticlesByPo(po_purchase: number): Observable<Article[]> {
    const params = new HttpParams().set('po_purchase', po_purchase);
    console.log(params);
    return this.http.get<Article[]>(`${environment.apiUrl}/${this.url}`, { params });
  }
  public updateArticle(article:Article):Observable<Article[]>{
    return this.http.put<Article[]>(
      `${environment.apiUrl}/${this.url}`,article
    );
  }
  public createArticle(article:Article):Observable<Article[]>{
    return this.http.post<Article[]>(
      `${environment.apiUrl}/${this.url}`,article
    );
  }
  public deleteArticle(article:Article):Observable<Article[]>{
    return this.http.delete<Article[]>(
      `${environment.apiUrl}/${this.url}/${article.sn_article}`
    );
  }

}
