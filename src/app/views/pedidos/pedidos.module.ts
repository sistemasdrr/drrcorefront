import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { Asignacion2Component } from './asignacion2/asignacion2.component';
import { SeleccionarAgenteComponent } from './asignacion2/seleccionar-agente/seleccionar-agente.component';
import { ListaEmpresasComponent } from './detalle/lista-empresas/lista-empresas.component';
import { ConsultarComponent } from './lista/consultar/consultar.component';
import { ListaAbonadosComponent } from './detalle/lista-abonados/lista-abonados.component';

@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent,
    AsignacionComponent,
    Asignacion2Component,
    SeleccionarAgenteComponent,
    ListaEmpresasComponent,
    ConsultarComponent,
    ListaAbonadosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PedidosModule { }
