import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {UsuarioService} from '../../servicios/usuario.service';

export interface tablaItems {

}

@Component({
  selector: 'app-ver-item',
  templateUrl: './ver-item.component.html',
  styleUrls: ['./ver-item.component.scss']
})
export class VerItemComponent implements OnInit {

  
  
  displayedColumns: string[] = ['codigo', 'descripcion', 'valor'];
  

  constructor(private cdRef:ChangeDetectorRef, private usuario: UsuarioService) { }
 @Input() movConsultado:{}
 @Output()
 volverSeleccioMov = new EventEmitter<boolean>()
  ELEMENT_DATA: object[] = [];
  dataSource = new MatTableDataSource<tablaItems>(this.ELEMENT_DATA);
 arregloObj: object[] = [];
  nombreContribuyente;
  rutContribuyente;
  dvContribuyente;
  datosMov;
  
  ngOnInit() {
    this.nombreContribuyente = this.usuario.nombreUsuario;
    this.rutContribuyente = this.usuario.rutUsuario;
    this.dvContribuyente = this.usuario.dvUsuario
    this.datosMov = this.usuario.datosItem;

  }
  
  
  ngAfterViewChecked(){
    
    if(this.movConsultado != 'undefined' && (this.ELEMENT_DATA.length == 0 || this.ELEMENT_DATA.length == undefined)){
    this.llenarTablaMov(this.movConsultado);
  }
  
  //Aca tengo que poner una condicion de si viene vacia y el tema del lenght tabla para desplegar los datos que me llegaron del back
  this.cdRef.detectChanges();

}
  
  volver(){
    this.volverSeleccioMov.emit(true);
    
  }
  
  
  llenarTablaMov(obj:{}){
 
    let largoob = Object.keys(obj).length
    for(var i = 0; i < largoob; i++){
      let objInter =  obj[Object.keys(obj)[i]];
      this.ELEMENT_DATA.push(objInter); 
    }
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    
    
  }
  

}
