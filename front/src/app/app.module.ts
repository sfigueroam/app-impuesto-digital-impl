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
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    Ng2Rut,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
     { provide: LOCALE_ID, useValue: 'es' },
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
