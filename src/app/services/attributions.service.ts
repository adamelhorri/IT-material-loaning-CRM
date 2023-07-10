import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Attribution } from '../models/attribution';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributionsService {
  private url="Attribution"
   constructor(private http:HttpClient) {}
   
   public getAttributions(): Observable<Attribution[]> {
    const element = this.http.get<Attribution[]>(`${environment.apiUrl}/${this.url}`);
    return element.pipe(map(attributions => attributions.reverse()));
  }
   public updateAttribution(attribution:Attribution):Observable<Attribution[]>{
    console.log("hello"+this.http.put<Attribution[]>(
      `${environment.apiUrl}/${this.url}`,attribution));
    return this.http.put<Attribution[]>(
       `${environment.apiUrl}/${this.url}`,attribution
       
     );
   }
   public createAttribution(attribution:Attribution):Observable<Attribution[]>{
     return this.http.post<Attribution[]>(
       `${environment.apiUrl}/${this.url}`,attribution
     );
   }
   public deleteAttribution(attribution:Attribution):Observable<Attribution[]>{
     return this.http.delete<Attribution[]>(
       `${environment.apiUrl}/${this.url}/${attribution.id_attribution}`
     );
   }
 }
 