import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Admin } from 'app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
 private url="Admin"
  constructor(private http:HttpClient) {}
  public getAdmins():Observable<Admin[]>{
   const element= this.http.get<Admin[]>(`${environment.apiUrl}/${this.url}`);
   console.log(element)
   return element;
  }
  public updateAdmin(admin:Admin):Observable<Admin[]>{
    return this.http.put<Admin[]>(
      `${environment.apiUrl}/${this.url}`,admin
    );
  }
  public createAdmin(admin:Admin):Observable<Admin[]>{
    return this.http.post<Admin[]>(
      `${environment.apiUrl}/${this.url}`,admin
    );
  }
  public deleteAdmin(admin:Admin):Observable<Admin[]>{
    return this.http.delete<Admin[]>(
      `${environment.apiUrl}/${this.url}/${admin.id}`
    );
  }
}
