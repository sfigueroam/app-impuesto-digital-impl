import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../servicios/user.service';
import {CookieService} from 'ngx-cookie-service';
import {CognitoService} from '../../servicios/cognito.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  estadoBotonLoggin;
  nombre;
  indVer: boolean;

  constructor(private router: Router, private user: UserService, private cognito: CognitoService, private cookieService: CookieService) { }

  ngOnInit() {
    console.log(this.user.isLogged());
    if(this.user.isLogged()){
      this.estadoBotonLoggin = true;
    }
    else{
      this.estadoBotonLoggin = false;
    }
    
    
    this.nombre = this.user.getNombreUsuario();
    
  }
  

  cerrarSesion(){
    this.user.setLogged(false);
    this.cookieService.deleteAll('/');
    this.cognito.logout();
  }
  
  verMenu(){
  this.indVer = !this.indVer;  
}


}
