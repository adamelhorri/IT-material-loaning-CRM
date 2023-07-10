import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStatusService } from './user-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedInValue = false;
  private usersUrl = 'assets/users.json';
  private sessionTimeout = 30 * 60 * 1000;
  private sessionTimer: any;
  private readonly loginKey = 'isLoggedIn';
  public currentUser: User | null = null;
  @Output() currentUserChanged: EventEmitter<User | null> = new EventEmitter<User | null>();

  constructor(private http: HttpClient, private userStatusService: UserStatusService) {
    this.loadLoginStatus();
    const connectedUserString = localStorage.getItem('connectedUser');
    this.currentUser = connectedUserString ? JSON.parse(connectedUserString) : null;
  }

  setUserLoggedIn(user: User | null): void {
    this.currentUser = user;
    this.currentUserChanged.emit(this.currentUser);
    if (user) {
      localStorage.setItem('connectedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('connectedUser');
    }
  }

  login(username: string, password: string): Promise<boolean> {
    return this.http
      .get<User[]>(this.usersUrl)
      .toPromise()
      .then((users) => {
        const user = users?.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.isLoggedInValue = true;
          this.currentUser = user;
          this.resetSessionTimeout();
          this.saveLoginStatus();
          this.userStatusService.setUserLoggedIn(user);
          localStorage.setItem('connectedUser', JSON.stringify(user)); 
          return true;
        } else {
          this.isLoggedInValue = false;
          return false;
        }
      })
      .catch((error) => {
        console.error('Failed to retrieve user data:', error);
        return false;
      });
  }

  logout(): void {
    this.isLoggedInValue = false;
    clearTimeout(this.sessionTimer);
    this.clearLoginStatus();
    this.userStatusService.setUserLoggedIn(null);
    localStorage.removeItem('connectedUser');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInValue;
  }

  private resetSessionTimeout(): void {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(() => {
      this.logout();
    }, this.sessionTimeout);
  }

  private saveLoginStatus(): void {
    localStorage.setItem(this.loginKey, 'true');
  }

  private loadLoginStatus(): void {
    const isLoggedIn = localStorage.getItem(this.loginKey);
    this.isLoggedInValue = isLoggedIn === 'true';
  }

  private clearLoginStatus(): void {
    localStorage.removeItem(this.loginKey);
  }
  register(user: User): Promise<boolean> {
    console.log(user)
    return new Promise<boolean>((resolve) => {
      this.http.post<User>(this.usersUrl, user)
        .subscribe(
          response => {
            resolve(true);
          },
          error => {
            console.error('Registration error:', error);
            resolve(false);
          }
        );
    });
  }
}
interface User {
  username: string;
  password: string;
  title:string;
}
