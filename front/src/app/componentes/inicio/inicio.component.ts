import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import { RutValidator } from 'ng2-rut/dist/rut.validator';
import * as moment from 'moment';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
   forma:FormGroup;
   formaFolio: FormGroup;
   botonBuscar:boolean;
   matcher = new MyErrorStateMatcher();
   @Output()
   mostrarTabla= new EventEmitter<boolean>();
  
   @Output()
   datosForm = new EventEmitter<{}>();
  

  constructor(rutValidator: RutValidator, fb: FormBuilder) {
    
    this.forma = fb.group({
      identificacion: ['', [Validators.required, rutValidator, Validators.maxLength(10)]],
      formulario: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      fechaDesde : [{disable:true, value: ''}],
      fechaHasta: [{disable:true, value: ''}],
      saldo:['',Validators.required]
    });
    
      this.formaFolio = fb.group({
      folio: ['', [Validators.required, Validators.maxLength(11)]],
      formulario: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      fechaDesde : [{disable:true, value: ''}],
      fechaHasta: [{disable:true, value: ''}],
      saldo:['',Validators.required]
    });
    
    
    
    console.log(this.forma.valid.valueOf());
    this.forma.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscar = true;
      }
      else{
        this.botonBuscar = false;
      }
    })
    
    this.formaFolio.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscar = true;
      }
      else{
        this.botonBuscar = false;
      }
    })
    
    
  }

  ngOnInit() {
    
  }
  
  setDataRut(){
    let data = this.forma.value;
    data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
    data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
    data.fechaDesde = data.fechaDesde.replace(/\//g , "-");
    data.fechaHasta = data.fechaHasta.replace(/\//g , "-");
    this.mostrarTabla.emit(true);
    this.datosForm.emit(data);
  

  }
  
   setDataFolio(){
    let data = this.formaFolio.value;
    data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
    data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
    data.fechaDesde = data.fechaDesde.replace(/\//g , "-");
    data.fechaHasta = data.fechaHasta.replace(/\//g , "-");
    this.mostrarTabla.emit(true);
    this.datosForm.emit(data);
  }



}
