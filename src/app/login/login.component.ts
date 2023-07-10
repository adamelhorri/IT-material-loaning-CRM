import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string="";
  password: string="";
  message ="";
  tries:number=0;
  create=false;
  adminCredentials: User = {
    username: '',
    password: '',
    title: 'admin'
  };

  newUser: User = {
    username: '',
    password: '',
    title: 'user'
  };

  constructor(private router:Router , private authService: AuthenticationService) { }
  login(): void {
    this.authService.login(this.username, this.password)
      .then(success => {
        if (success) {
          this.router.navigate(['/attributions']);        } else {
          this.message="login failed , incorrect username or password";
          this.tries++;
        }
      })
      .catch(error => {

        console.error('Login error:', error);
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

interface User {
  username: string;
  password: string;
  title: string;
}
