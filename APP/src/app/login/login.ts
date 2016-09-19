import {Component} from '@angular/core';
import { HttpServices } from '../shared/services/httpService';

@Component({
    selector: 'login',
    styleUrls: ['./login.css'],
    templateUrl: './login.html'
})
export class LoginComponent {
    private isRegistration: boolean;
    private username: string;
    private password: string;
    private email: string;
    private httpServices: HttpServices;

    constructor(httpServices: HttpServices) {
        this.isRegistration = false;
        this.httpServices = httpServices;
    }

    toggleRegistration(status) {
        this.isRegistration = status;
    }

    login() {
        var data = {
            vcUsername: this.username,
            vcPassword: this.password
        }
        this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "login").subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    registration() {
        var data = {
            vcUsername: this.username,
            vcPassword: this.password,
            vcEmail: this.email,
        }
        this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "registration").subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
