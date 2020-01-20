import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import {UsuarioService} from '../../servicios/usuario.service';

export interface CuentasME {
        position: number
        idCta : number,
        rutCta: number,
        DvRutCta: string,
        FormaCta : number,
        FolioCta: number,
        MonedaCta: number,
        FechaVctoCta: Date,
        SaldoCta: number,
        FechaGiroCta: Date,
        NombreContrib: string
}

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss']
})
export class TablaDatosComponent implements OnInit {
  
  
  ELEMENT_DATA: CuentasME[] = [];

  
  displayedColumns: string[] = ['select','Folio', 'Formulario', 'Rut', 'Moneda', 'Saldo-Neto', 'Fecha-Venc', 'Fecha-Giro', 'action'];
  dataSource = new MatTableDataSource<CuentasME>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<CuentasME>(true, []);
  dataMov = {};
  elementosCheck = {};
  siguiente: boolean;
  datosFooter;
  numeroSelec = '0';
  nombreContribuyente;
  rutContribuyente;
  dvContribuyente;
  
  constructor(private cdRef:ChangeDetectorRef, private usuario: UsuarioService) { }
  @Input() datosPrincipal:{};
  @Input() tipoConsulta:string;
  // @Output()
  // datosPrimeraTabla = new EventEmitter<boolean>();
  @Output()
  fila = new EventEmitter<{}>();
  @Output()
  volverForm = new EventEmitter<boolean>();
  cantidadSeleccionada:any;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.datosPrincipal);
    // console.log(this.ELEMENT_DATA.length);
    
  }
  
  ngAfterViewChecked()
{
  console.log('tipod',this.tipoConsulta)
  this.datosFooter = this.cantidadSeleccionada;
  
  if(this.datosPrincipal != 'undefined' && (this.ELEMENT_DATA.length == 0 || this.ELEMENT_DATA.length == undefined)){
    console.log(this.datosPrincipal);
    this.llenarTablaMov(this.datosPrincipal);
    this.nombreContribuyente = this.datosPrincipal[0]['nombreContribuyente'];
    this.rutContribuyente = this.datosPrincipal[0]['rutRol']
    this.dvContribuyente = this.datosPrincipal[0]['rutDv']
    this.usuario.nombreUsuario = this.nombreContribuyente;
    this.usuario.rutUsuario = this.rutContribuyente;
    this.usuario.dvUsuario = this.dvContribuyente;
    console.log('llegaron los datos a la tabla 1 y estos son nobre rut y dv', this.nombreContribuyente, this.rutContribuyente, this.dvContribuyente );
  }
  // if(this.datosPrincipal != undefined){
  //   console.log('ya llego el objeto');
  // }
  this.numeroSelec = this.cantidadSeleccionada.length;
  this.cdRef.detectChanges();
}
  
  
  llenarTablaMov(obj:{}){
   console.log('tengo que llenar datos con esto', obj)
    let largoob = Object.keys(obj).length
    for(var i = 0; i < largoob; i++){
      console.log(obj[Object.keys(obj)[i]]);
      let objInter =  obj[Object.keys(obj)[i]];
      objInter['position'] = i;
      this.ELEMENT_DATA.push(objInter); 
    }
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
    console.log('datos en element data', this.ELEMENT_DATA)
    
  }
  
    /**  Aplica los filtros sobre la tabla */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        
     this.actualizarSeleccionados();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CuentasME): string {
    this.cantidadSeleccionada = this.selection.selected;
    if (!row) {
   
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
 
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    
  }
  
  
    actualizarSeleccionados() {
    this.cantidadSeleccionada = this.selection.selected;
    this.numeroSelec = this.cantidadSeleccionada;
      console.log('cantidad desde actualizar selec', this.numeroSelec.length);
  }
  
   private selectRow($event, dataSource) {
    if ($event.cheked) {
      console.log($event.checked)
      this.dataMov = dataSource;
    }
  }
  
  verMovimiento(element){
    this.fila.emit(element);
  }
  
  volver(){
    this.volverForm.emit(true);
  }
  
  
  
  
  
  

}
