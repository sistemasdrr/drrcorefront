import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPersonalComponent } from './personal/lista/lista.component';
import { DetallePersonalComponent } from './personal/detalle/detalle.component';
import { ListaAbonadoComponent } from './abonado/lista/lista.component';
import { DetalleAbonadoComponent } from './abonado/detalle/detalle.component';
import { MantenedorComponent } from './mantenedor/mantenedor.component';
import { ListaAgenteComponent } from './agente/lista/lista.component';
import { DetalleAgenteComponent } from './agente/detalle/detalle.component';

const routes: Routes = [
  {
    path : 'personal/lista', component : ListaPersonalComponent,
    title : 'Lista de Personal - DRR Core V1'
  },
  {
    path : 'personal/detalle/:id', component : DetallePersonalComponent,
    title : 'Detalles de Personal - DRR Core V1'
  },
  {
    path : 'abonado/lista', component : ListaAbonadoComponent,
    title : 'Lista de Personal - DRR Core V1'
  },
  {
    path : 'abonado/detalle/:id', component : DetalleAbonadoComponent,
    title : 'Detalles de Personal - DRR Core V1'
  },
  {
    path : 'agente/lista', component : ListaAgenteComponent,
    title : 'Lista de Agentes - DRR Core V1'
  },
  {
    path : 'agente/detalle/:id', component : DetalleAgenteComponent,
    title : 'Detalles de Agente - DRR Core V1'
  },
  {
    path : 'general', component : MantenedorComponent,
    title : 'Mantenedor General - DRR Core V1'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
