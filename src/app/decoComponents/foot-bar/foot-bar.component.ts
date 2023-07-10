import { Component, OnInit } from '@angular/core';

import { UserStatusService } from 'app/services/user-status.service';

@Component({
  selector: 'app-foot-bar',
  templateUrl: './foot-bar.component.html',
  styleUrls: ['./foot-bar.component.css']
})
export class FootBarComponent implements OnInit {
  connectedUser: User | null;

  constructor(private userStatusService: UserStatusService) {
    this.connectedUser = null;
  }

  ngOnInit(): void {
    const connectedUserString = localStorage.getItem('connectedUser');
    this.connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
    this.userStatusService.currentUserChanged.subscribe((user: User | null) => {
      this.connectedUser = user;
    });
  }
}
interface User {
  username: string;
  password: string;
  title:string;
}