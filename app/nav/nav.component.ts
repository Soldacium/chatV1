import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app' 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: Observable<firebase.User>
  userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    })
  }

  login(){
    this.authService.logged()
  }

  logout(){
    this.authService.logout()
  }

}
