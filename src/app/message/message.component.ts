import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // this allows us for two-way binding with feed component, in feed we do [chatMessage] and here we wait
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: any;
  isOwnMessage: boolean;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      console.log(user)
      if(user.email == this.userEmail){
        this.isOwnMessage = true;
        console.log(user.metadata)
      }else{
        this.isOwnMessage = false;
      }
    }) 
   }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    

  }

  

}
