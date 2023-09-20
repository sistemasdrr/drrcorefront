import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeRoutingModule } from './informe-routing.module';
import { IEListaComponent } from './info-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './info-empresa/ie-detalle/ie-detalle.component';
import { IPListaComponent } from './info-persona/ip-lista/ip-lista.component';
import { IPDetalleComponent } from './info-persona/ip-detalle/ip-detalle.component';


@NgModule({
  declarations: [
    IEListaComponent,
    IEDetalleComponent,
    IPListaComponent,
    IPDetalleComponent
  ],
  imports: [
    CommonModule,
    InformeRoutingModule
  ]
})
export class InformeModule { }
