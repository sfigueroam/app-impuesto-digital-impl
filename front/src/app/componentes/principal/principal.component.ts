import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Inject, SimpleChanges } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../footer/footer.component';
import {UsuarioService}from '../../servicios/usuario.service';
import * as moment from 'moment';

export interface DialogData{
  rutnoEncontrado;
  errorServidor;
  
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  ocultarForm:boolean;
  cargaDatos:boolean;
  objetoForm:{};
  objetoTabla:{};
  verTablaDatos:boolean;
  verMov:boolean;
  verDetalleItem:boolean;
  verEstadoLiquidables:boolean;
  movSeleccionado;
  movParaTabla;
  detalleMovParaTabla;
  detalleItem;
  consultaTipo:string;
  ocultarCheck: boolean = false;
  estadoLiquidables;
  detallesSwift;
  rutnoEncontrado;
  errorServidor;
  
  
  constructor(private detalleCuentas: DetalleCuentasService, private cdRef:ChangeDetectorRef, public dialog: MatDialog, private usuario: UsuarioService) { }

  
  ngOnInit() {
  }
  
  estadoMostrarTabla(mostrarpantalla:boolean){
    this.ocultarForm = !mostrarpantalla;
    this.cargaDatos = true
  }
  
    ngAfterViewChecked()
{
  this.cdRef.detectChanges();
}
  
  getDatosForm(objeto:{}){
    
    //aca va la llamada al servicio para cargar los datos de la tabla  
    this.objetoForm = objeto;
    // console.log('datos en principal', this.objetoForm)
    this.detalleCuentas.presentaCuentasME(this.objetoForm).subscribe(
      data => {
        this.movParaTabla = data;
        this.movParaTabla.forEach(element => {
          element.fechaVcto = moment(element.fechaVcto).format()
          if(element.formTipo != '21'){
            this.ocultarCheck = true;
            console.log(this.ocultarCheck);
            element['excluded'] = true
          }
        })

    this.movParaTabla.sort(function (a, b) {
      if (a.fechaVcto > b.fechaVcto) {
        return 1;
      }
      if (a.fechaVcto < b.fechaVcto) {
        return -1;
      }
      return 0;
      });
        
    this.movParaTabla.sort(function (a, b){
    return (b.fechaVcto - a.fechaVcto)
    })

        this.ocultarForm = true;
        this.cargaDatos = false;
       
      },(error) =>{
         if(error.status == 404){
            
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;
  
            this.openDialog();
          }
          else if(error.status == 500 || error.status == 502 || error.status == 504){
            // this.openDialog();
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;
 
            this.openDialog();
          }
        
      })
  }
  
    getDatosFormFolio(objeto:{}){
    
    //aca va la llamada al servicio para cargar los datos de la tabla  
    this.objetoForm = objeto;
    this.detalleCuentas.presentaCuentasMEFolio(this.objetoForm).subscribe(
      data => {
        
        this.movParaTabla = data;
        this.movParaTabla.forEach(element => {
          element.fechaVcto = moment(element.fechaVcto).format()
          if(element.formTipo != '21'){
            this.ocultarCheck = true;
            element['excluded'] = true
          }
        })

    this.movParaTabla.sort(function (a, b) {
      if (a.fechaVcto > b.fechaVcto) {
        return 1;
      }
      if (a.fechaVcto < b.fechaVcto) {
        return -1;
      }
      return 0;
      });
        this.ocultarForm = true;
        this.cargaDatos = false;
       
      },(error) =>{
        if(error.status == 404){
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;
            this.rutnoEncontrado = true;

            this.openDialog();
          }
            else if(error.status == 500 || error.status == 502 || error.status == 504){
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;

            this.openDialog();
          }
        
      })
   
  }
  
  
  
  tipoConsulta(tipo:string){
    this.consultaTipo = tipo;
  }
  
  
  getDatosTable(objeto:{}){
    this.cargaDatos = true
    this.ocultarForm = false;
    this.objetoTabla = objeto;
    this.detalleCuentas.getMovimientos(this.objetoTabla['id']).subscribe(
      data => {
        this.detalleMovParaTabla = data;
            this.verTablaDatos = true;
            this.ocultarForm = false;
            this.cargaDatos = false;
        
      })
      
    
  }
  
  volverForm(volver:boolean){
    this.ocultarForm  = false;
    this.verTablaDatos = false;
    this.verMov = false;
    this.verDetalleItem = false
  }
  
  volverTablaDatos(volver:boolean){
    this.ocultarForm = true;
    this.verTablaDatos = false;
    this.verMov = false;
    this.verDetalleItem = false;
    console.log('esatdos de los ocultar CARGADATOS OCULTARFORM VERMOV TABLAD DETALLE', this.cargaDatos, this.ocultarForm, this.verMov, this.verTablaDatos, this.verDetalleItem)
  }
  
    volverTablaDatosProcesar(volver:boolean){
    console.log('llegue a tsabla datos principal')
    
    this.ocultarForm = true;
    this.verTablaDatos = false;
    this.verMov = false;
    this.verDetalleItem = false;
    this.verEstadoLiquidables = false;
    console.log('esatdos de los ocultar CARGADATOS OCULTARFORM VERMOV TABLAD DETALLE', this.cargaDatos, this.ocultarForm, this.verMov, this.verTablaDatos, this.verDetalleItem)
  }

  
  volverTablaMovimientos(volver:boolean){
    this.ocultarForm = false;
    this.verTablaDatos = true;
    this.verMov  = false;
    this.verDetalleItem = false;
  }
  
  getMovimientoSeleccionado(mov:{}){
    this.cargaDatos = true
    this.ocultarForm = false;
  this.movSeleccionado = mov;
  this.verDetalleItem = true
  this.verMov = true;
  this.detalleCuentas.getItem(this.movSeleccionado['id']).subscribe(
      data => {
        this.detalleItem = data;
            this.verTablaDatos = true;
            this.ocultarForm = false;
            this.cargaDatos = false;
            
            
        
      })
    this.usuario.datosMov = this.detalleItem;
 
  }
  
  getIdMovimientos(obj:{}){
    this.cargaDatos = true
    this.ocultarForm = false;
    var objConsulta = {
      "inIdConsulta" : "1",
      "inListaIds" : obj
    }
      this.detalleCuentas.estadoLiquidables(objConsulta).subscribe(
        data =>{
          console.log(data)
          this.estadoLiquidables = data;  
          this.verEstadoLiquidables = true;
          this.cargaDatos = false;
          this.ocultarForm = true;
      })
    console.log('id movimientos en principal', this.estadoLiquidables)
  }
  
  getDatosSwift(obj:{}){
    this.detallesSwift = obj;
    console.log('datos del swift en principal', this.detallesSwift )
    
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}



@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
})
export class DialogOverviewExampleDialog2 {
  codigoRut;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
      
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
 ngOnChanges(changes: SimpleChanges) {
   console.log(JSON.stringify(this.data))
    }
  
  ngOnInit() {
}
    

}

