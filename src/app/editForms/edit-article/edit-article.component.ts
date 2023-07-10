import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Article } from 'app/models/article';
import { NgModule } from '@angular/core';
import { ArticlesService } from 'app/services/articles.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
import { Purchase } from 'app/models/purchase';
import { EditPurchaseComponent } from '../edit-purchase/edit-purchase.component';
import { PurchasesService } from 'app/services/purchases.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit{
  @Input() article?:Article|undefined;
  @Output() articlesUpdated=new EventEmitter<Article[]>();
  articleToEdit:Article | undefined;
  @Input() purchase?:Purchase|undefined;
  @Output() purchasesUpdated=new EventEmitter<Purchase[]>();
 @Input() switch=false;
  
  
  
  constructor(private articleService:ArticlesService,private purchaseService: PurchasesService,private route: ActivatedRoute,private router:Router){
   
  }
  ngOnInit(): void {
    console.log(this.article+"hello");

  }
  updateArticle(article:Article){

    console.log(article);
    
    this.articleService.updateArticle(article).subscribe((articles:Article[])=>this.articlesUpdated.emit(articles))
   
  }
  deleteArticle(article:Article){
    this.articleService.deleteArticle(article).subscribe((articles:Article[])=>this.articlesUpdated.emit(articles))
  }
  createArticle(article:Article){
    if (article.po_purchase) {
      article.purchase={
        po_purchase:0,
        status_purchase:"string",
        date_delivery_purchase:new Date()
      }
      
    }
    console.log(article);
    
  this.articleService.createArticle(article).subscribe((articles:Article[])=>this.articlesUpdated.emit(articles))
   
    
  }
  
  
  
    



}
