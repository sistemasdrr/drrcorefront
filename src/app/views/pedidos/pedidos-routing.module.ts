import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AsignacionComponent } from './asignacion/asignacion.component';

const routes: Routes = [
  {
    path: 'lista', component: ListaComponent
  },
  {
    path: 'detalle/:tipo/:cupon', component: DetalleComponent
  },
  {
    path: 'asignacion', component: AsignacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
