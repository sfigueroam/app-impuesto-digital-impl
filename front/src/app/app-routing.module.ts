import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from 'src/app/componentes/inicio/inicio.component';
import {PrincipalComponent} from 'src/app/componentes/principal/principal.component'

const routes: Routes = [
 {path: '', component: PrincipalComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
