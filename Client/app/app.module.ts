import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'users', component: UsersListComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LogInComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
