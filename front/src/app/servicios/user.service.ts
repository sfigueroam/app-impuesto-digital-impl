import {Injectable} from '@angular/core';
import {PitUtils} from '../servicios/pit-util.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: number;
  dv: string;
  logeado: boolean;

  email: string;
  solicitarEmail = true;
  nombreUsuario;
  roles;
  permisos;
  permisoConsulta;
  permisoAplicacion;

  isFirst = true;
  
  constructor() {
  }

  /*redirectMiCuenta(): void {
    window.location.href = environment.cuentaUrl;
  }*/

  isLogged(): boolean {
    return this.logeado
  }
  
  setLogged(logeado:boolean){
    this.logeado = true;
  }
  
  setPermisos(permisos:[]){
    permisos.forEach(element=>{
      if(element['rol'] == "IDROLCONSMONEX"){
        this.permisoConsulta = true;
      }
      else if(element['rol'] == "IDROLCONSAPLMONEX"){
        this.permisoAplicacion = true;
      }
    })
  }
  
  getPermisoConsulta(){
    return this.permisoConsulta;
  }

 getPermisoAplicacion(){
    return this.permisoAplicacion;
  }
  
  setRut(rut: string) {
    this.rut = +rut;
    this.dv = PitUtils.dv(this.rut);
    this.solicitarEmail = false;
  }


  setNombreUsuario(nombre:string){
    this.nombreUsuario = nombre;
  }

  setRoles(roles:any){
    this.roles = roles;
  }
  
  getNombreUsuario(){
    return this.nombreUsuario;
  }
  
  getRoles(){
  return this.roles;
  }

}
