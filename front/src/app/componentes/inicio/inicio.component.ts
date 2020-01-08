import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef  } from '@angular/core';
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
   
  @Output()
   datosFormFolio = new EventEmitter<{}>();
  

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
      formulario: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      fechaDesde : [''],
      fechaHasta: [''],
      saldo:['',]
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
    

  }
  
  
  
  validate_fechaMayorQue(fechaInicial,fechaFinal){
            
      const valuesStart=fechaInicial.split("-");
      const valuesEnd=fechaFinal.split("-");
      console.log('valores Start End', valuesStart,valuesEnd)
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
  let data = this.formaFolio.value
  data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
  data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
      if(!this.validate_fechaMayorQue(data.fechaDesde, data.fechaHasta)){
      console.log('entre a poner el boton en false');
      this.formaFolio.controls['fechaHasta'].setErrors({'incorrect' : true})
    };
  
}

pruebainputRut(){
  let data = this.forma.value
  data.fechaDesde = moment(data.fechaDesde).locale('en-ca').format('L');
  data.fechaHasta = moment(data.fechaHasta).locale('en-ca').format('L');
      if(!this.validate_fechaMayorQue(data.fechaDesde, data.fechaHasta)){
      console.log('entre a poner el boton en false');
      this.forma.controls['fechaHasta'].setErrors({'incorrect' : true})
    };
  
}


}
