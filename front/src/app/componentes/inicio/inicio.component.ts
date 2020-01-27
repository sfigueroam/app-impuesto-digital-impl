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
      saldo:['']
    });
    
      this.formaFolio = fb.group({
      folio: ['', [Validators.required, Validators.maxLength(11)]],
      formulario: ['', [Validators.maxLength(3), Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaDesde : [''],
      fechaHasta: [''],
      saldo:['',]
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
         console.log(this.formaFolio.get('folio'),this.formaFolio.get('formulario') );
        this.botonBuscarFolio = false;
      }
    })
    
    
  }

  ngOnInit() {
    console.log(this.forma.status);
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

    this.forma.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscar = true;
        this.botonDatosIncompletos = false
      }
      else{
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
      }
    })
    
    
    this.formaFolio.statusChanges.subscribe(data =>{
      if(data == 'VALID'){
        this.botonBuscar = true;
        this.botonDatosIncompletos = false
      }
      // else if((this.formaFolio.get('folio').dirty && data == 'INVALID') || (this.formaFolio.get('formulario').dirty && data == 'INVALID') ){
      //   this.botonBuscar = false;
        
      // }
      else if(this.formaFolio.get('formulario').dirty && this.formaFolio.get('folio').untouched){
        this.botonBuscar = false;
        this.botonDatosIncompletos = true;
      }
      
      else if(this.formaFolio.get('folio').invalid && this.formaFolio.get('formulario').valid){
        this.botonBuscar = false;
        this.botonDatosIncompletos = false;
        
      }
      
      // else if(this.formaFolio.get('folio').invalid && this.formaFolio.get('formulario').valid && this.formaFolio.get('folio').dirty){
      //   this.botonBuscar = false;
      //   this.botonDatosIncompletos = false;
        
      // }
    })
}

comprobarRut(value:string){
  if(value.charAt(value.length-1) == 'k'){
   value =  value.replace(/\k/g, 'K');
  }
  if(!rut.validar(value)){
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
  
    handleKeyboardEvent(event) {
    if (event.keyCode === 13) {
     console.log('hola');
    }
  }
  

  


}
