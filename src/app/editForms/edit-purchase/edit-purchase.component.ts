import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Purchase } from 'app/models/purchase';
import { NgModule } from '@angular/core';
import { PurchasesService } from '../../services/purchases.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent implements OnInit{
  @Input() purchase?:Purchase|undefined;
  @Output() purchasesUpdated=new EventEmitter<Purchase[]>();
  
  
  constructor(private purchaseService:PurchasesService,private route: ActivatedRoute,private router:Router){
   
  }
  ngOnInit(): void {
    console.log(this.purchase);
   
   

   
    


      
  }
  
  
  updatePurchase(purchase:Purchase){
    this.purchaseService.updatePurchase(purchase).subscribe((purchases:Purchase[])=>this.purchasesUpdated.emit(purchases))
  }
  deletePurchase(purchase:Purchase){
    this.purchaseService.deletePurchase(purchase).subscribe((purchases:Purchase[])=>this.purchasesUpdated.emit(purchases))
  }
  createPurchase(purchase:Purchase){
    purchase.date_delivery_purchase=new Date();
    this.purchaseService.createPurchase(purchase).subscribe((purchases:Purchase[])=>this.purchasesUpdated.emit(purchases))
  }
  



}
