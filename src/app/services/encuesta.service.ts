import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta';
import { global } from './global';

@Injectable()
export class EncuestaService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }
    test() {
        return 'Hola mundo desde el servicio de correo';
    }

    create(token, encuesta: Encuesta): Observable<any> {
        let json = JSON.stringify(encuesta);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',  localStorage.getItem('token') || '');

        return this._http.post(this.url + 'encuesta', params, {headers: headers});

    }

    getEncuestas():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        return this._http.get(this.url + 'encuesta', {headers: headers});
    }
}
