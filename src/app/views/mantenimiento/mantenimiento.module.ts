import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { ListaComponent } from './personal/lista/lista.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { DetalleComponent } from './personal/detalle/detalle.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
