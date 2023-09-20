import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IEListaComponent } from './info-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './info-empresa/ie-detalle/ie-detalle.component';
import { IPListaComponent } from './info-persona/ip-lista/ip-lista.component';
import { IPDetalleComponent } from './info-persona/ip-detalle/ip-detalle.component';

const routes: Routes = [
  {
    path : 'empresa/lista', component : IEListaComponent
  },
  {
    path : 'empresa/detalle', component : IEDetalleComponent
  },
  {
    path : 'persona/lista', component : IPListaComponent
  },
  {
    path : 'persona/detalle', component : IPDetalleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeRoutingModule { }
