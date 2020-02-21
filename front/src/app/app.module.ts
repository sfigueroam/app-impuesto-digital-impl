import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './MaterialModule';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HeaderComponent } from './componentes/header/header.component';
import { Ng2Rut } from 'ng2-rut';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TablaDatosComponent } from './componentes/tabla-datos/tabla-datos.component';
import { MatTableModule } from '@angular/material';
import { TablaMovimientoComponent } from './componentes/tabla-movimiento/tabla-movimiento.component';
import { VerItemComponent } from './componentes/ver-item/ver-item.component';
import { FooterComponent } from './componentes/footer/footer.component'
import {DialogOverviewExampleDialog} from './componentes/footer/footer.component';
import {DialogOverviewExampleDialog2} from './componentes/principal/principal.component';
import {DialogOverviewExampleDialog3} from './componentes/procesar-transaccion/procesar-transaccion.component';
import {DialogOverviewExampleDialog4} from './componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatDialogModule} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { AutenticaComponent } from './componentes/autentica/autentica.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { LeadingZeroPipe } from './pipes/leading-zero.pipe';
import { ProcesarTransaccionComponent } from './componentes/procesar-transaccion/procesar-transaccion.component';
import { NoAutorizadoComponent } from './componentes/no-autorizado/no-autorizado.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    PrincipalComponent,
    TablaDatosComponent,
    TablaMovimientoComponent,
    VerItemComponent,
    FooterComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    DialogOverviewExampleDialog4,
    AutenticaComponent,
    LoginComponent,
    LogoutComponent,
    LeadingZeroPipe,
    ProcesarTransaccionComponent,
    NoAutorizadoComponent
    
  ],
  
    entryComponents: [ 
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    DialogOverviewExampleDialog4
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    Ng2Rut,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
     { provide: LOCALE_ID, useValue: 'es' },
     CookieService
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
