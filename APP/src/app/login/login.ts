import {Component} from '@angular/core';
import { HttpServices } from '../shared/services/httpService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

    constructor(httpServices: HttpServices, public toastr: ToastsManager) {
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
        if (this.username && this.password && this.username.trim() && this.password.trim()) {
            var data = {
                vcUsername: this.username,
                vcPassword: this.password
            };

            this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "login")
                .subscribe(
                (data) => {
                    console.log(data);
                    this.toastr.success('You are awesome!', 'Success!');
                },
                (error) => {
                    console.log(error);
                    var errMessage = "";
                    if (error.error) {
                        error.error.forEach((message) => {
                            errMessage += "'<span style='display: block;'>" + message.message + "</span>'"
                        })
                    }
                    this.toastr.error(errMessage, null, { enableHTML: true });
                }
                );
        }
    }

    registration() {
        //if (this.username && this.password && this.email && this.username.trim() && this.password.trim() && this.email.trim()) {
        var data = {
            vcUsername: this.username,
            vcPassword: this.password,
            vcEmail: this.email,
        };

        this.httpServices.PostHttpWithoutToken(JSON.stringify(data), "registration")
            .subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
                var errMessage = "<ul>";
                if (error.error) {
                    error.error.forEach((message) => {
                        console.log(message);
                        errMessage += "<li style='text-transform: uppercase; font-size:12px;'>" + message.message + "</li>"
                    })
                }
                errMessage += "</ul>";
                this.toastr.error(errMessage, null, { enableHTML: true });
            }
            );
        //}
    }
}
