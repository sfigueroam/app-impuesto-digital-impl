import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from 'src/app/componentes/inicio/inicio.component';
import {PrincipalComponent} from 'src/app/componentes/principal/principal.component';
import {TablaDatosComponent} from 'src/app/componentes/tabla-datos/tabla-datos.component';
import {TablaMovimientoComponent} from 'src/app/componentes/tabla-movimiento/tabla-movimiento.component';
import {VerItemComponent} from 'src/app/componentes/ver-item/ver-item.component';
import {FooterComponent} from 'src/app/componentes/footer/footer.component';
import { AutenticaComponent } from './componentes/autentica/autentica.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import {ProcesarTransaccionComponent} from './componentes/procesar-transaccion/procesar-transaccion.component';
import {NoAutorizadoComponent} from './componentes/no-autorizado/no-autorizado.component';


const routes: Routes = [
 {path: '', component: LoginComponent},
 {path: 'tabla', component: TablaDatosComponent},
 {path: 'tablamov', component: TablaMovimientoComponent},
 {path: 'item', component: VerItemComponent},
 {path: 'footer', component: FooterComponent},
 {path:"autentica", component:AutenticaComponent},
 {path:"inicio", component:PrincipalComponent},
 {path:"logout", component:LogoutComponent},
 {path:"procesar", component:ProcesarTransaccionComponent},
 {path:"noautorizado", component:NoAutorizadoComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
