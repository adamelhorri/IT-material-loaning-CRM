import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Attribution } from '../../models/attribution';
import { NgModule } from '@angular/core';
import { AttributionsService } from 'app/services/attributions.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ArticlesService } from 'app/services/articles.service';
import { Article } from 'app/models/article';
import { PageAttributionsComponent } from 'pages/page-attributions/page-attributions.component';
@Component({
  selector: 'app-edit-attribution-by-po',
  templateUrl: './edit-attribution-by-po.component.html',
  styleUrls: ['./edit-attribution-by-po.component.css']
})
export class EditAttributionByPoComponent {
  dateValue: string = '';

  
  @Input() attribution:
  Attribution|undefined;
  articles:Article[]=[];
  @Output() attributionsUpdated=new EventEmitter<Attribution[]>();
  boolForComment=false;
  
  clicked = false;
  hardChange=true;
  
  constructor(private datePipe: DatePipe,private attributionService:AttributionsService,private route: ActivatedRoute,private router:Router,private articleService:ArticlesService,private pac:PageAttributionsComponent){
    
  }
  isIn(text:string,comment:string):boolean{
    if(comment.includes(text)){
      return true;
    }
    return false;
  }
  autoStatus(attribution:Attribution){
   let a=0;
        this.articles
          .filter((article) => article.po_purchase === attribution.po_purchase)
          .forEach((article) => {
            if(!attribution.comment_attribution.includes(article.name_article))
            a++;
          });
          console.log(a);
          if(a==0){
            attribution.status_attribution="returned"
    
           this.updateAttribution(attribution);

          }
        
      
      
    
  
  }

  ngOnInit(): void {   
    this.fetchArticles();
  }
  setCommentVisible(){
    this.pac.commentVisible=true;
  }
  handleSnArticleInput() {
    if (this.attribution?.po_purchase === null || this.attribution?.po_purchase === 0) {
      this.attribution.po_purchase = 1;
    }
  }
  handleIdUserInput() {
    if (this.attribution?.id_user === null || this.attribution?.id_user === 0) {
      this.attribution.id_user = 1;
    }
  }
  

  addArticleToComment(articleName: string,articleSn:number |undefined): void {
   
    if(articleSn && this.attribution && !this.attribution.comment_attribution.includes(articleName+' '+articleSn.toString())){

      this.attribution.comment_attribution += "\n--"
    this.attribution.comment_attribution += articleName+' '+articleSn.toString();
    this.attribution.comment_attribution += "-returned- \n";}
  }
  actionMethod(event: any) {
    event.target.disabled = true;
}
  
  
  refresh(): void {
    window.location.reload();
  }
  parseDate(dateString: string): Date {
    return new Date(dateString+"T00:00:00");
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
  updateAttribution(attribution:Attribution){
    attribution.purchase={
      po_purchase:0,
      status_purchase:"string",
      date_delivery_purchase:new Date
       

     }
     attribution.user={
       id_user:0,
       name_user:"",
       title_user:"",
       location_user:"",
       fname_user:"",
       email_user:"",
       departement_user:""
     }
     attribution.sn_article=null;
     attribution.article=null;

   
    console.log(attribution);

   
    this.attributionService.updateAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
  
    
  
  }
  deleteAttribution(attribution:Attribution){
    this.attributionService.deleteAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
   
  }
  
  
  

}
