import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Attribution } from '../../models/attribution';
import { NgModule } from '@angular/core';
import { AttributionsService } from 'app/services/attributions.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Article } from 'app/models/article';
import { ArticlesService } from 'app/services/articles.service';
import { PageAttributionsComponent } from 'pages/page-attributions/page-attributions.component';

@Component({
  selector: 'app-edit-attribution',
  templateUrl: './edit-attribution.component.html',
  styleUrls: ['./edit-attribution.component.css'],
  providers: [DatePipe]
})
export class EditAttributionComponent implements OnInit{
  dateValue: string = '';
  @Input() attribution:
  Attribution|undefined;
  articles:Article[]=[];
  actualSN:number=1;
  hardChange=true;

  @Output() attributionsUpdated=new EventEmitter<Attribution[]>();
 
  
  
  constructor(private datePipe: DatePipe,private attributionService:AttributionsService,private route: ActivatedRoute,private router:Router,private pac:PageAttributionsComponent){
    
  }
  ngOnInit(): void {   
    
  }

  hardChangeEnabler(){
    this.hardChange=false


  }
  setCommentVisible(){
    this.pac.commentVisible=true;
  }
  printToError():string{
    
    return'';
  }
  refresh(): void {
    window.location.reload();
  }
  handleSnArticleInput() {
    if (this.attribution?.sn_article === null || this.attribution?.sn_article === 0) {
      this.attribution.sn_article = 1;
    }
  }
  handleIdUserInput() {
    if (this.attribution?.id_user === null || this.attribution?.id_user === 0) {
      this.attribution.id_user = 1;
    }
  }
 
  
  parseDate(dateString: string): Date {
    return new Date(dateString+"T00:00:00");
  }
  logSuccessAndError(successMessage: string, errorMessage: string): void {
    console.log('Success:', successMessage);
    console.error('Error:', errorMessage);
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
    
      console.log("hello")
    this.attributionService.updateAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
   
  }
  deleteAttribution(attribution:Attribution){
    this.attributionService.deleteAttribution(attribution).subscribe((attributions:Attribution[])=>this.attributionsUpdated.emit(attributions.reverse()));
    
  }
 


}
