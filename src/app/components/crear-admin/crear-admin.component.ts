import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';


@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.css'],
  providers: [UserService, AdministradorService]
})
export class CrearAdminComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public administrador: Administrador;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _administradorService: AdministradorService
  ) {
      this.page_title =  'Crear nuevo administrador';
      this.identity =  this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.administrador = new Administrador(1, '', '', '', '', '');
   }

  ngOnInit() {
  }

  onSubmit(form) {
    this._administradorService.create(this.token, this.administrador).subscribe(
      response => {
        if (response.status == 'success'){
          this.administrador = response.administrador;
          this.status = 'success';

          this._router.navigate(['/administradores']);
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
