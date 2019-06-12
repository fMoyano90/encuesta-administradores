import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { AdministradorService } from '../../services/administrador.service';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css'],
  providers: [AdministradorService, UserService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdministradoresComponent implements OnInit {
  public title = 'Listado de administradores';
  public url;
  public administradores: Array<Administrador>;
  public identity;
  public token;
  public status;
  public msg;
  public selectedAdmin: Administrador;


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
  router: any;

  constructor(
    private _administradorService: AdministradorService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.getAdministradores();
  }

  getAdministradores(){
    this._administradorService.getAdministradores().subscribe(
      response => {
        if (response.status == 'success') {
          this.administradores = response.administradores;
          console.log(this.administradores);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteAdmin(id){
    this._administradorService.delete(this.token, id).subscribe(
      response => {
        this.getAdministradores();
        this.status = 'success';
        this.msg = 'El administrador fue eliminado exitosamente';
      },
      error => {
        console.log(error);
      }
    );
  }

  buscarAdmin( termino:string ){
    // console.log(termino);
    this._router.navigate(['/buscar', termino]);
  }

  onUpdate(administrador: Administrador): void {
    this.selectedAdmin = administrador;
    administrador.status = 0;

    this._administradorService.update(this.token, this.selectedAdmin, this.selectedAdmin.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.selectedAdmin = response.administrador;
          this.msg = 'El administrado fue actualizado correctamente';

          this._router.navigate(['/administrador', administrador.id]);
        } else {
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
      }
    )
  }
}
