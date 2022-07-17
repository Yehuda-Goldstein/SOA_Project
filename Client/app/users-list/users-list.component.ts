import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../models/chat';
import { UserModel } from '../models/users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: UserModel[] = [];
  usersConnected: UserModel[] = [];
  usersDisConnected: UserModel[] = [];
  userSelected!: UserModel;
  user$ = this.service.user$;
  messages: Chat[] = [];
  constructor(
    private service: UsersService,
    private router: Router,
    private _ngZone: NgZone
  ) {
    this.subscribeAllUsers();
    this.subscribeUsersLogged();
    this.subscribeUsersDisconnected();
  }

  ngOnInit(): void {
    this.service.ShowUsers();
  }
  onItemClicked(user: UserModel) {
    this.userSelected = user;
    this.user$.subscribe((currentUser) => {
      this.service
        .getMessages()
        .subscribe(
          (msg) =>
            (this.messages = msg.filter(
              (m) =>
                m.sender == currentUser?.name ||
                (m.sender == this.userSelected.name &&
                  m.reciver == this.userSelected.name) ||
                m.reciver == currentUser?.name
            ))
        );
    });
  }
  private subscribeUsersLogged(): void {
    this.service.logInUser.subscribe((user: UserModel) => {
      this._ngZone.run(() => {
        user.isActive = true;
        let index = this.usersDisConnected.findIndex(
          (u) => u.name == user.name
        );
        if (index != -1) {
          this.usersDisConnected.splice(index, 1);
        }
        this.usersConnected.push(user);
      });
    });
  }
  private subscribeUsersDisconnected(): void {
    this.service.disconnect.subscribe((user: UserModel) => {
      this._ngZone.run(() => {
        user.isActive = false;
        this.usersDisConnected.push(user);
        let index = this.usersConnected.findIndex((u) => u.name == user.name);
        this.usersConnected.splice(index, 1);
      });
    });
  }
  private subscribeAllUsers(): void {
    this.service.getAllUsers.subscribe((users: UserModel[]) => {
      this._ngZone.run(() => {
        users = users.filter((x) => x.name !== this.service.getUser?.name);
        users.map((u) => {
          if (u.isActive) this.usersConnected.push(u);
          else this.usersDisConnected.push(u);
        });
      });
    });
  }
}
