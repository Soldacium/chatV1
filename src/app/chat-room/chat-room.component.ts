import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.setUserStatus('online')
    window.addEventListener('beforeunload', () => {
      alert('window closing')
      this.authService.setUserStatus('offline')
    });

    
  }

  ngOnDestroy() {
    alert('y000')
  }

}
