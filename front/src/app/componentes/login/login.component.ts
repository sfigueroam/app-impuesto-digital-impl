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
    permisos: any;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private detallecuentaservice : DetalleCuentasService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        this.idUsuario = this.identity["identities"][0]["userId"];
        this.exp = this.cognito.getExpirationDate();
        this.usuario = this.idUsuario.split('@');
        this.user.setLogged(true)
        this.user.setNombreUsuario(this.usuario[0]);
        this.usuarioConsulta =  this.user.getNombreUsuario();
        this.getPermisos(this.usuarioConsulta);
        
      });
    
      
    } 

  ngOnInit() {
   
  }
  
  async getPermisos(usuario:string){
    try{
  this.permisos = await this.detallecuentaservice.getPermisos(usuario).toPromise();
   this.user.setPermisos(this.permisos.data);
   this.router.navigate(['impuestos']);
    } catch(error){
      this.router.navigate(['noautorizado'])
      //this.router.navigate(['impuestos']);
    }
    
  }

}
