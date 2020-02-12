import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
const rut = require('validar-rut')


export interface tablaMovimientos {
  rut;
  formulario;
  folio;
  liquidable;
  fechaVcto;
  saldoNeto;
  intereses;
  multas;
  totalPagar;
}


@Component({
  selector: 'app-procesar-transaccion',
  templateUrl: './procesar-transaccion.component.html',
  styleUrls: ['./procesar-transaccion.component.scss']
})


export class ProcesarTransaccionComponent implements OnInit, OnChanges {
  
  
  ELEMENT_DATA: tablaMovimientos[] = [];
  
  displayedColumns: string[] = ['rut', 'formulario', 'folio', 'liquidable', 'fechaVcto', 'saldoNeto', 'intereses','multas', 'totalPagar'];
  dataSource = new MatTableDataSource<tablaMovimientos>(this.ELEMENT_DATA);
  @Input() idsGiros:{};
  @Input() datosSwiftT:{};
  @Output() 
  volverTablaDatos = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.idsGiros != undefined && this.datosSwiftT != undefined){
      console.log('valores cambiaron!')
      this.llenarTablaMov(this.idsGiros);
      console.log(this.idsGiros, this.datosSwiftT)
    }
    }
    
  volverTabla(){
    this.volverTablaDatos.emit(true);
    console.log('volvere a tabla datos');
  }
  
  
    llenarTablaMov(obj:{}){
  // console.log('tengo que llenar datos con esto', obj)
    let largoob = Object.keys(obj).length
    for(var i = 0; i < largoob; i++){
      let objInter =  obj[Object.keys(obj)[i]];
      this.ELEMENT_DATA.push(objInter); 
    }
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log(this.dataSource);
  }
  

  

}
