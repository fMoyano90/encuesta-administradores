import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Ingresar';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    // Esto se ejecuta siempre que yo carge este componente y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();
  }

  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        if(response.status !== 'error'){
          this.status = 'success';
          this.token = response;

          // Usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              // Persistir la sesión del usuario identificado
              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              // Redirección a inicio
              this._router.navigate(['administradores']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

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

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirección a inicio
        this._router.navigate(['inicio']);
      }
    });
  }

}
