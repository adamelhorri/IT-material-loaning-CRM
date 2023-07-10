import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


import { Purchase } from 'app/models/purchase';

@Component({
  selector: 'app-purchase-search',
  templateUrl: './purchase-search.component.html',
  styleUrls: ['./purchase-search.component.css']
})
export class PurchaseSearchComponent {
  @Input() purchases: Purchase[]=[]; // Input property to receive the purchases data from the parent component
  @Output() purchaseSelected = new EventEmitter<Purchase>();
   @Input() purchasePO? :number;
  @Input() name:string='';

  suggestedPurchases: Purchase[] = [];
  formatPurchaseResult = (purchase: Purchase) => `----${purchase.po_purchase}------`;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? [] : this.getFilteredPurchases(term))
    );

  getFilteredPurchases(searchTerm: string): Purchase[] {
   
     return this.purchases.filter(purchase => purchase.po_purchase?.toString().includes(searchTerm.toLowerCase()));
  }

  selectPurchase(purchase: Purchase)  {
    this.purchasePO = purchase.po_purchase;
    
    
    this.purchaseSelected.emit(purchase);
    
  }
 
}
