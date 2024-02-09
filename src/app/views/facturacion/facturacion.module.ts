import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionAgenteComponent } from './facturacion-agente/facturacion-agente.component';
import { FacturacionMensualComponent } from './facturacion-abonado/facturacion-mensual/facturacion-mensual.component';
import { FacturacionConCuponesComponent } from './facturacion-abonado/facturacion-con-cupones/facturacion-con-cupones.component';
import { ComponentsModule } from '@shared/components/components.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    FacturacionAgenteComponent,
    FacturacionMensualComponent,
    FacturacionConCuponesComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    ComponentsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class FacturacionModule { }
