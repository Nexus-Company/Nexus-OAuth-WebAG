import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MeComponent } from './components/account/me/me.component';
import { RegisterComponent } from './components/account/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'account', component: MeComponent, canActivate: [AuthGuard] }
];

export class AppRoutingModule { }