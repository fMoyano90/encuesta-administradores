import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Administrador } from '../../models/administrador';
import { AdministradorService } from '../../services/administrador.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-resultados-admin',
  templateUrl: './resultados-admin.component.html',
  styleUrls: ['./resultados-admin.component.css'],
  providers: [
    AdministradorService,
    UserService
  ]
})
export class ResultadosAdminComponent implements OnInit {
  public administrador: Administrador;
  public user: User;
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public correos;
  public url;


  constructor(
    private _administradorService: AdministradorService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title =  'Enviar correo a administrador';
    this.identity =  this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getAdministrador();
    //this.getCorreosByAdministrador();
    }

  getAdministrador(){
    // Sacar el id del administrador de la url
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      // Peticion ajax para sacar los datos del administrador

      this._administradorService.getAdministrador(id).subscribe(
        response => {
          if(response.success == 'success'){
            this.administrador = response.administrador;
            console.log(this.administrador);
          } else {
            this._router.navigate(['/administradores']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/administradores']);
        }
        );
    });

  }
}
