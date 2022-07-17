import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from './models/users';
import { Chat } from './models/chat';
import * as signalR from '@aspnet/signalr';
import { Message } from './models/Message';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  hubConnection: signalR.HubConnection;
  private _user$ = new BehaviorSubject<UserModel | null>(null);
  user$ = this._user$.asObservable();
  private baseUrl = 'https://localhost:44379/controller';
  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44379/chathub`)
      .build();
    this.registerOnServerEvents();
    this.hubConnection
      .start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('Error in the connection:' + err));
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      console.log(data);
    });
  };

  CreateUser(user: UserModel): Observable<UserModel> {
    this._user$.next(user);
    return this.http.post(`${this.baseUrl}/user`, user).pipe(
      map((res) => <UserModel>res),
      tap((res) => {
        console.log('in tap', res);
        this.hubConnection.invoke('Login', res).then(() => {});
      })
    );
  }
  get getUser() {
    return this._user$.value;
  }
  getMessages(): Observable<Chat[]> {
    return this.http
      .get(`${this.baseUrl}/getMsg`)
      .pipe(map((res) => <Chat[]>res));
  }
  getUsers(): Observable<UserModel[]> {
    return this.http
      .get(`${this.baseUrl}/users`)
      .pipe(map((res) => <UserModel[]>res));
  }
  SendMessageForDB(
    sender: string,
    reciver: string,
    msg: string
  ): Observable<Chat[]> {
    var message = new Chat(sender, reciver, msg);
    return this.http
      .post(`${this.baseUrl}/sendMsg`, message)
      .pipe(map((res) => <Chat[]>res));
  }
  messageReceived = new EventEmitter<Message>();
  logInUser = new EventEmitter<UserModel>();
  disconnect = new EventEmitter<UserModel>();
  getAllUsers = new EventEmitter<UserModel[]>();
  sendMessage(message: Message, user: UserModel) {
    this.hubConnection.invoke('SendMessage', message, user);
  }
ShowUsers():void{
  this.hubConnection.invoke("ShowUsers");
}
  private registerOnServerEvents(): void {
    this.hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
    this.hubConnection.on('logInUser', (data: any) => {
      this.logInUser.emit(data);
    });
    this.hubConnection.on('disconnect', (data: any) => {
      this.disconnect.emit(data);
    });
    this.hubConnection.on('getAllUsers', (data: any) => {
      this.getAllUsers.emit(data);
    });
  }
}
