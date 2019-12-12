import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from 'src/app/componentes/inicio/inicio.component';
import {PrincipalComponent} from 'src/app/componentes/principal/principal.component';
import {TablaDatosComponent} from 'src/app/componentes/tabla-datos/tabla-datos.component';
import {TablaMovimientoComponent} from 'src/app/componentes/tabla-movimiento/tabla-movimiento.component';
import {VerItemComponent} from 'src/app/componentes/ver-item/ver-item.component';

const routes: Routes = [
 {path: '', component: PrincipalComponent},
 {path: 'tabla', component: TablaDatosComponent},
 {path: 'tablamov', component: TablaMovimientoComponent},
 {path: 'item', component: VerItemComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
