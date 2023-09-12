import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { ListaComponent } from './abonados/lista/lista.component';
import { DetalleComponent } from './abonados/detalle/detalle.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    MaestroRoutingModule
  ]
})
export class MaestroModule { }
