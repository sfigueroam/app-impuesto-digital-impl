import { Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import * as moment from 'moment';

export interface DialogData {
  montoSwift;
  fechaOrdenPago;
  fechaDeposito;
  ordenante;
  descripcionRemesa;
  bancoCorresponsal;
  nOrdenPago;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {
  

  @Input() idGiros:[{}];
  girosDesdeTabla = false;
  @Input() Ngiros:number;
  @Input() sinAplicar:boolean;
  @Output()
  volverTablaMovsFooter = new EventEmitter<boolean>();
  @Output()
  aplicarGiros = new EventEmitter<boolean>();
  @Input() habilitarBotonGiros;
  botonGiros;
  arregloFinal;
  montoSwift;
  fechaOrdenPago;
  fechaDeposito;
  descripcionRemesa;
  bancoCorresponsal;
  nOrdenPago;
  ordenante;
  datosModal:{};
  @Output()
 listaMovimientos = new EventEmitter<[{}]>()
  @Output()
 datosMovimiento = new EventEmitter<{}>()

  constructor(private cdRef:ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {

  }
  
  ngOnChanges(changes: SimpleChanges) {
      if( this.Ngiros != 0){
  
    this.botonGiros = false;

  }
  else{
    this.botonGiros = true
  }
  
  if(this.habilitarBotonGiros == false){
    this.habilitarBotonGiros= false
  }
  else{
    this.habilitarBotonGiros = true;
  }
 
    }
  
  aplicarGiro(){
    this.arregloFinal = this.cleanArray(this.idGiros)
    this.openDialog();
  }
  
  volverAtrasFooter(){
    //con esto vuelvo atras desde el footer
    this.volverTablaMovsFooter.emit(true)
  }
  
  botonAplicarGiro(){
  this.aplicarGiros.emit(true)
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      panelClass: 'tgr-dialog--aplicar-giro',
      data: {montoSwift: this.montoSwift, fechaOrdenPago: this.fechaOrdenPago, fechaDeposito: this.fechaDeposito,
       ordenante : this.ordenante, descripcionRemesa: this.descripcionRemesa,bancoCorresponsal: this.bancoCorresponsal, nOrdenPago: this.nOrdenPago}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.datosModal = result;
      if(this.datosModal){
        this.listaMovimientos.emit(this.arregloFinal);
        this.datosMovimiento.emit(this.datosModal);
      }
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  formGiro: FormGroup;
  botonHabilitarForm;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formDialog: FormBuilder) {
      
      this.formGiro = formDialog.group({
        montoSwift : ['', Validators.required],
        fechaOrdenPago: [{disable:true, value: ''}],
        fechaDeposito: [{disable:true, value: ''}],
        ordenante :[''],
        descripcionRemesa: [''],
        bancoCorresponsal: [''],
        nOrdenPago:['']
      })
      
    }
    
    
    
    ngOnChanges(changes: SimpleChanges) {
    }
  
  onNoClick(): void {

    this.dialogRef.close();
  }
  
  getDatosForm(){
    this.data.montoSwift = this.formGiro.get('montoSwift').value;
    this.dialogRef.close();
  }
  
 

    validate_fechaMayorQue(fechaInicial,fechaFinal){
            
      const valuesStart=fechaInicial.split("-");
      const valuesEnd=fechaFinal.split("-");
            // Verificamos que la fecha no sea posterior a la actual
            var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
            var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
            if(dateStart>=dateEnd)
            {
              console.log('la fecha de inicio es mayor');
                return 0;
            }
            return 1;
        }

pruebainput(){
  let data = this.formGiro.value
  data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
  data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
      if(!this.validate_fechaMayorQue(data.fechaDesde, data.fechaHasta)){
      this.formGiro.controls['fechaHasta'].setErrors({'incorrect' : true})
    };
  
}

habilitarBoton(){
  const re = new RegExp("^[0-9]+([.][0-9]+)?$");
  if(re.test(this.data.montoSwift)){
    this.botonHabilitarForm = true;
  }
else{
  this.botonHabilitarForm = false;
}
}



}
