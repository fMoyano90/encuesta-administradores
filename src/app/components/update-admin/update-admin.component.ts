import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Administrador } from '../../models/administrador';
import { AdministradorService } from '../../services/administrador.service';
import { global } from '../../services/global';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css'],
  providers: [UserService, AdministradorService]
})
export class UpdateAdminComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public administrador: Administrador;
  public status: string;
  public msg;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _administradorService: AdministradorService
  ) {
    this.page_title =  'Crear nuevo administrador';
    this.identity =  this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.administrador = new Administrador(1, '', '', '', '', '', 1);
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

  onSubmit(form) {
    this._administradorService.update(this.token, this.administrador, this.administrador.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.administrador = response.administrador;
          this.msg = 'El administrado fue actualizado correctamente';

          this._router.navigate(['/administradores']);
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
