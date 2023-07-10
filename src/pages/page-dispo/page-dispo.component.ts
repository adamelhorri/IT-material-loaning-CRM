import { Component ,OnInit } from '@angular/core';
import { FilterArticlePipe } from 'app/filter-article.pipe';
  
import { Article } from 'app/models/article';
import { ArticlesService } from 'app/services/articles.service';



@Component({
  selector: 'app-page-dispo',
  templateUrl: './page-dispo.component.html',
  styleUrls: ['./page-dispo.component.css'],
  providers:[FilterArticlePipe]
})
export class PageDispoComponent{
  searchText:string='';
  title = 'Distribution';
  articles:Article[]=[];
  ArticleToEdit?: Article;
  switch=false;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
 
  

constructor(private articleService: ArticlesService){

  
}

ngOnInit():void{

  this.articleService.getArticles()
  .subscribe((result:Article[])=>(this.articles=result));
  this.fetchArticles();
  


  }
  fetchArticles(): void {
    this.articleService.getArticles().subscribe(
      (response) => {
        this.articles = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchArticles();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchArticles();
  }

  updateArticleList(articles:Article[]){
    this.articles=articles;
  }
  initNewArticle(){
    this.ArticleToEdit=new Article();
    
  }
  editArticle(article:Article){
    this.ArticleToEdit=article;
 
  }

  
 



}
