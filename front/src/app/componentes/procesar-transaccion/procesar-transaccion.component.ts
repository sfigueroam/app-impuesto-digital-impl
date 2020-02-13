import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';


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
  @Input() idsGiros;
  @Input() datosSwiftT;
  @Output() 
  volverTablaDatos = new EventEmitter<boolean>();
  listaSinTotal=[];
  totalLiquidable;
  listaIds = '';

  constructor(private detalleCuentas: DetalleCuentasService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.idsGiros != undefined && this.datosSwiftT != undefined){
      this.datosSwiftT = JSON.stringify(this.datosSwiftT)
      this.datosSwiftT =JSON.parse(this.datosSwiftT)
      console.log('datosSwift', this.datosSwiftT)
      this.idsGiros.forEach(element =>{
        console.log(element.totalLiquidable);
        if(element.totalLiquidable == undefined){
          this.listaSinTotal.push(element);
        }
      else{
        this.totalLiquidable = element.totalLiquidable;
      }
      })
      console.log('lista sin total y total',this.listaSinTotal, this.totalLiquidable)
      this.llenarTablaMov(this.listaSinTotal);
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
  
  aplicarGiros(){
    //armar objeto y consultar
    this.listaSinTotal.forEach(element =>{
      this.listaIds += element['formFolio'] + ';'
    })
    this.listaIds = this.listaIds.substring(0, this.listaIds.length - 1);
    let objConsulta = {
      "inMontoSwift": this.datosSwiftT['montoSwift'],
      "inFechaOrdenPago": this.datosSwiftT['fechaOrdenPago'] ? this.datosSwiftT['fechaOrdenPago'] : '' ,
      "inFechaDeposito": this.datosSwiftT['fechaDeposito'] ? this.datosSwiftT['fechaDeposito'] : '',
      "inOrdenante": this.datosSwiftT['ordenante'] ?  this.datosSwiftT['ordenante'] : '',
      "inRemesa": this.datosSwiftT['descripcionRemesa'] ? this.datosSwiftT['descripcionRemesa'] : '',
      "inBanco": this.datosSwiftT['bancoCorresponsal'] ? this.datosSwiftT['bancoCorresponsal'] : '',
      "inNroOrdenPago": this.datosSwiftT['nOrdenPago'] ? this.datosSwiftT['nOrdenPago']: '' ,
      "inListaArs": this.listaIds,
      "inMontoAplicar": this.totalLiquidable
    }
    
    console.log('objeto consulta',objConsulta)
         this.detalleCuentas.aplicarLiquidacion(objConsulta).subscribe(
        data =>{
          console.log(data)
      },(error)=>{
        if(error.status == 404){
          console.log('entre al error')
        }
        
      }
  )}
    
    
  }
  

  


