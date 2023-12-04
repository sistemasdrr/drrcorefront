import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { Asignacion2Component } from './asignacion2/asignacion2.component';
import { AsignacionComponent } from './asignacion/asignacion.component';

const routes: Routes = [
  {
    path: 'lista', component: ListaComponent,
    title : 'Lista de Pedidos - DRR Core V1'
  },
  {
    path: 'detalle/:tipo/:cupon', component: DetalleComponent,
    title : 'Detalles del Pedido - DRR Core V1'
  },
  {
    path: 'asignacion-empleados', component: Asignacion2Component,
    title : 'Asignación del Pedido - DRR Core V1'
  },
  {
    path: 'asignacion', component: AsignacionComponent,
    title : 'Asignación del Pedido - DRR Core V1'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
