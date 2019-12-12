import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-item',
  templateUrl: './ver-item.component.html',
  styleUrls: ['./ver-item.component.scss']
})
export class VerItemComponent implements OnInit {

  constructor() { }
 @Input() movConsultado:{}
 @Output()
 volverSeleccioMov = new EventEmitter<boolean>()
 
  
  ngOnInit() {

  }
  
  volver(){
    console.log('emitiendo el true')
    this.volverSeleccioMov.emit(true);
    
  }

}
