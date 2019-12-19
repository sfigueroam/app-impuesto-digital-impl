import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface tablaMovimientos {
  Id_cta: number;
  Id_Mov: number;
  Tipo_Mov: string;
  Estado_Mov: string;
  Fecha_Mov:string;
  Form_Tipo:number;
  Folio:number;
  Moneda_Origen:number;
  Monto_Mov: number;
  Moneda_Pago:string;
  Monto_Pagado:number;
  Periodo_Contable: number;
  Comuna: string;
  Mov_Origen: number;
  
}


@Component({
  selector: 'app-tabla-movimiento',
  templateUrl: './tabla-movimiento.component.html',
  styleUrls: ['./tabla-movimiento.component.scss']
})
export class TablaMovimientoComponent implements OnInit {
  
  
  ELEMENT_DATA: tablaMovimientos[] = [];

  displayedColumns: string[] = ['idmov', 'movorigen', 'tipo', 'estado', 'form', 'comuna', 'version', 'folio', 'fechavenc',
  'fechamov', 'monedaorigen', 'montomov', 'montopagado', 'action'];
  dataSource = new MatTableDataSource<tablaMovimientos>(this.ELEMENT_DATA);

  constructor(private cdRef:ChangeDetectorRef) { }
  
  @Input() filaTabla:{}
  @Output() 
  volverTablaDatos = new EventEmitter<boolean>();
  @Output()
  movimientoSeleccionado = new EventEmitter<{}>();
  itemConsultado:{};

  ngOnInit() {
    //aca va la llamada al servicio que trae los datos saco el largo
  }
  
  
    ngAfterViewChecked()
{
   if(this.filaTabla != 'undefined' && (this.ELEMENT_DATA.length == 0 || this.ELEMENT_DATA.length == undefined)){
   
    this.llenarTablaMov(this.filaTabla);
    console.log('llegaron los datos a la tabla 1');
  }
  //Aca tengo que poner una condicion de si viene vacia y el tema del lenght tabla para desplegar los datos que me llegaron del back
  console.log('recibi los datos en tabla movimiento para hacer la tabla', this.filaTabla);
  this.cdRef.detectChanges();
}
  
  verItem(element){
    this.itemConsultado = element;
    this.movimientoSeleccionado.emit(element);
  }
  
  volver(){
    this.volverTablaDatos.emit(true);
  }
  
  
  llenarTablaMov(obj:{}){
    // console.log('esta es la fila tabla que recibi', obj)
    //   console.log('tengo que llenar datos con esto', obj)
    let largoob = Object.keys(obj).length
    for(var i = 0; i < largoob; i++){
      console.log(obj[Object.keys(obj)[i]]);
      let objInter =  obj[Object.keys(obj)[i]];
      objInter['position'] = i+1;
      this.ELEMENT_DATA.push(objInter); 
    }
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log('datos en element data', this.ELEMENT_DATA)
    
    
    
    
  }
  

}
