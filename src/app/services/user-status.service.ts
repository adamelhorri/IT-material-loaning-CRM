import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  currentUser: User | null = null;
  currentUserChanged: EventEmitter<User | null> = new EventEmitter<User | null>();

  constructor() { }

  setUserLoggedIn(user: User | null): void {
    this.currentUser = user;
    this.currentUserChanged.emit(this.currentUser);
  }

  getUserLoggedIn(): User | null {
    return this.currentUser;
  }
}

interface User {
    username: string;
    password: string;
    title:string;
  }