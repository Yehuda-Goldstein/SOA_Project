import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  

import { Message } from './models/Message';  
import { UserModel } from './models/users';
  
@Injectable({
  providedIn: 'root'
})
export class ChatService {  
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(`https://localhost:44379/chathub`)  
      .build();    
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: Message, user:UserModel) {  
    this._hubConnection.invoke('SendMessage', message, user);  
  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout( () => { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void { 

    this._hubConnection.on('MessageReceived', (data: any) => { 
      console.log("hello", data);
       
      this.messageReceived.emit(data);  
    });  
  }  
}    