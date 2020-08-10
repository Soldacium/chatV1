import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'

import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;


  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = afAuth.authState;
  }

  // getting the current user ID
  get currentUserID(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  // logging in

  async login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then((user) => {
      this.authState = user;
      console.log(this.authState)
      const status = 'online';
      this.setUserStatus(status);
      this.router.navigate(['chat']);
    }).then(() => {
      console.log('done with second task')
    })
  }

  async logged(){
    if(this.afAuth.user){
      this.authState = this.afAuth.user,
      console.log(this.authState)
      const status = 'online';
      this.setUserStatus(status);
      this.router.navigate(['chat']);      
    }

    
  }
  async logout() {
    this.afAuth.auth.signOut().then(() => {
      const status = 'offline';
      this.setUserStatus(status);      
    }); 

     

    //this.router.navigate(['login']);
    
    
  }

  authUser() {
    return this.user;
  }

  // for not letting unlogged users
  get authenticated(): boolean {

    //this.authState = this.user;
    return (this.authState !== null && this.authState !== undefined);// && this.authState !== undefined
  }

    // easy sign up with firebase, then setting current user to the one signes
  signUp(email: string, password: string, displayName: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((user) => {
      this.authState = user;
      console.log(this.authState)
      const status = 'online';
      this.setUserData(email, displayName, status)
    }).catch(error => console.log(error))
  }

  setUserData(email: string, displayName: string,status: string):void {
    const path = `users/${this.currentUserID}`;
    console.log(this.currentUserID)

    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    // make user object in database
    this.db.object(path).update(data)
    .catch(error => console.log(error))
  }

  setUserStatus(status: string):void {
    const path = `users/${this.currentUserID}`;
    const data = {
      status: status
    };

    this.db.object(path).update(data)
    .catch(error => console.log(error))
  }
}
