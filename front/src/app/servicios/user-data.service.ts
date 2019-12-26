import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  nombre_usuario: string;
  loggeado: boolean = false;
  filtroForm;
  filtroEstado;

  constructor() { }
}
