import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


import { User } from 'app/models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})

export class UserSearchComponent {
  @Input() users: User[]=[]; 
  @Output() userSelected = new EventEmitter<User>();
   @Input() userName = '';
   @Input() userId? :number;
  @Input() name:string='';

  suggestedUsers: User[] = [];
  formatUserResult = (user: User) => `----${user.fname_user} ${user.name_user} id: ${user.id_user}------`;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? [] : this.getFilteredUsers(term))
    );
    searchId = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? [] : this.getFilteredUserId(term))
    );
    

  getFilteredUsers(searchTerm: string): User[] {
   
     return this.users.filter(user => ((user.fname_user+user.name_user+user.departement_user).toLowerCase().includes(searchTerm.toLowerCase() )));
  }

  selectUser(user: User)  {
    this.userName = user.fname_user;
    
    
    this.userSelected.emit(user);
    
  }
  getFilteredUserId(searchTerm: string): User[] {
   
    return this.users.filter(user => user.id_user?.toString().includes(searchTerm.toLowerCase()));
 }

 selectUserId(user: User)  {
   this.userId = user.id_user;
   
   
   this.userSelected.emit(user);
   
 }
 
}
