import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeRoutingModule } from './informe-routing.module';
import { IEListaComponent } from './info-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './info-empresa/ie-detalle/ie-detalle.component';
import { IPListaComponent } from './info-persona/ip-lista/ip-lista.component';
import { IPDetalleComponent } from './info-persona/ip-detalle/ip-detalle.component';
import { ComponentsModule } from '@shared/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DatosEmpresaComponent } from './info-empresa/ie-detalle/datos-empresa/datos-empresa.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AntecedentesComponent } from './info-empresa/ie-detalle/antecedentes/antecedentes.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { RamoComponent } from './info-empresa/ie-detalle/ramo/ramo.component';
import { MatListModule } from '@angular/material/list';
import { FinanzasComponent } from './info-empresa/ie-detalle/finanzas/finanzas.component';
import { OpinionCreditoComponent } from './info-empresa/ie-detalle/opinion-credito/opinion-credito.component';
import { SharedModule } from '@shared';
import { SbsRiesgoComponent } from './info-empresa/ie-detalle/sbs-riesgo/sbs-riesgo.component';
import { DetalleProveedorComponent } from './info-empresa/ie-detalle/sbs-riesgo/detalle-proveedor/detalle-proveedor.component';

@NgModule({
  declarations: [
    IEListaComponent,
    IEDetalleComponent,
    IPListaComponent,
    IPDetalleComponent,
    DatosEmpresaComponent,
    AntecedentesComponent,
    RamoComponent,
    FinanzasComponent,
    OpinionCreditoComponent,
    SbsRiesgoComponent,
    DetalleProveedorComponent,
  ],
  imports: [
    CommonModule,
    InformeRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    SharedModule
  ]
})
export class InformeModule { }
