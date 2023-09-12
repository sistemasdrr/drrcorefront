import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeRoutingModule } from './informe-routing.module';
import { IEListaComponent } from './informe-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './informe-empresa/ie-detalle/ie-detalle.component';
import { IeListaComponent } from './info-persona/ie-lista/ie-lista.component';
import { IeDetalleComponent } from './info-persona/ie-detalle/ie-detalle.component';


@NgModule({
  declarations: [
    IEListaComponent,
    IEDetalleComponent,
    IeListaComponent,
    IeDetalleComponent
  ],
  imports: [
    CommonModule,
    InformeRoutingModule
  ]
})
export class InformeModule { }
