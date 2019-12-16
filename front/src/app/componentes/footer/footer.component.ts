import { Component, OnInit, Input, Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface DialogData {
  montoSwift;
  fechaOrdenPago;
  fechaDeposito;
  descripcion;
  bancoCorresponsal;
  nOrdenPago;
}

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
  montoSwift;
  fechaOrdenPago;
  fechaDeposito;
  descripcion;
  bancoCorresponsal;
  nOrdenPago;
  datosModal:{};

  constructor(private cdRef:ChangeDetectorRef, public dialog: MatDialog) { }

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
    this.openDialog();
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
      width: '250px',
      data: {montoSwift: this.montoSwift, fechaOrdenPago: this.fechaOrdenPago, fechaDeposito: this.fechaDeposito,
       descripcion: this.descripcion, bancocorresponsal: this.bancoCorresponsal, nOrdenPago: this.nOrdenPago}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
          
      this.datosModal = result;
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  formGiro: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formDialog: FormBuilder,) {
      
      this.formGiro = formDialog.group({
        montoSwift : [''],
        fechaOrdenPago: [{disable:true, value: ''}],
        fechaDeposito: [{disable:true, value: ''}],
        descripcionRemesa: [''],
        bancoCorresponsal: [''],
        nOrdenPago:['']
      })
      
    }

  onNoClick(): void {

    this.dialogRef.close();
  }
  
  getDatosForm(){
    console.log(this.formGiro.value);
    this.dialogRef.close();
  }

}
