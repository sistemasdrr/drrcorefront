import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './personal/lista/lista.component';
import { DetalleComponent } from './personal/detalle/detalle.component';
import { MantenedorComponent } from './mantenedor/mantenedor.component';

const routes: Routes = [
  {
    path : 'personal/lista', component : ListaComponent,
    title : 'Lista de Personal - DRR Core V1'
  },
  {
    path : 'personal/detalle/:id', component : DetalleComponent,
    title : 'Detalles de Personal - DRR Core V1'
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
