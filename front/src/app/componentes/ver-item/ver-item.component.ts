import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ver-item',
  templateUrl: './ver-item.component.html',
  styleUrls: ['./ver-item.component.scss']
})
export class VerItemComponent implements OnInit {

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
