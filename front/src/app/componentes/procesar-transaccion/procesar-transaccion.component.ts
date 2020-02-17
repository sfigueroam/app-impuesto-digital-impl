import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

export interface DialogData {
  rut
  montoPagado;
  MontoSwift;
  fechaOrdenPago;
  fechaPago;
  fechaDeposito;
  ordenandte;
  descripcionRemesa;
  bancoCorresponsal;
  NordenPago;
  outLote;
  outFolio;
  obj:{};
  ocultaSpinner;
}


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
  @Output()
  volverFormulario = new EventEmitter<boolean>();
  listaSinTotal=[];
  totalLiquidable;
  listaIds = '';
  objetoConsulta;
  resultadoAplicacion: any;
  diferencia;
  tipoCaso;
  errorAplicar;
  habilitarBoton;

  constructor(private detalleCuentas: DetalleCuentasService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  
    openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
      width: '250px',
      data: {objetoConsulta: this.objetoConsulta, resultadoAplicacion: this.resultadoAplicacion, tipoCaso: this.tipoCaso, errorCase: this.errorAplicar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.volverForm();
    
    });
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
   
   console.log(this.datosSwiftT)
    if(this.datosSwiftT['montoSwift'] <= this.totalLiquidable){
      this.diferencia = this.totalLiquidable - this.datosSwiftT['montoSwift']
      this.tipoCaso = 'A'
    }
    else{
      this.diferencia = this.datosSwiftT['montoSwift'] - this.totalLiquidable
      this.tipoCaso = 'B'
    }
    
    if(this.totalLiquidable == 0){
      this.habilitarBoton = false;
    }
    
    }
    
  volverTabla(){
    this.volverTablaDatos.emit(true);
    console.log('volvere a tabla datos');
  }
  
  volverForm(){
    this.volverFormulario.emit(true);
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
    this.habilitarBoton= false;
    this.listaSinTotal.forEach(element =>{
      this.listaIds += element['codigoBarra'] + ';'
    })
    this.listaIds = this.listaIds.substring(0, this.listaIds.length - 1);
    this.objetoConsulta = {
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
    
    console.log('objeto consulta',this.objetoConsulta)
      

         this.detalleCuentas.aplicarLiquidacion(this.objetoConsulta).subscribe(
        data =>{
          this.resultadoAplicacion = data;
          this.openDialog();
          console.log(data)
          
      },(error)=>{
        if(error.status == 400 || error.status == 404){
          this.errorAplicar = true;
          this.openDialog();
        }
        
      }
  )}
    
    
  }
  
  @Component({
  selector: 'dialog-overview-example-dialog3',
  templateUrl: 'dialog-overview-example-dialog3.html',
})
export class DialogOverviewExampleDialog3 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ocultaSpinner = false;
  tipoCaso;
  errorCase;
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
     console.log(this.data['tipoCaso'])
     console.log(this.data['errorCase'])
    if(this.data['tipoCaso'] == 'A' && this.data['errorCase'] != true){
    console.log(this.data);
    this.tipoCaso = 'A';
    }
    else if(this.data['tipoCaso'] == 'B' && this.data['errorCase'] != true){
      this.tipoCaso = 'B'
    }
    else if(this.data['errorCase']){
      console.log(this.data['errorCase'])
      this.errorCase = true;
    }
  }
  
    ngOnChanges(changes: SimpleChanges) {
     
    if(this.data['resultadoAplicacion'] != undefined){
      this.ocultaSpinner = true;
    }
    }
    
  // ngAfterViewInit() {
  //   console.log(this.data)
  //   console.log('spinner', this.ocultaSpinner)
  //   this.ocultaSpinner;
  // }


}
  

  


