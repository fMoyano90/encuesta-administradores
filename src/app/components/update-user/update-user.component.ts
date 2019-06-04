import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [UserService]
})
export class UpdateUserComponent implements OnInit {
  public msg;
  public role: any = "USUARIO";
  public token;
  public status: string;
  public usuario: User;
  public identity;
  public page_title: string;
  public role_values: any = ["ADMINISTRADOR","USUARIO"];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,

  ) {
    this.page_title =  'Editar usuario';
    this.identity =  this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.usuario = new User(1, '', '', '', '', '', '', '');
    this.getUsuario();
  }

  getUsuario(){
    // Sacar el id del administrador de la url
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      // Peticion ajax para sacar los datos del administrador

      this._userService.getUser(id).subscribe(
        response => {
          if(response.success == 'success'){
            this.usuario = response.administrador;
            console.log(this.usuario);
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
    this._userService.update(this.token, this.usuario, this.usuario.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.usuario = response.usuario;
          this.msg = 'El usuario fue actualizado correctamente';

          this._router.navigate(['/usuarios']);
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
      }
    )
  }

}
