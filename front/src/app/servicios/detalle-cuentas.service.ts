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
      const urlTramite = environment.apiNube + 'impdigital/presentaCuentasME';
      return this.http.post(urlTramite, JSON.stringify(dataJson));
    }
}
