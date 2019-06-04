import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';
import { global } from './global';

@Injectable()
export class AdministradorService {

    public url: string;
    public administradores;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
        this.administradores = this.getAdministradores();
    }

    create(token, administrador): Observable<any> {
        let json = JSON.stringify(administrador);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.post(this.url + 'administrador', params, {headers: headers});

    }

    getAdministradores():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        return  this._http.get(this.url + 'administrador', {headers: headers});
    }

    getAdministrador(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.get(this.url + 'administrador/' + id, {headers: headers});
    }

    getCorreos(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        return this._http.get(this.url + 'correos/administrador/' + id, {headers: headers});
    }
    getEncuestas(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        return this._http.get(this.url + 'encuestas/administrador/' + id, {headers: headers});
    }

    update(token, administrador, id):Observable<any>{
        let json = JSON.stringify(administrador);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');
        
        return this._http.put(this.url + 'administrador/' + id, params, {headers: headers});
    }
    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', localStorage.getItem('token') || '');

        return this._http.delete(this.url + 'administrador/' + id, {headers: headers});
    }

    buscarAdmin( termino:string ):Administrador[]{

        let adminArr:Administrador[] = [];
        termino = termino.toLowerCase();

        for( let administrador of this.administradores ){
          let name = administrador.name.toLowerCase();

          if( name.indexOf( termino ) >= 0 ){
            adminArr.push( administrador )
          }
        }

        return adminArr;

    }

}
