import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(
// tslint:disable-next-line: variable-name
    private _userService: UserService
  ) {
    this.pageTitle = 'Registrar usuario';
    this.user = new User(1, '', '', 'USUARIO', '', '', '', '');
  }

  ngOnInit() {
    console.log(this._userService.test());
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
