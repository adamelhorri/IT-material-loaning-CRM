import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  refresh(): void {
    window.location.reload();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
