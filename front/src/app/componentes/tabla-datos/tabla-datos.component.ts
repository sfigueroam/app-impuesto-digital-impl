import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss']
})
export class TablaDatosComponent implements OnInit {
  
  
  ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

  
  displayedColumns: string[] = ['select','folio', 'formulario', 'moneda', 'saldo-neto', 'fecha-venc', 'fecha-giro', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataMov = {};
  elementosCheck = {};
  siguiente: boolean;
  datosFooter;
  numeroSelec;
  
  constructor(private cdRef:ChangeDetectorRef) { }
  @Input() objetoForm:{};
  @Output()
  fila = new EventEmitter<{}>();
  @Output()
  volverForm = new EventEmitter<boolean>();
  cantidadSeleccionada:any;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.objetoForm);
    // console.log(this.ELEMENT_DATA.length);
    
  }
  
  ngAfterViewChecked()
{
  this.datosFooter = this.cantidadSeleccionada;
  this.numeroSelec = this.cantidadSeleccionada.length;
  console.log('numero seleccionado desde afterchange', this.numeroSelec)
  this.cdRef.detectChanges();
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
  checkboxLabel(row?: PeriodicElement): string {
    this.cantidadSeleccionada = this.selection.selected;
    if (!row) {
   
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
 
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    
  }
  
  
    actualizarSeleccionados() {
    this.cantidadSeleccionada = this.selection.selected;
    this.numeroSelec = this.cantidadSeleccionada - 1;
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
