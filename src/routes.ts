import { Routes } from '@angular/router';
import {SingupFormComponent} from './app/singup-form/singup-form.component';
import {LoginFormComponent} from './app/login-form/login-form.component';
import {ChatRoomComponent} from './app/chat-room/chat-room.component';
import { LoginGuard } from './app/guards/login.guard';

export const appRoutes: Routes = [
    {path: 'signup', component: SingupFormComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'chat', component: ChatRoomComponent, canActivate: [LoginGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];