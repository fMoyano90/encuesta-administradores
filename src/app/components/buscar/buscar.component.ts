import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',

})
export class BuscarComponent implements OnInit {

  administradores: any []=[];

  constructor( private activatedRoute:ActivatedRoute,
               private _administradorService: AdministradorService ) {

  }

  ngOnInit() {
      this.activatedRoute.params.subscribe( params =>{
      //this.termino = params['termino'];
      this.administradores = this._administradorService.buscarAdmin(params['termino']);
      console.log( params['termino'] );
    });
  }
}