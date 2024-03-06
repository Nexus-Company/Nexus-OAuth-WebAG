import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'loader', component: LoadingComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }