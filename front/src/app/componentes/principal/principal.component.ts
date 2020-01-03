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
  
  
  
  constructor(private detalleCuentas: DetalleCuentasService, private cdRef:ChangeDetectorRef, public dialog: MatDialog, private usuario: UsuarioService) { }

  
  ngOnInit() {
     console.log('inicio de todo ocultaform,verTablaDatos,verMov', this.ocultarForm,this.verTablaDatos,this.verMov)
  }
  
  estadoMostrarTabla(mostrarpantalla:boolean){
    this.ocultarForm = !mostrarpantalla;
    this.cargaDatos = true
    console.log('este booleano viene de inicio', mostrarpantalla)
  }
  
    ngAfterViewChecked()
{
  this.cdRef.detectChanges();
}
  
  getDatosForm(objeto:{}){
    
    //aca va la llamada al servicio para cargar los datos de la tabla  
    this.objetoForm = objeto;
    console.log('despues de apretar get items form ocultaform,verTablaDatos,verMov, cargadatos', this.ocultarForm,this.verTablaDatos,this.verMov, this.cargaDatos)
    // console.log('datos en principal', this.objetoForm)
    this.detalleCuentas.presentaCuentasME(this.objetoForm).subscribe(
      data => {
        this.movParaTabla = data;
        console.log(this.movParaTabla);
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
            console.log('despues resultado error ocultaform,verTablaDatos,verMov, CargaDatos', this.ocultarForm,this.verTablaDatos,this.verMov, this.cargaDatos)
          }
        
      })
   
      this.movParaTabla;
    console.log('despues resultado corrrecto ocultaform,verTablaDatos,verMov, CargaDatos', this.ocultarForm,this.verTablaDatos,this.verMov, this.cargaDatos)
  }
  
  getDatosTable(objeto:{}){
    this.cargaDatos = true
    this.ocultarForm = false;
    this.objetoTabla = objeto;
    console.log('objeto recibido de la tabla', this.objetoTabla)
    this.detalleCuentas.getMovimientos(this.objetoTabla['id']).subscribe(
      data => {
        this.detalleMovParaTabla = data;
        console.log('estos datos se van para desplegar detalle de mov',this.detalleMovParaTabla)
            this.verTablaDatos = true;
            this.ocultarForm = false;
            this.cargaDatos = false;
        
      })
      
      this.detalleMovParaTabla;
    console.log('despues de apretar get filatabla ocultaform,verTablaDatos,verMov', this.ocultarForm,this.verTablaDatos,this.verMov)
    
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
  // this.ocultarForm = true;
  //   this.verTablaDatos = false;
  this.movSeleccionado = mov;
  this.verDetalleItem = true
  this.verMov = true;
    //console.log('despues de apretar ver item ocultaform,verTablaDatos,verMov', this.ocultarForm,this.verTablaDatos,this.verMov)
    
    console.log('movimiento recibido de tabla movimiento', this.movSeleccionado);
 
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

