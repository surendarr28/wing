import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Router} from "@angular/router";
import {Config} from '../../config/config';
import 'rxjs/Rx';

@Injectable()
export class HttpServices {
    private headers: Headers;

    constructor(private http: Http, private router: Router, private _config: Config) {
        this.headers = new Headers();
    }

    PostLocalHttp(data: string, url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("id_token"));
        var self = this;
        return self.http.post(self._config.getPrifixApi() + url, data, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);
    }

    PostHttp(data: string, url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("id_token"));
        var self = this;
        return self.http.post(self._config.getPrifixApi() + url, data, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);
    }

    GetHttp(url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("id_token"));
        var self = this;
        return self.http.get(self._config.getPrifixApi() + url, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);
    }

    PostHttpWithoutToken(data: string, url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.delete('Authorization');
        var self = this;
        return self.http.post(self._config.getPrifixApi() + url, data, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);

    }

    GetHttpWithoutToken(url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.delete('Authorization');
        var self = this;
        return self.http.get(self._config.getPrifixApi() + url, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);
    }

    PutHttp(data: string, url: string) {
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', 'Bearer ' + localStorage.getItem("id_token"));
        var self = this;
        return self.http.put(self._config.getPrifixApi() + url, data, {
            headers: self.headers
        })
            .map(self.SuccessHandler)
            .catch(self.ErrorHandler);

    }

    private ErrorHandler(error: Response) {
        return Observable.throw(error.json() || null);
    }

    private SuccessHandler(result: Response) {
        return result.json() || null;
    }
}