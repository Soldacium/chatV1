import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.css']
})
export class SingupFormComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  signUp(){
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email,password,displayName)
    .then(resolve => this.router.navigate(['chat']))
    .catch(error => this.errorMsg = error.message)
  }

}
