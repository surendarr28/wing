import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            console.log(this.jwtHelper.decodeToken(localStorage.getItem('currentUser')))
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}