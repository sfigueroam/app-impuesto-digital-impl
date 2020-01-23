import {  Component, OnInit, Input, Output, EventEmitter, OnChanges , NgModule} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CognitoService} from '../../servicios/cognito.service';
import {UserService} from '../../servicios/user.service';
import {UserDataService} from '../../servicios/user-data.service';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';


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
  idUsuario;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private detallecuentaservice : DetalleCuentasService,
              private userdataservice: UserDataService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        console.log(this.identity);
        this.idUsuario = this.identity["identities"][0]["userId"];
        console.log('usuario logeado:', this.idUsuario);
      }
    );
   
    
    
  } 

  ngOnInit() {
    
    this.exp = this.cognito.getExpirationDate();
    this.userdataservice.loggeado = true;
    this.detallecuentaservice.getPermisos('jmoraT').subscribe(
      data =>{
        console.log('estos son los roles', data)
      
    })
    this.router.navigate(['']);
  }

}
