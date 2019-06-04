import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  providers: [
    AdministradorService
  ]
})
export class EncuestaComponent implements OnInit {

  public administrador: Administrador;

  constructor(
    private _administradorService: AdministradorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

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
}
