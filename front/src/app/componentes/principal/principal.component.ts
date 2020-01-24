import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../footer/footer.component';
import {UsuarioService}from '../../servicios/usuario.service';


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
  movSeleccionado;
  movParaTabla;
  detalleMovParaTabla;
  detalleItem;
  consultaTipo:string;
  
  
  
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
        this.ocultarForm = true;
        this.cargaDatos = false;
       
      },(error) =>{
         if(error.status == 404){
            this.openDialog();
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;
          }
        
      })
   
      this.movParaTabla;
  }
  
    getDatosFormFolio(objeto:{}){
    
    //aca va la llamada al servicio para cargar los datos de la tabla  
    this.objetoForm = objeto;
    this.detalleCuentas.presentaCuentasMEFolio(this.objetoForm).subscribe(
      data => {
        this.movParaTabla = data;
        this.ocultarForm = true;
        this.cargaDatos = false;
       
      },(error) =>{
        if(error.status == 404){
            this.openDialog();
            this.ocultarForm  = false;
            this.verTablaDatos = false;
            this.verMov = false;
            this.verDetalleItem = false
            this.cargaDatos = false;
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
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  



  

}

