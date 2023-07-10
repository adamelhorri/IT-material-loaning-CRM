import { Component,ElementRef,ViewChild } from '@angular/core';
import { Attribution } from 'app/models/attribution';
import { AttributionsService } from 'app/services/attributions.service';
import { FilterPipe } from 'app/filter.pipe';
import { Article } from 'app/models/article';
import { ArticlesService } from 'app/services/articles.service';
import jsPDF from 'jspdf';
import { Html2CanvasOptions } from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions,StyleDictionary,Content,ContentCanvas } from 'pdfmake/interfaces';
import { ArgumentOutOfRangeError } from 'rxjs';

import { color } from 'html2canvas/dist/types/css/types/color';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  
  selector: 'app-page-attributions',
  templateUrl: './page-attributions.component.html',
  styleUrls: ['./page-attributions.component.css'],
  providers:[FilterPipe],
  
})
export class PageAttributionsComponent {
 /////////////////////////// variables
 doc=new jsPDF();
  public commentVisible = false;
public statusVisible = false;
public departementVisible = false;
public dateVisible=false;
public idattributionVisible=false;
public snVisible=false;

public useridVisible=false;
public attributionTable=true;
public userTable=false;
public purchaseTable=false;
public titleVisible=false;
public locationVisible=false;
public descriptionVisible=false;
public typeVisible=false;
viewBase=false;

showAll=true;
showSn=false;
showPo=false;
  rowcolor:string='';
  searchText:string ='';
  articles:Article[]=[];
  title = 'Distribution';
  edit_by_sn=false;
  edit_by_po=false;
  edition=false;
  attributions:Attribution[]=[];
  AttributionToEdit: Attribution={
    id_attribution:undefined,
    sn_article: 0,
    article: {
      sn_article: 0,
      name_article: "",
      type_article:"",
      description_article: "",
      price_article: 0,
     
      po_purchase:0,
      purchase:{
        po_purchase:0,
        status_purchase:"string",
        date_delivery_purchase:new Date(),
      }
    },
    id_user: 0,
    user: {
      id_user: 0,
      title_user:"",
      location_user:"",
      name_user: "",
      fname_user: "",
      email_user: "",
      
      departement_user: ""
    },
    po_purchase: 0,
    purchase: 
    {
      po_purchase: 0,
      status_purchase :"string",
      date_delivery_purchase: new Date(),
    },
    comment_attribution: "string",
    status_attribution: "string",
    date_attribution:new Date(),
  

  };
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  selectedFilter: string = 'all';
  selectedFilterType: string = '';
  commentForReciept:string="";
  generatePDF=false;
 selectedArticle?:Article;
 bigTable=false;
 filterAc=false;
 filterAs=false;
 noFilter=true;
 controlForm=true;
 filteredAttributions: Attribution[] = this.attributions;
 filteredArticles: Article[] = this.articles;
  ////////////////////////////////////

constructor(private attributionService: AttributionsService,private articleService:ArticlesService){

  
}

ngOnInit(): void {
  

  this.articleService.getArticles().subscribe((result: Article[]) => {
    this.articles = result;
    this.onFilterChange();
  });
  this.attributionService.getAttributions().subscribe((result: Attribution[]) => {
    this.filteredArticles=this.articles;
    this.attributions = result;
    this.onFilterChange();
    console.log(this.filteredAttributions);
    
  });
  
  this.fetchArticles();
  this.fetchAttributions();
  
  
}
resetPagination(): void {
  this.page = 1;
  this.updateFilteredArticles(this.selectedFilterType);
}


async onFilterChange(): Promise<void> {
  let filteredAttributionsT: Attribution[] = [];
  

  if (this.selectedFilter === 'all') {
    filteredAttributionsT = this.attributions;
    this.tableSize = 10;
  } else if (this.selectedFilter === 'po') {
    filteredAttributionsT = this.attributions.filter(attribution => {
      return attribution.sn_article != null;
    });
    this.tableSize = 15;
  } else if (this.selectedFilter === 'sn') {
    filteredAttributionsT = this.attributions.filter(attribution => {
      return attribution.po_purchase != null;
    });
    this.tableSize = 15;
  } else if (this.selectedFilter === 'returned') {
    filteredAttributionsT = this.attributions.filter(attribution => {
      return attribution.status_attribution === 'returned';
    });
    this.tableSize = 10;
  } else if (this.selectedFilter === 'notreturned') {
    filteredAttributionsT = this.attributions.filter(attribution => {
      return attribution.status_attribution !== 'returned';
    });
    this.tableSize = 10;
  }

  if (this.selectedFilterType === 'asset') {
    this.art("asset");


    filteredAttributionsT = filteredAttributionsT.filter(attribution => {
      return (
        attribution.article?.type_article === 'asset' ||
        (this.filteredArticles.some(article => article.po_purchase === attribution.po_purchase)
          ? attribution.po_purchase
          : null)
      );
    });
    this.tableSize = 15;
  } else if (this.selectedFilterType === 'accessory') {
    this.art("accessory")


    filteredAttributionsT = filteredAttributionsT.filter(attribution => {
      return (
        attribution.article?.type_article === 'accessory' ||
        (this.filteredArticles.some(article => article.po_purchase === attribution.po_purchase)
          ? attribution.po_purchase
          : null)
      );
    });
    this.tableSize = 15;
  } else if (this.selectedFilterType === 'all') {

    await this.artAll();
    
    filteredAttributionsT = filteredAttributionsT.filter(attribution => {
      return (
        attribution)});
        
        await Promise.all([this.fetchArticles(), this.fetchAttributions()]);
    
    this.tableSize = 15;
  }

  await Promise.all([this.fetchArticles(), this.fetchAttributions()]);
  
  this.filteredAttributions = filteredAttributionsT;
  this.count = this.filteredAttributions.length;
}
async art(s:string):Promise<void>{
  this.filteredArticles = this.articles.filter(article => {
    return article.type_article === s;
  });
 

}
async artAll():Promise<void>{
  this.filteredArticles = this.articles.filter(article => {
    return article.type_article === "asset" ||article.type_article === "accessory" ;});
  
 
  await Promise.all([this.fetchArticles(), this.fetchAttributions()]);
}


async updateFilteredArticles(filterType: string): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      this.filteredArticles = this.articles.filter(article => {
        return article.type_article === filterType;
      });
      resolve();
    }, 200);
  });
}
async updateArticles(): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      this.filteredArticles = this.articles.filter(article => {
        return article.type_article;
      });
      resolve();
    }, 200);
  });
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
         }}
