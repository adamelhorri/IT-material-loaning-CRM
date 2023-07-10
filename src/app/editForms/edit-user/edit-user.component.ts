import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { User } from 'app/models/user';
import { NgModule } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {ActivatedRoute, Router} from "@angular/router";
import { find } from 'rxjs';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  @Input() user?:User|undefined;
  @Output() usersUpdated=new EventEmitter<User[]>();
  userToEdit?:User;
  @Input() switch=false;
  
  constructor(private userService:UsersService,private route: ActivatedRoute,private router:Router){
   
  }
  ngOnInit(): void {
    console.log(this.user);
   
   

   
    


      
  }
  updateUser(user:User){
    this.userService.updateUser(user).subscribe((users:User[])=>this.usersUpdated.emit(users))
  }
  deleteUser(user:User){
    this.userService.deleteUser(user).subscribe((users:User[])=>this.usersUpdated.emit(users))
  }
  createUser(user:User){
    this.userService.createUser(user).subscribe((users:User[])=>this.usersUpdated.emit(users))
  }
  



}
