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
import { MorosidadComercialComponent } from './info-empresa/ie-detalle/sbs-riesgo/morosidad-comercial/morosidad-comercial.component';
import { DeudaBancariaComponent } from './info-empresa/ie-detalle/sbs-riesgo/deuda-bancaria/deuda-bancaria.component';
import { HistoricoVentasComponent } from './info-empresa/ie-detalle/finanzas/historico-ventas/historico-ventas.component';
import { HistoricoPedidosComponent } from './info-empresa/ie-detalle/datos-empresa/historico-pedidos/historico-pedidos.component';
import { EmpresasRelacionadasComponent } from './info-empresa/ie-detalle/antecedentes/empresas-relacionadas/empresas-relacionadas.component';
import { InformacionGeneralComponent } from './info-empresa/ie-detalle/informacion-general/informacion-general.component';
import { ImagenesComponent } from './info-empresa/ie-detalle/imagenes/imagenes.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BalanceComponent } from './info-empresa/ie-detalle/balance/balance.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

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
    MorosidadComercialComponent,
    DeudaBancariaComponent,
    HistoricoVentasComponent,
    HistoricoPedidosComponent,
    EmpresasRelacionadasComponent,
    InformacionGeneralComponent,
    ImagenesComponent,
    BalanceComponent,
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
    SharedModule,
    NgxDropzoneModule,
    ClipboardModule
  ]
})
export class InformeModule { }
