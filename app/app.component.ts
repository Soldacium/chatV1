import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chatApp1';

  constructor(private authService: AuthService) {}
  ngOnInit(){
    // check if logged, and if logged, set up credentials
    //this.authService.logged()
  }
}
