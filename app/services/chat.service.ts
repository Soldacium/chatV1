import { Injectable, AfterContentChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app'

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //creating observables needed for other operations, later subscribe to 'em
  user: firebase.User;
  chatMessages: AngularFireList <ChatMessage> ;
  chatMessage: ChatMessage;
  userName;



  constructor(
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      // auth state obesrvale, used to set user object
      this.afAuth.authState.subscribe(auth => {
        if(auth !== undefined && auth !== null) {
          this.user = auth;
          // gotten user is custom model just for this function to counter compilation error on a.displayName          
          this.getUser().valueChanges().subscribe((a:gottenUser)=> {
            console.log(a)
            this.userName = a.displayName;
            
          });
        }else{
          this.userName = 'Guest';
        }

        

      });
  }

getUser() {
  const userId = this.user.uid;
  const path = `/users/${userId}`;
  return this.db.object(path);
}

getUsers() {
  const path = '/users';
  return this.db.list(path);
}

  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = this.user.email
    // get database messages reference
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    });

    console.log('working!')
  }

  // new way of getting messages as opposed to shown in tutorial, this gives us 
  // reference to our database with adress of /messages, which we can later modify
  // provided be are authorized (or, if real time storage is on, without permisson)
  getMessages(): AngularFireList <ChatMessage>  {
    // create message feed binding
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1 ) + '/' 
    + now.getUTCDate();

    const time = now.getUTCHours() + '/' +
    now.getUTCMinutes() + '/' 
    + now.getUTCSeconds();

    return (date + ' ' + time);
  }
}

export class gottenUser {
  displayName: string;
  email: string;
  status: string;

}
