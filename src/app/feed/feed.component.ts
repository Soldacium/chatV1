import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model'
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: any ;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // somehow this works, not sure if this is 100% best way
    this.feed = this.chat.getMessages().valueChanges();
    this.chat.getUser().valueChanges().subscribe(u => {
      console.log(u)
    })
  }

  ngOnChanges(){
    this.feed = this.chat.getMessages().valueChanges();
  }

}
