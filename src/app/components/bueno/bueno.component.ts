import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';
import { Encuesta } from '../../models/encuesta';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-bueno',
  templateUrl: './bueno.component.html',
  styleUrls: ['./bueno.component.css'],
  providers: [
    AdministradorService,
    EncuestaService
  ]
})
export class BuenoComponent implements OnInit {

  public administrador: Administrador;
  public encuesta: Encuesta;
  public status;
  public token;

  constructor(
    private _administradorService: AdministradorService,
    private _encuestaService: EncuestaService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
     this.encuesta = new Encuesta(1, 1, '', '', '');
   }

  ngOnInit() {
    this.getAdministrador();
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

    this.encuesta.admin_id = this.administrador.id;
    this.encuesta.respuesta = 'Bueno';
    this.encuesta.objecion = 'Ninguna';

    // GUARDAR REGISTRO DE ENCUESTA

    this._encuestaService.create(this.token, this.encuesta).subscribe(
      response => {
        if (response.status == 'success'){
          this.encuesta = response.encuesta;
          this.status = 'success';

          this._router.navigate(['/gracias']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
}

