import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class Config {

    private _devApiUrl: String = "http://192.168.2.56:8085/api/v1/";
    private _devSocketUrl: String = "http://192.168.2.56:8085/";

    constructor(private http: Http) {
    }

    getPrifixApi() {
        return this._devApiUrl;
    }

    SocketBaseUrl() {
        return this._devSocketUrl;
    }

};
