import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 private url="User"
  constructor(private http:HttpClient) {}
  public getUsers():Observable<User[]>{
   const element= this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
   console.log(element)
   return element;
  }
  public updateUser(user:User):Observable<User[]>{
    return this.http.put<User[]>(
      `${environment.apiUrl}/${this.url}`,user
    );
  }
  public createUser(user:User):Observable<User[]>{
    return this.http.post<User[]>(
      `${environment.apiUrl}/${this.url}`,user
    );
  }
  public deleteUser(user:User):Observable<User[]>{
    return this.http.delete<User[]>(
      `${environment.apiUrl}/${this.url}/${user.id_user}`
    );
  }
}
