import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  

  @Input() idGiros:[{}];
  girosDesdeTabla = false;
  @Input() Ngiros:number;
  botonGiros;
  arregloFinal;
  

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit() {

  }
  
  ngAfterViewChecked(){
  if( this.Ngiros != 0){
  
    this.botonGiros = false;

  }
  else{
    this.botonGiros = true
  }
  this.cdRef.detectChanges();
  
}
  
  aplicarGiro(){
    this.arregloFinal = this.cleanArray(this.idGiros)
    console.log('array limpio', this.arregloFinal);
  }
  
  
  
  cleanArray( actual ){
  var newArray = new Array();
  for( var i = 0, j = actual.length; i < j; i++ ){
      if ( actual[ i ] ){
        newArray.push( actual[ i ] );
    }
  }
  return newArray;
}

}
