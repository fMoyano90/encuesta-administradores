import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { EncuestaService } from '../../services/encuesta.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-respuestas-intermedias',
  templateUrl: './respuestas-intermedias.component.html',
  styleUrls: ['./respuestas-intermedias.component.css'],
  providers: [EncuestaService, UserService]
})
export class RespuestasIntermediasComponent implements OnInit {
  public title = 'Resultados de encuestas';
  public url;
  public encuestas: Encuesta;
  public identity;
  public token;
  public status;
  public msg;
  public correos;
  public respuestas;
  public nroRespuestas;
  public respuestasBuenas;
  public respuestasIntermedias;
  public respuestasMalas;
  public porcentajeBuenas;


  @Input('data') meals: string[] = [];

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Paginacion',
    screenReaderPageLabel: 'pagina',
    screenReaderCurrentLabel: `You're on page`
};

  p = 1;
  collection: any[];

  constructor(
    private _encuestaService: EncuestaService,
    private _userService: UserService
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.getEncuestas();
  }

  getEncuestas() {
    this._encuestaService.getEncuestas().subscribe(
      response => {
        if (response.status == 'success') {
          this.encuestas = response.encuestas.reverse();
          this.correos = response.correos;
          this.respuestasBuenas = response.respuestasBuenas;
          this.respuestasIntermedias = response.respuestasIntermedias;
          this.respuestasMalas = response.respuestasMalas;
          console.log(this.encuestas);
        }
      },
      error => {
        console.log(error);
      }
    );

    this.porcentajeBuenas = (this.respuestas.length * 100) / this.respuestasBuenas.length;
  }
}

