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
  usuario;
  usuarioConsulta;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private detallecuentaservice : DetalleCuentasService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        console.log(this.identity);
        this.idUsuario = this.identity["identities"][0]["userId"];
        this.exp = this.cognito.getExpirationDate();
        this.usuario = this.idUsuario.split('@');
        this.user.setLogged(true)
        this.user.setNombreUsuario(this.usuario[0]);
        this.usuarioConsulta = this.usuario[0]
        console.log('usuario logeado:', this.usuario[0]);
      });
      
      console.log(this.user.getNombreUsuario());
      this.detallecuentaservice.getPermisos(this.usuario[0]).subscribe(
      data =>{
        // console.log('estos son los roles', data)
        this.user.setPermisos(data.data)
        this.router.navigate(['impuestos']);
    },(error)=>{
      this.router.navigate(['noautorizado'])
    })
    
  } 

  ngOnInit() {


   
  }

}
