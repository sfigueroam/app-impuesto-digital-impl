import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  ocultarForm:boolean;
  cargaDatosFinalizada:boolean = false;
  objetoForm:{};
  objetoTabla:{};
  verTablaDatos:boolean;
  verMov:boolean;
  verDetalleItem:boolean;
  movSeleccionado:{};
  
  constructor() { }

  
  ngOnInit() {
     console.log('inicio de todo ocultaform,verTablaDatos,verMov', this.ocultarForm,this.verTablaDatos,this.verMov)
  }
  
  estadoMostrarTabla(mostrarpantalla:boolean){
    this.ocultarForm = mostrarpantalla
    console.log('este booleano viene de inicio', mostrarpantalla)
  }
  
  getDatosForm(objeto:{}){
  
    //aca va la llamada al servicio para cargar los datos de la tabla  
    this.cargaDatosFinalizada = true;
    this.objetoForm = objeto;
    console.log('datos en principal', this.objetoForm)
    console.log('despues de apretar get items form ocultaform,verTablaDatos,verMov', this.ocultarForm,this.verTablaDatos,this.verMov)
  }
  
  getDatosTable(objeto:{}){
    this.objetoTabla = objeto;
    console.log('objeto recibido de la tabla', this.objetoTabla)
    this.verTablaDatos = true;
    this.ocultarForm = false;
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
  

}
