import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageDispoComponent } from '../pages/page-dispo/page-dispo.component';
import { NavBarComponent } from './decoComponents/nav-bar/nav-bar.component';
import {  HttpClientModule } from '@angular/common/http';
import { FootBarComponent } from './decoComponents/foot-bar/foot-bar.component';
import { EditArticleComponent } from './editForms/edit-article/edit-article.component';
import { FormsModule } from '@angular/forms';
import { PageUsersComponent } from 'pages/page-users/page-users.component';
import { EditUserComponent } from './editForms/edit-user/edit-user.component';
import { PageAttributionsComponent } from 'pages/page-attributions/page-attributions.component';
//here
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditAttributionComponent } from './editForms/edit-attribution/edit-attribution.component';
import { PagePurchasesComponent } from '../pages/page-purchases/page-purchases.component';
import { EditPurchaseComponent } from './editForms/edit-purchase/edit-purchase.component';
import { DatePipe } from '@angular/common';
import { EditAttributionByPoComponent } from './editForms/edit-attribution-by-po/edit-attribution-by-po.component';
import { CreateAttributionComponent } from './editForms/create-attribution/create-attribution.component';
import { CreateAttributionByPoComponent } from './editForms/create-attribution-by-po/create-attribution-by-po.component';
import { FilterPipe } from './filter.pipe';
import { FilterPurchasePipe } from './filter-purchase.pipe';
import { FilterArticlePipe } from './filter-article.pipe';
import { FilterUserPipe } from './filter-user.pipe';
import { PdfPrinterComponent } from './pdf-printer/pdf-printer.component';
import { ArticleSearchComponent } from './searchers/article-search/article-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './searchers/user-search/user-search.component';
import { PurchaseSearchComponent } from './searchers/purchase-search/purchase-search.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PageDispoComponent,
    NavBarComponent,
 
    EditUserComponent,
    FootBarComponent,
    EditArticleComponent,
    PageUsersComponent,
    EditUserComponent,
    PageAttributionsComponent,
    EditAttributionComponent,
    EditAttributionComponent,
    PagePurchasesComponent,
    EditPurchaseComponent,
    EditAttributionByPoComponent,
    CreateAttributionComponent,
    CreateAttributionByPoComponent,
    FilterPipe,
    FilterPurchasePipe,
    FilterArticlePipe,
    FilterUserPipe,
    PdfPrinterComponent,
    ArticleSearchComponent,
    UserSearchComponent,
    PurchaseSearchComponent,
    LoginComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
