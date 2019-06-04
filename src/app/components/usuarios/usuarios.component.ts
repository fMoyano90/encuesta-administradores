import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UsuariosComponent implements OnInit {
  public title = 'Listado de administradores';
  public url;
  public usuarios: Array<User>;
  public identity;
  public token;
  public status;
  public msg;


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
    private _userService: UserService
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this._userService.getUsers().subscribe(
      response => {
        if (response.status == 'success') {
          this.usuarios = response.usuarios;
          console.log(this.usuarios);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser(id){
    this._userService.delete(this.token, id).subscribe(
      response => {
        this.getUsuarios();
        this.status = 'success';
        this.msg = 'El usuario fue eliminado exitosamente';
      },
      error => {
        console.log(error);
      }
    );
  }

}
