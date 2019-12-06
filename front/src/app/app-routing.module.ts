import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component'
import { MainComponent } from './components/main/main.component'
import { InicioComponent } from './components/inicio/inicio.component';


const routes: Routes = [
  { path: '', component : InicioComponent},
  { path: 'main', component : MainComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
