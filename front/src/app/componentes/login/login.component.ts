import {  Component, OnInit, Input, Output, EventEmitter, OnChanges , NgModule} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CognitoService} from '../../servicios/cognito.service';
import {UserService} from '../../servicios/user.service';
import {UserDataService} from '../../servicios/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  identity: any;
  name: any;
  exp: Date;
  texto: any;
  rut:any;
  rutFinal:any;
  dv:any;
  datosUsuario:any;
  rutDummy = '1235';
  dvDummy = '6';
  loggeado: any;
  identityProvider;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private userdataservice: UserDataService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        console.log(this.identity);
        // this.user.rut = JSON.parse(this.identity["custom:clave-unica:run"]).numero;
        // this.user.dv = JSON.parse(this.identity["custom:clave-unica:run"]).DV;
        this.user.loggeado = true;
      }
    );
   
    
    
  } 

  ngOnInit() {
    
    this.exp = this.cognito.getExpirationDate();
    this.userdataservice.loggeado = true;
    this.router.navigate(['']);
  }

}
