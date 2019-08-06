import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Administrador } from '../../models/administrador';
import { AdministradorService } from '../../services/administrador.service';
import { Correo } from '../../models/correo';
import { CorreoService } from '../../services/correo.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers: [
    AdministradorService,
    CorreoService,
    UserService
  ]
})
export class AdminDetailComponent implements OnInit {

  public administrador: Administrador;
  public correo: Correo;
  public user: User;
  public page_title: string;
  public identity;
  public token;
  public status: string;
  public correos;
  public url;


  constructor(
    private _administradorService: AdministradorService,
    private _correoService: CorreoService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title =  'Enviar correo a administrador';
    this.identity =  this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.correo = new Correo(1, 1, '', '', '', '', '');
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

  onSubmit(correoForm) {

    // console.log(this.administrador);
    // console.log(this.correo);

    //  ASIGNAR VALORES DEL CORREO

    this.correo.admin_id = this.administrador.id;
    this.correo.name = this.administrador.name;
    this.correo.surname = this.administrador.surname;
    this.correo.email = this.administrador.email;
    this.correo.link = 'http://cacciuttolo.xyz/#/encuesta/' + this.administrador.id;
    this.correo.linkDos = 'http://cacciuttolo.xyz/#/encuesta/misrespuestas/' + this.administrador.id;

    // GUARDAR REGISTRO DE ENVIO EN BASE DE DATOS Y ENVIAR CORREO

    this._correoService.create(this.token, this.correo).subscribe(
      response => {
        if (response.status == 'success'){
          this.correo = response.correo;
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

    this.administrador.status = 1;

    this._administradorService.update(this.token, this.administrador, this.administrador.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.administrador = response.administrador;

        } else {
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
      }
    );

  }

  getCorreos(){
    this._correoService.getCorreos().subscribe(
      response => {
        if (response.status == 'success') {
          this.correos = response.correos;
          console.log(this.correos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