isIn(text:string,comment:string):boolean{
  return comment.includes(text);
}




clearWorkSpace()
{
  this.edit_by_sn=false;
  this.edit_by_po=false;
  this.edition=false;

}

generateReceiptPDF(attribution: Attribution) {

  const styles: StyleDictionary = {
    header: {
      fontSize: 16,
      bold: true,
      margin: [0, 0, 0, 10], 
      alignment: 'center',
      color:'',
    },
    content: {
      fontSize: 12,
      margin: [0, 0, 0, 5] 
    },
    text:{
      

    },
    table:{
      alignment:'left',
    


    },
    marginer10:{
      lineHeight:2

    },
    marginer2:{
      lineHeight:2
    }

  };

  
  const image='data:image/png;base64,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';
  const content: Content = [
    { image: image ,width: 160,
      absolutePosition: { x: 8, y: -20 } },
    { text: ' \n Attribution Receipt N° '+attribution.id_attribution?.toString() ?? '', style: 'header' },
    

     
    {
      table: {
        widths: ['37%', '63%'],
        body: [
          [
            {
              text:( attribution.po_purchase? 'Purchase Order:'+attribution.po_purchase?.toString() ?? '':'Purchase Order:'+ attribution.article?.po_purchase?.toString()) ,
              bold: true,
              border: [true, false, false, false],
              alignment: 'left',
              margin: [0, 5, 5, 5],
              style:'marginer2'
              
              
            },
            {
              text: '',
              border: [false, false, true, false], 
              margin: [5, 5, 0, 5] 
            }
          ],
          [
            {
              text: 'Employee Information:',
              bold: true,
              border: [true, false, false, false], 
              alignment: 'left',
              margin: [0, 5, 5, 5], 
              style:'marginer10'

            },
            {
              columns: [
                {
                  width: '*',
                  text: [
                    { text: 'TE id: ', bold: true,style:'marginer2' },
                    attribution.id_user?.toString() ?? '', 
                    '\n',
                    { text: 'Full name: ', bold: true,style:'marginer2' },
                    `${attribution.user?.name_user ?? ''} ${attribution.user?.fname_user ?? ''}`, 
                    '\n',
                    { text: 'Department: ', bold: true,style:'marginer2' },
                    attribution.user?.departement_user ?? '' 
                  ],
                  margin: [5, 5, 0, 5] 
                }
              ],
              border: [false, false, true, false], 
              margin: [5, 5, 0, 5] 
            }
          ],
          [
            {
              text: 'Attribution information:',
              bold: true,
              border: [true, false, false, false], 
              alignment: 'left',
              margin: [0, 5, 5, 5] ,
              style:'marginer10'
            },
            {
              columns: [
                {
                  width: '*',
                  text: [
                    { text: 'Equipement: ', bold: true ,style:'marginer2'},'\n',
                    { text: attribution.sn_article? `--SN: ${attribution.sn_article}-- : --${attribution.article?.name_article}-- ` : '' ,style:'marginer2'},
                    {
                      text: !attribution.sn_article
                        ? this.articles
                            .filter((article) => article.po_purchase === attribution.po_purchase)
                            .map((article) => `--SN:${article.sn_article}-- : --${article.name_article}--`)
                            .join('\n')
                        : ''
                    },
                    
                    '\n \n',
                    { text: 'Status :', bold: true ,style:'marginer2'},
                    { text :`${attribution.status_attribution?.toString()}` ,style:'marginer2' },
                    '\n',
                    { text: 'Returned equipement: \n', bold: true ,style:'marginer2' },
                    { text: attribution.comment_attribution ? ` ${attribution.comment_attribution}` : ' nothing has been returned' },
                    '\n \n',
                    { text: 'Date of attribution: ', bold: true, style:'marginer2' },
                    {text:attribution.date_attribution?.toString().slice(0,10) ?? ''+'\n',style:'marginer2'}, 
                    {text:'\n ' }
                  ],
                  margin: [5, 5, 0, 5] 
                }
              ],
              border: [false, false, true, false], 
              margin: [5, 5, 0, 5] 
            }
          ],
          
          
          [
            {
              text: 'Impression date: '+new Date().toISOString().slice(0,10)+'\n \n \n Administrator signature:',
              bold: true,
              border: [true, false, false, false], 
            alignment: 'left',
            margin: [20, 5, 5, 5]
          },
          {
            text: '\n \n \n Client signature:' , 
            border: [false, false, true, false], 
            margin: [5, 5, 0, 5] ,
            alignment: 'center',
            bold:true,
          }
        ]
      ]
    },
    style:'table',
    layout: 'noBorders'
    
  }
];



  const docDefinition: TDocumentDefinitions = {
    content: [content],
    styles: styles
  };

  pdfMake.createPdf(docDefinition).open();
}





initEdition(){
  this.edition=true;
}

initEBPO(){
  this.edition=false;
  this.edit_by_sn=false;
  this.edit_by_po=true;
}
initEBSN(){
  this.edition=false;
  this.edit_by_po=false;
  this.edit_by_sn=true;
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
onTableDataChange(event: any) {
  this.page = event;
  this.fetchAttributions();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.fetchAttributions();
}
clearDate(date:Date):String{
  return date.toString().slice(0,10)
  
}
  updateAttributionList(attributions:Attribution[]){
    this.attributions=attributions;
    this.onFilterChange();
  }
  initNewAttribution(){
    this.AttributionToEdit=new Attribution();
    this.onFilterChange();
  }
  editAttribution(attribution:Attribution){
    this.AttributionToEdit=attribution;
    this.onFilterChange();
  }

  
 



}
