import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespachoRoutingModule } from './despacho-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { MovimientoInformeComponent } from './lista/movimiento-informe/movimiento-informe.component';
import { DetalleComponent } from './lista/detalle/detalle.component';


@NgModule({
  declarations: [
    ListaComponent,
    MovimientoInformeComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    DespachoRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class DespachoModule { }
