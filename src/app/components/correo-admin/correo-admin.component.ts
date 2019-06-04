import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Administrador } from '../../models/administrador';
import { AdministradorService } from '../../services/administrador.service';
import { Correo } from '../../models/correo';
import { CorreoService } from '../../services/correo.service';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';

@Component({
  selector: 'app-correo-admin',
  templateUrl: './correo-admin.component.html',
  styleUrls: ['./correo-admin.component.css'],
  providers: [
    AdministradorService,
    CorreoService
  ]
})
export class CorreoAdminComponent implements OnInit {
  public administrador: Administrador;
  public correo: Correo;

  public page_title: string;

  public status: string;
  public correos;
  public url;

  @Input('data') meals:string[] = [];

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Paginacion',
    screenReaderPageLabel: 'pagina',
    screenReaderCurrentLabel: `You're on page`
};

  p: number = 1;
  collection: any[];

  constructor(
    private _administradorService: AdministradorService,
    private _correoService: CorreoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title =  'Correos enviados';
    this.url = global.url;
  }

  ngOnInit() {
    this.getCorreosByAdministrador();
  }

  getCorreosByAdministrador(){
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        this._administradorService.getAdministrador(id).subscribe(
          response => {
            if(response.success == 'success'){
              this.administrador = response.administrador;

              this._administradorService.getCorreos(id).subscribe(
                response => {
                  if(response.status == 'success') {
                      this.correos = response.correos;
                  } else {
                    this._router.navigate(['/administradores']);
                  }
                },
                error =>{
                  console.log(error);
                }
              );
            } else {
              this._router.navigate(['/administradores']);
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      error =>{
        console.log(error);
      }
    );
  }

}
