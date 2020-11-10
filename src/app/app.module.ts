import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SingupFormComponent } from './singup-form/singup-form.component';
import { NavComponent } from './nav/nav.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { appRoutes } from 'src/routes';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatRoomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SingupFormComponent,
    NavComponent,
    UserListComponent,
    UserItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // this time around we have another module for router as to keep code clead
    RouterModule.forRoot(
      appRoutes
    ),
    // will be used throuought the app
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // set up out app  on out firebase page, in env we need to rpovide api-key, name etc.
    AngularFireModule.initializeApp(environment.firebase)
    
  ],
  providers: [AuthService, ChatService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
