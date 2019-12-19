import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DetalleCuentasService} from '../../servicios/detalle-cuentas.service';


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
  movSeleccionado:{};
  movParaTabla;
  detalleMovParaTabla;
  
  
  
  constructor(private detalleCuentas: DetalleCuentasService, private cdRef:ChangeDetectorRef) { }

  
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
      })
   
      this.movParaTabla;
    console.log('despues de apretar get items form ocultaform,verTablaDatos,verMov, CargaDatos', this.ocultarForm,this.verTablaDatos,this.verMov, this.cargaDatos)
  }
  
  getDatosTable(objeto:{}){
    this.objetoTabla = objeto;
    console.log('objeto recibido de la tabla', this.objetoTabla)
    this.detalleCuentas.getMovimientos(this.objetoTabla['idCta']).subscribe(
      data => {
        this.detalleMovParaTabla = data
        console.log('estos datos se van para desplegar detalle de mov',this.detalleMovParaTabla)
            this.verTablaDatos = true;
            this.ocultarForm = false;
        
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
  
  
  // datosCargadosPrimeraTabla(booleano: boolean){
   
  //   // this.cargaDatos = false;
  //   console.log('datosCargadosPrimeraTabla ocultaform,verTablaDatos,verMov, cargadatos', this.ocultarForm,this.verTablaDatos,this.verMov, this.cargaDatos)
  //   console.log('cargaron los datos en la tabla', booleano);
 
  //   // this.verTablaDatos = false
  //   // this.verMov = false;
  //   // this.cargaDatos = !booleano;
  // }
  

}
