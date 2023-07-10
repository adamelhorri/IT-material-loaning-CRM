import { Component ,OnInit } from '@angular/core';
import { FilterArticlePipe } from 'app/filter-article.pipe';
  
import { User } from 'app/models/user';
import { UsersService } from 'app/services/users.service';


@Component({
  selector: 'app-page-users',
  templateUrl: './page-users.component.html',
  styleUrls: ['./page-users.component.css'],
  providers:[FilterArticlePipe]
})
export class PageUsersComponent implements OnInit{
  title = 'Distribution';
  searchText:string='';
  users:User[]=[];
  UserToEdit?: User;
  page: number = 1;
  count: number = 0;
  tableSize: number =   16;
  tableSizes: any = [3, 6, 9, 12];
  switch=false;
 
  

constructor(private userService: UsersService){

  
}

ngOnInit():void{

  this.userService.getUsers()
  .subscribe((result:User[])=>(this.users=result));
  


  this.fetchUsers();
  


  }
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
  }

  updateUserList(users:User[]){
    this.users=users;
  }
  initNewUser(){
    this.UserToEdit=new User();
    
  }
  editUser(user:User){
    this.UserToEdit=user;
 
  }

  
 



}
