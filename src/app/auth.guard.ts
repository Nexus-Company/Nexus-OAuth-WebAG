import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BASE_URL } from '../../variables';
import { AuthenticationService } from './services/authenticationservice';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isAuthorized()) {
            this.router.navigate(['/authentication'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        return true;
    }
}