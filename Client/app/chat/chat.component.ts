import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserModel } from '../models/users';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LogInComponent } from '../log-in/log-in.component';
import { UsersService } from '../users.service';
import { Chat } from '../models/chat';
import * as signalR from '@aspnet/signalr';
import { Message } from '../models/Message';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user$ = this.service.user$;
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  @Input() user: any;
  // @Input() historyMsg:any;

  constructor(
    private router: Router,
    private location: Location,
    private service: UsersService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {}
  changeText(event: any): void {
    console.log(event.target.value);
  }
  sendMessage(msg: string): void {
    
    if (this.user) {
      if (this.user.isActive == true) {
        if (msg) {
          this.user.isActive = true;
          this.message = new Message();
          this.message.clientuniqueid = this.uniqueID;
          this.message.type = 'sent';
          this.message.content = msg;
          this.message.date = new Date();
          this.messages.push(this.message);
          this.user$.subscribe((currentUser: any) => {
            currentUser.isActive = true;
            this.service
              .SendMessageForDB(currentUser?.name, this.user.name, msg)
              .subscribe((res) => {});
          });
          this.service.sendMessage(this.message, this.user);
          this.txtMessage = '';
        }
      } else {
        console.log('its a mistake');
      }
    }
  }
  private subscribeToEvents(): void {
    this.service.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          debugger;
          // if(this.user.name!==message.from){
          //   alert(`${message.from} sent you a new message`)
          // }
          // else{
            message.type = 'received';
            this.messages.push(message);
          // }
        }
      });
    });
  }
}
