import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'APELLIDO PATERNO', weight: 'Orellana'},
  {position: 2, name: 'APELLIDO MATERNO', weight: 'Espinoza'},
  {position: 3, name: 'NUMERO DE RUT', weight: '12.465.349-5'},
  {position: 5, name: 'NOMBRES', weight: 'Tatiana Elizabeth'},
  {position: 6, name: 'DIRECCIÓN', weight: 'Bio Bio 1485, 54 E, Edificio Bio Bio'},
  {position: 7, name: 'ORDEN O FOLIO', weight: '17209502'},
  {position: 8, name: 'COMUNA', weight: 'Santiago'},
  {position: 10, name: 'NUMERO DE CUOTA', weight: '2'},
  {position: 15, name: 'FECHA DE VENCIMIENTO', weight: '31/03/2011'},
  {position: 91, name: 'TOTAL A PAGAR PLAZO', weight: '$17.039'},
];

@Component({
  selector: 'app-ver-item',
  templateUrl: './ver-item.component.html',
  styleUrls: ['./ver-item.component.scss']
})
export class VerItemComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  constructor(private cdRef:ChangeDetectorRef) { }
 @Input() movConsultado:{}
 @Output()
 volverSeleccioMov = new EventEmitter<boolean>()
 
  
  ngOnInit() {

  }
  
  
  ngAfterViewChecked(){
  
    this.cdRef.detectChanges();
    console.log('item a ver en ver item', this.movConsultado);

}
  
  volver(){
    console.log('emitiendo el true')
    this.volverSeleccioMov.emit(true);
    
  }

}
