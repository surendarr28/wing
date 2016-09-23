import {Component} from '@angular/core';
import { HttpServices } from '../shared/services/httpService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

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

    constructor(httpServices: HttpServices, public toastr: ToastsManager, private router: Router) {
        this.isRegistration = false;
        this.httpServices = httpServices;
    }

    toggleRegistration(status) {
        this.isRegistration = status;
        this.username = "";
        this.password = "";
        this.email = "";
    }

    login() {
        var data = {
            vcUsername: this.username,
            vcPassword: this.password
        };

        this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "login")
            .subscribe(
            (data) => {
                this.toastr.success('Success!');
                this.onSuccess(data);
            },
            (error) => {
                this.customeError(error);
            }
            );
    }

    registration() {
        var data = {
            vcUsername: this.username,
            vcPassword: this.password,
            vcEmail: this.email,
        };

        this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "registration")
            .subscribe(
            (data) => {
                this.toastr.success('Success!');
                this.onSuccess(data);
            },
            (error) => {
                this.customeError(error);
            }
            );
    }

    onSuccess(success) {
        localStorage.setItem('currentUser', success.result);
        this.router.navigate(['/join']);
    }

    customeError(error) {
        var errMessage = "<ul style='vertical-align: middle; margin: 0;'>";
        if (error.error) {
            error.error.forEach((message) => {
                console.log(message);
                errMessage += "<li style='text-transform: uppercase; font-size:10px;'>" + message.message + "</li>"
            })
        }
        errMessage += "</ul>";
        this.toastr.error(errMessage, null, { enableHTML: true });
    }
}
