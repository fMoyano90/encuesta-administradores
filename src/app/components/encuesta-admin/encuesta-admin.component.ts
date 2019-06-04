import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Encuesta } from '../../models/encuesta';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../services/global';
import { EncuestaService } from 'src/app/services/encuesta.service';



@Component({
  selector: 'app-encuesta-admin',
  templateUrl: './encuesta-admin.component.html',
  styleUrls: ['./encuesta-admin.component.css'],
  providers: [
    AdministradorService,
    EncuestaService
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EncuestaAdminComponent implements OnInit {
  public administrador: Administrador;
  public encuesta: Encuesta;

  public page_title: string;

  public status: string;
  public encuestas;
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
    private _encuestaService: EncuestaService,
    private _route: ActivatedRoute,
    private _router: Router
    )
    {
    this.page_title =  'Correos enviados';
    this.url = global.url;
    }

  ngOnInit() {
    this.getEncuestasByAdministrador();
  }

  getEncuestasByAdministrador(){
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        this._administradorService.getAdministrador(id).subscribe(
          response => {
            if(response.success == 'success'){
              this.administrador = response.administrador;

              this._administradorService.getEncuestas(id).subscribe(
                response => {
                  if(response.status == 'success') {
                      this.encuestas = response.encuestas;
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


