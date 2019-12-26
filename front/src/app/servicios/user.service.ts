import {Injectable} from '@angular/core';
import {PitUtils} from '../servicios/pit-util.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: number;
  dv: string;
  loggeado: boolean;

  email: string;
  solicitarEmail = true;

  isFirst = true;
  
  constructor() {
  }

  /*redirectMiCuenta(): void {
    window.location.href = environment.cuentaUrl;
  }*/

  isLogged(): boolean {
    return this.rut !== undefined;
  }

  setRut(rut: string) {
    this.rut = +rut;
    this.dv = PitUtils.dv(this.rut);
    this.solicitarEmail = false;
  }



}
