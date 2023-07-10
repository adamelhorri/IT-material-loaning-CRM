import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
 private url="Purchase"
  constructor(private http:HttpClient) {}
  public getPurchasesByPo(po_purchase:number |undefined):Observable<Purchase[]>{
    const element= this.http.get<Purchase[]>(`${environment.apiUrl}/${this.url}/${po_purchase}`);
    console.log(element)
    return element;
   }
  public getPurchases():Observable<Purchase[]>{
   const element= this.http.get<Purchase[]>(`${environment.apiUrl}/${this.url}`);
   console.log(element)
   return element;
  }
  public updatePurchase(purchase:Purchase):Observable<Purchase[]>{
    return this.http.put<Purchase[]>(
      `${environment.apiUrl}/${this.url}`,purchase
    );
  }
  public createPurchase(purchase:Purchase):Observable<Purchase[]>{
    return this.http.post<Purchase[]>(
      `${environment.apiUrl}/${this.url}`,purchase
    );
  }
  public deletePurchase(purchase:Purchase):Observable<Purchase[]>{
    return this.http.delete<Purchase[]>(
      `${environment.apiUrl}/${this.url}/${purchase.po_purchase}`
    );
  }
  

}
