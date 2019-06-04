import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Correo } from '../models/correo';
import { global } from './global';

@Injectable()
export class CorreoService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }
    test() {
        return 'Hola mundo desde el servicio de correo';
    }

    create(token, correo: Correo): Observable<any> {
        let json = JSON.stringify(correo);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',  localStorage.getItem('token') || '');

        return this._http.post(this.url + 'invitar', params, {headers: headers});

    }

    getCorreos():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',  localStorage.getItem('token') || '');

        return this._http.get(this.url + 'correos', {headers: headers});
    }
}