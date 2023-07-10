import { Component ,OnInit } from '@angular/core';
import { FilterPurchasePipe } from 'app/filter-purchase.pipe';
import { Article } from 'app/models/article';
  
import { Purchase } from 'app/models/purchase';
import { ArticlesService } from 'app/services/articles.service';
import { PurchasesService } from 'app/services/purchases.service';
import { Attribution } from 'app/models/attribution';
import { AttributionsService } from 'app/services/attributions.service';

@Component({
  selector: 'app-page-purchases',
  templateUrl: './page-purchases.component.html',
  styleUrls: ['./page-purchases.component.css'],
  providers:[FilterPurchasePipe]
})
export class PagePurchasesComponent implements OnInit{
  title = 'Distribution';
  searchText:string ='';
  purchases:Purchase[]=[];
  articles:Article[]=[];
  PurchaseToEdit?: Purchase;
  ArticleToEdit?: Article;
  page: number = 1;
  count: number = 0;
  tableSize: number = 15;
  tableSizes: any = [3, 6, 9, 12];
  attributions:Attribution[]=[];
  switchToP=false;
  switchToA=false;
  switchAP=false;
 
  

constructor(private purchaseService: PurchasesService,private articleService:ArticlesService,private attributionService: AttributionsService){

  
}

ngOnInit():void{

  this.purchaseService.getPurchases()
  .subscribe((result:Purchase[])=>(this.purchases=result));
  this.articleService.getArticles().subscribe((result:Article[])=>(this.articles=result));
  this.attributionService.getAttributions().subscribe((result: Attribution[]) => {this.attributions = result });
  


  this.fetchArticles();
  


  this.fetchPurchases();
  this.fetchAttributions();


  }
  isAvailable(article:Article):boolean {
 
    let byPo = this.attributions.some((attribution) => {
      return (
        (attribution.po_purchase === article.po_purchase &&
          this.purchases.some((purchase) => purchase.po_purchase === attribution.po_purchase) &&
          (this.isIn(article.name_article, attribution.comment_attribution) || attribution.status_attribution === "returned")
        ) ||
        !this.attributions.some((attr) => attr.po_purchase === article.po_purchase)
      );
    });
    let bySn = this.attributions.some((attribution) => {
      return (
        (attribution.sn_article === article.sn_article && attribution.status_attribution === "returned") ||
        !this.attributions.some((attr) => attr.sn_article === article.sn_article)
      );
    });
  

      
    
return byPo && bySn ;
  }
  isIn(text:string,comment:string):boolean{
    return comment.includes(text);
  }
  
  
  clearDate(date:Date):String{
    return date.toString().slice(0,10)
    
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
  fetchPurchases(): void {
    this.purchaseService.getPurchases().subscribe(
      (response) => {
        this.purchases = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPurchases();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPurchases();
  }

  updatePurchaseList(purchases:Purchase[]){
    this.purchases=purchases;
  }
  initNewPurchase(){
    this.PurchaseToEdit=new Purchase();
    
  }
  editPurchase(purchase:Purchase){
    this.PurchaseToEdit=purchase;
 
  }
  updateArticleList(articles:Article[]){
    this.articles=articles;
  }
  initNewArticle(){
    this.ArticleToEdit=new Article();
    
  }
  fetchAttributions(): void {
    this.attributionService.getAttributions().subscribe(
      (response) => {
        this.attributions = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editArticle(article:Article){
    this.ArticleToEdit=article;
 
  }

  
 



}
