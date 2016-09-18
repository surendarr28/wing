import {Component} from '@angular/core';

@Component({
    selector: 'login',
    styleUrls: ['./login.css'],
    templateUrl: './login.html'
})
export class LoginComponent {
    private isRegistration: boolean;

    constructor() {
        this.isRegistration = false;
    }

    toggleRegistration(status) {
        this.isRegistration = status;
    }
}
