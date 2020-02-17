import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef  } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import { RutValidator } from 'ng2-rut/dist/rut.validator';
import * as moment from 'moment';
import {ErrorStateMatcher} from '@angular/material/core';
const rut = require('validar-rut')


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
   botonBuscarFolio:boolean;
   botonDatosIncompletos:boolean = false;
   matcher = new MyErrorStateMatcher();
   @Output()
   mostrarTabla= new EventEmitter<boolean>();
  
   @Output()
   datosForm = new EventEmitter<{}>();
   
  @Output()
   datosFormFolio = new EventEmitter<{}>();
   
  @Output()
  tipoConsulta = new EventEmitter<{}>();
  
  constructor(rutValidator: RutValidator, fb: FormBuilder, private cdRef:ChangeDetectorRef) {
    
    this.forma = fb.group({
      identificacion: ['', [Validators.required, rutValidator, Validators.maxLength(10)]],
      formulario: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      fechaDesde : [''],
      fechaHasta: [''],
      saldo:[]
    });
    
      this.formaFolio = fb.group({
      folio: ['', [Validators.required, Validators.maxLength(11)]],
      formulario: ['', [Validators.maxLength(3), Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaDesde : [''],
      fechaHasta: [''],
      saldo:[]
    });
    
    this.forma.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscar = true;
        this.botonDatosIncompletos = false
      }
      else{
        this.botonBuscar = false;
      }
    })
    
    this.formaFolio.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscarFolio = true;
        this.botonDatosIncompletos = false;
       
      }
      else{
        this.botonBuscarFolio = false;
      }
    })
    
    
  }

  ngOnInit() {
  }
  
  
  ngAfterViewChecked(){
  
    this.cdRef.detectChanges();

}
  
  setDataRut(){
    let data = this.forma.value;
    data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
    data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
    data.fechaDesde = data.fechaDesde.replace(/\//g , "-");
    data.fechaHasta = data.fechaHasta.replace(/\//g , "-");
    data['IdSistema'] = '3';
    this.mostrarTabla.emit(true);
    this.datosForm.emit(data);
    this.tipoConsulta.emit('r');
    
   
  

  }
  
   setDataFolio(){
    let data = this.formaFolio.value;
    data['IdSistema'] = '3';
    data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
    data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
    data.fechaDesde = data.fechaDesde.replace(/\//g , "-");
    data.fechaHasta = data.fechaHasta.replace(/\//g , "-");
    this.mostrarTabla.emit(true);
    this.datosFormFolio.emit(data);
    this.tipoConsulta.emit('f');
    

  }
  
  
  
  validate_fechaMayorQue(fechaInicial,fechaFinal){
            
      const valuesStart=fechaInicial.split("-");
      const valuesEnd=fechaFinal.split("-");
            // Verificamos que la fecha no sea posterior a la actual
            var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
            var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
            if(dateStart>=dateEnd)
            {
                return 0;
            }
            return 1;
        }

pruebainput(){
  let data = this.formaFolio.value
  data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
  data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
      if(!this.validate_fechaMayorQue(data.fechaDesde, data.fechaHasta)){
      this.formaFolio.controls['fechaHasta'].setErrors({'incorrect' : true})
    };
  
}

pruebainputRut(){
  let data = this.forma.value
  data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
  data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
      if(!this.validate_fechaMayorQue(data.fechaDesde, data.fechaHasta)){
      this.forma.controls['fechaHasta'].setErrors({'incorrect' : true})
    };
  
}

avisoInput(){
  
  if(this.forma.get('fechaDesde').dirty && this.forma.get('fechaHasta').dirty && this.forma.get('identificacion').untouched){
      this.botonBuscar = false;
      this.botonDatosIncompletos = true;
  }
  if(this.forma.get('saldo').dirty && this.forma.get('identificacion').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
  }
  
  if(this.forma.get('formulario').dirty && this.forma.get('identificacion').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
  }
  // FOLIO //
  if(this.formaFolio.get('formulario').dirty && this.formaFolio.get('folio').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
  }
  
  if(this.formaFolio.get('fechaDesde').dirty && this.formaFolio.get('fechaHasta').dirty && this.formaFolio.get('folio').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
  }
  
  if(this.formaFolio.get('saldo').dirty && this.formaFolio.get('folio').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
  }

}

comprobarRut(value:string){
  if(value.charAt(value.length-1) == 'k'){
   value =  value.replace(/\k/g, 'K');
  }
  let aux = value.substring(value.length - 1, value.length);
  if(aux == '0'){
    
  }
  else if(!rut.validar(value)){
    this.forma.controls['identificacion'].setErrors({'incorrect': true})
  }
  
}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  limpiarFormRut(){
    this.forma.reset();
    this.botonDatosIncompletos = false;
}

limpiarFormFolio(){
  this.formaFolio.reset();
  this.botonDatosIncompletos = false;
}
}
