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

  constructor(private router: Router, private userservice: UserService, private cognito: CognitoService, private cookieService: CookieService) { }

  ngOnInit() {
    
    if(!this.userservice.isLogged()){
      this.estadoBotonLoggin = false;
    }
    
    if(this.userservice.isLogged()){
      this.estadoBotonLoggin = true;
    }
  }
  
  iniciarSesion(){
    
     this.router.navigate(['autentica']);
  }
  
  
  cerrarSesion(){
    this.cookieService.deleteAll('/');
    this.cognito.logout();
  }


}
