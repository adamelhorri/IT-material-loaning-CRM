import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Attribution } from '../../models/attribution';
import { NgModule } from '@angular/core';
import { AttributionsService } from 'app/services/attributions.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Article } from 'app/models/article';
import { User } from 'app/models/user';
import { ArticlesService } from 'app/services/articles.service';
import { UsersService } from 'app/services/users.service';
import { Purchase } from 'app/models/purchase';
import { PurchasesService } from 'app/services/purchases.service';
@Component({
  selector: 'app-create-attribution-by-po',
  templateUrl: './create-attribution-by-po.component.html',
  styleUrls: ['./create-attribution-by-po.component.css']
})
export class CreateAttributionByPoComponent {
  articles:Article[]=[];
  purchases:Purchase[]=[];
  users:User[]=[];
  dateValue: string = '';
  @Input() attribution:
  Attribution|undefined;
  nameUser='';
  selectedUser?:User;
  attributions :Attribution[]=[]
  namePurchase=0;
  selectedPurchase?:Purchase;
  
  @Output() attributionsUpdated=new EventEmitter<Attribution[]>();
 
  
  
  constructor(private datePipe: DatePipe,private attributionService:AttributionsService,private route: ActivatedRoute,private router:Router,private articleService:ArticlesService,private userService:UsersService,private purchaseService:PurchasesService){
    
  }
  ngOnInit(): void {  
    this.fetchArticles();
    this.fetchPurchases();
    this.fetchUsers(); 
    this.attributionService.getAttributions().subscribe((result: Attribution[]) => {
      this.attributions = result;
      
     
    });
  }
  clrID(attribution:Attribution){
    attribution.id_user=null;
  }
  clrPO(attribution:Attribution){
    attribution.po_purchase=null;
  }
  idUser(n:number|null |undefined):boolean{

    return n ? false :true;

  }
  isPoAttributed(po_purchase:number| null | undefined ) {
    const isAttributed = this.attributions.some(
      (attribution) =>
        attribution.po_purchase === po_purchase &&
        attribution.status_attribution !== "returned"
    );
  
    if (isAttributed) {
      return true;
    }
  
    const allArticlesAttributed = this.articles
      .filter((article) => article.po_purchase === po_purchase)
      .some((article) =>
        this.attributions.some(
          (attribution) =>
            attribution.sn_article === article.sn_article &&
            attribution.status_attribution !== "returned"
        )
      );
  
    return allArticlesAttributed;
  }
  



  onUserSelected(user: User) {
    this.selectedUser = user;
    if (this.selectedUser && this.attribution ) {
      this.attribution.id_user = this.selectedUser.id_user;
    }
  }
  onPurchaseSelected(purchase: Purchase) {
    this.selectedPurchase = purchase;
    if (this.selectedPurchase && this.attribution ) {
      this.attribution.po_purchase = this.selectedPurchase.po_purchase;
    }
  }
  refresh(): void {
    window.location.reload();
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
  
  parseDate(dateString: string): Date {
    return new Date(dateString+"T00:00:00");
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
    
    this.attributionService.updateAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()))
  }
  deleteAttribution(attribution:Attribution){
    this.attributionService.deleteAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()))
  }
  createAttribution(attribution:Attribution){
   
     attribution.purchase={
      po_purchase:0,
      status_purchase:"string",
      date_delivery_purchase:new Date
       

     }
     attribution.user={
       id_user:0,
       name_user:"",
       fname_user:"",
       title_user:"",
       location_user:"",
       email_user:"",
       departement_user:""
     }
     attribution.sn_article=null;
     attribution.article=null;
     attribution.date_attribution=new Date();
     


   
   
   console.log(attribution);

    this.attributionService.createAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
  
    
  }
  

}

