import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Attribution } from '../../models/attribution';
import { NgModule } from '@angular/core';
import { AttributionsService } from 'app/services/attributions.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Article } from 'app/models/article';
import { ArticlesService } from 'app/services/articles.service';
import { User } from 'app/models/user';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-create-attribution',
  templateUrl: './create-attribution.component.html',
  styleUrls: ['./create-attribution.component.css']
})
export class CreateAttributionComponent {
  dateValue: string = '';
  @Input() attribution:
  Attribution|undefined;
  articles:Article[]=[];
  users:User[]=[];
  selectedUser?:User;
  selectedArticle?:Article;
  nameArticle='';
  attributions :Attribution[]=[]
  @Output() attributionsUpdated=new EventEmitter<Attribution[]>();
  nameUser='';
  available=false;
  
  constructor(private datePipe: DatePipe,private attributionService:AttributionsService,private route: ActivatedRoute,private router:Router,private articleService:ArticlesService,private userService:UsersService){
    
  }
  ngOnInit(): void { 
    this.fetchArticles();  
    this.fetchUsers();

    this.attributionService.getAttributions().subscribe((result: Attribution[]) => {
      this.attributions = result;
      
     
    });
  }
  hasAttributedArticle(): boolean {
    return this.attributions.some((attribution) => {
      return this.articles.some((article) => {
        return article.sn_article === attribution.sn_article;
      });
    });
  } 
  isArticleAttributed(sn_article: number| null | undefined): boolean {
    
    const isAttributed = this.attributions.some(
      (attribution) =>
        (attribution.sn_article === sn_article &&
        attribution.status_attribution !== "returned")
       
    );
    const article = this.articles.find((article) => article.sn_article === sn_article);
    console.log("we're checking if is attributed by sn "+isAttributed)
    const isInPo=this.attributions.some(
      (attribution) =>(attribution.po_purchase===article?.po_purchase && attribution.status_attribution !== "returned" )
    );
    console.log("we're checking if is attributed by po "+isInPo);
  
    console.log("result "+isAttributed && isInPo);
   
    return isAttributed || isInPo;
  }


  clrSN(attribution:Attribution){
    attribution.sn_article=null;
  }
  clrID(attribution:Attribution){
    attribution.id_user=null;
  }
    onArticleSelected(article: Article) {
    this.selectedArticle = article;
    if (this.selectedArticle && this.attribution ) {
      this.attribution.sn_article = this.selectedArticle.sn_article;
    }
  }
  onUserSelected(user: User) {
    this.selectedUser = user;
    if (this.selectedUser && this.attribution ) {
      this.attribution.id_user = this.selectedUser.id_user;
    }
  }
  refresh(): void {
    window.location.reload();
  }
  
  
  parseDate(dateString: string): Date {
    return new Date(dateString+"T00:00:00");
  }
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
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
    attribution.article={
      sn_article:0,
      name_article:"string",
      description_article:"string",
      type_article:"string",
      po_purchase:0,
      purchase:{
        po_purchase:0,
        status_purchase:"string",
        date_delivery_purchase:new Date()
      }

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
   
    console.log(attribution);
    
    this.attributionService.updateAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()))
  }
  deleteAttribution(attribution:Attribution){
    this.attributionService.deleteAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()))
    
  }
  createAttribution(attribution:Attribution){

   
     attribution.article={
       sn_article:0,
       name_article:"string",
       description_article:"string",
       type_article:"string",
       po_purchase:0,
       purchase:{
         po_purchase:0,
         status_purchase:"string",
         date_delivery_purchase:new Date()
       }

     }
     attribution.user={
       id_user:0,
       title_user:"",
       location_user:"",
       name_user:"",
       fname_user:"",
       email_user:"",
       departement_user:""
     }

     attribution.po_purchase=null;
     attribution.purchase=null;
     attribution.date_attribution=new Date();

   
   
   console.log(attribution);
this.attributionService.createAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
    

  }
  



}

