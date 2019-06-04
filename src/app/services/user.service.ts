import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(
// tslint:disable-next-line: variable-name
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    test() {
        return 'Hola mundo desde un servicio';
    }

    register(user): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    signup(user, gettoken = null):Observable<any> {
        if(gettoken != null){
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity !== 'undefined'){
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token =  localStorage.getItem('token');

        if (token && token !== 'undefinded') {
            this.token = null;
        }

        return this.token;
    }

    getUsers():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        return this._http.get(this.url + 'user', {headers: headers});
    }
    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.get(this.url + 'user/' + id, {headers: headers});
    }
    update(token, usuario, id):Observable<any>{
        let json = JSON.stringify(usuario);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.put(this.url + 'user/' + id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.delete(this.url + 'user/' + id, {headers: headers});
    }

}
