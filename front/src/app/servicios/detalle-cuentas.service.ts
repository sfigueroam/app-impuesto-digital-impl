import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DetalleCuentasService {

  constructor(private http : HttpClient) { }
  

   presentaCuentasME(dataJson): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/presentaCuentasME';
      return this.http.post(urlTramite, JSON.stringify(dataJson));
    }
    
    
    presentaCuentasMEFolio(dataJson): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/presentaCuentasMEForm';
      return this.http.post(urlTramite, JSON.stringify(dataJson));
    }
     
    
    
     getMovimientos(idMov): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/presentaMovsME/' + idMov;
      return this.http.get(urlTramite);
    }
    
     getItem(id): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/presentaMovsME/getItem/' + id;
      return this.http.get(urlTramite);
    }
    
    getPermisos(idUsuario): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/consultaPerfil/' + idUsuario;
      return this.http.get(urlTramite);
    }
    
    estadoLiquidables(dataJson): Observable <any> {
      const urlTramite = environment.apiNube + '/impdigital/presentaCuentasME/estadoMov';
      return this.http.post(urlTramite, JSON.stringify(dataJson));
    }
    
    aplicarLiquidacion(dataJson): Observable <any>{
        const urlTramite = environment.apiNube + '/impdigital/presentaCuentasME/aplicarGiro';
        return this.http.post(urlTramite, JSON.stringify(dataJson));
    }
}
