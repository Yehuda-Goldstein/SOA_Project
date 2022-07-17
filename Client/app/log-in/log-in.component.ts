import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/users';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user: UserModel;

  constructor(private service: UsersService, private router: Router) {
    this.user = new UserModel();
  }
  showingMenu(){

  }

  CreateUser(username: string, password: string) {
    this.user.name = username;
    this.user.password = password;
    this.service.CreateUser(this.user).subscribe((_) => {
      this.router.navigate(['/users']);
    });
  }
  ngOnInit(): void {
    this.service.addTransferChartDataListener();
  }
}
