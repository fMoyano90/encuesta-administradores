import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public identity;
  public token;

  constructor(
    public _userService: UserService
  ) {
    this.loadUser();
   }
   ngOnInit(){
    console.log('WebApp cargada correctamente');
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
