import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDispoComponent } from '../pages/page-dispo/page-dispo.component';

import { EditArticleComponent } from './editForms/edit-article/edit-article.component';
import { PageUsersComponent } from '../pages/page-users/page-users.component';
import { PageAttributionsComponent } from '../pages/page-attributions/page-attributions.component';
import { PagePurchasesComponent } from 'pages/page-purchases/page-purchases.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/AuthGuard';
const routes: Routes = [
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path :'',redirectTo:'/attributions',pathMatch:'full'},
  {path:'disponibilites',component:PageDispoComponent,pathMatch:'full'},
 


  {path:'employes',component:PageUsersComponent,pathMatch:'full',canActivate: [AuthGuard]},
  {path:'attributions',component:PageAttributionsComponent,pathMatch:'full',canActivate: [AuthGuard]},
  {path:'purchases',component:PagePurchasesComponent,pathMatch:'full',canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
