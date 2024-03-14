import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { InformeRoutingModule } from './informe-routing.module';
import { IEListaComponent } from './info-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './info-empresa/ie-detalle/ie-detalle.component';
import { IPListaComponent } from './info-persona/ip-lista/ip-lista.component';
import { IPDetalleComponent } from './info-persona/ip-detalle/ip-detalle.component';
import { ComponentsModule } from '@shared/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DatosEmpresaComponent } from './info-empresa/ie-detalle/e-datos-empresa/datos-empresa.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AntecedentesComponent } from './info-empresa/ie-detalle/e-antecedentes/antecedentes.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { RamoComponent } from './info-empresa/ie-detalle/e-ramo/ramo.component';
import { RamoActividadDialogComponent } from './info-empresa/ie-detalle/e-ramo/ramo-actividad/ramo-actividad.component';
import { MatListModule } from '@angular/material/list';
import { FinanzasComponent } from './info-empresa/ie-detalle/e-finanzas/finanzas.component';
import { OpinionCreditoComponent } from './info-empresa/ie-detalle/e-opinion-credito/opinion-credito.component';
import { SharedModule } from '@shared';
import { SbsRiesgoComponent } from './info-empresa/ie-detalle/e-sbs-riesgo/sbs-riesgo.component';
import { DetalleProveedorComponent } from './info-empresa/ie-detalle/e-sbs-riesgo/detalle-proveedor/detalle-proveedor.component';
import { MorosidadComercialComponent } from './info-empresa/ie-detalle/e-sbs-riesgo/morosidad-comercial/morosidad-comercial.component';
import { DeudaBancariaComponent } from './info-empresa/ie-detalle/e-sbs-riesgo/deuda-bancaria/deuda-bancaria.component';
import { HistoricoVentasComponent } from './info-empresa/ie-detalle/e-finanzas/historico-ventas/historico-ventas.component';
import { HistoricoPedidosComponent } from './info-empresa/ie-detalle/e-datos-empresa/historico-pedidos/historico-pedidos.component';
import { EmpresasRelacionadasComponent } from './info-empresa/ie-detalle/e-antecedentes/empresas-relacionadas/empresas-relacionadas.component';
import { InformacionGeneralComponent } from './info-empresa/ie-detalle/e-informacion-general/informacion-general.component';
import { ImagenesComponent } from './info-empresa/ie-detalle/e-imagenes/imagenes.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BalanceComponent } from './info-empresa/ie-detalle/e-balance/balance.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { NgxGaugeModule } from 'ngx-gauge';
import { BalanceSituacionalComponent } from './info-empresa/ie-detalle/e-finanzas/balance-situacional/balance-situacional.component';
import { PDatosPersonaComponent } from './info-persona/ip-detalle/p-datos-persona/p-datos-persona.component';
import { PDomicilioComponent } from './info-persona/ip-detalle/p-domicilio/p-domicilio.component';
import { POtrasActividadesComponent } from './info-persona/ip-detalle/p-otras-actividades/p-otras-actividades.component';
import { PPropiedadesComponent } from './info-persona/ip-detalle/p-propiedades/p-propiedades.component';
import { PSbsRiesgoComponent } from './info-persona/ip-detalle/p-sbs-riesgo/p-sbs-riesgo.component';
import { PImagenesComponent } from './info-persona/ip-detalle/p-imagenes/p-imagenes.component';
import { PInfoGeneralComponent } from './info-persona/ip-detalle/p-info-general/p-info-general.component';
import { PHistoriaComponent } from './info-persona/ip-detalle/p-historia/p-historia.component';
import { PDetalleProveedorComponent } from './info-persona/ip-detalle/p-sbs-riesgo/p-detalle-proveedor/p-detalle-proveedor.component';
import { PMorosidadComercialComponent } from './info-persona/ip-detalle/p-sbs-riesgo/p-morosidad-comercial/p-morosidad-comercial.component';
import { PDeudaBancariaComponent } from './info-persona/ip-detalle/p-sbs-riesgo/p-deuda-bancaria/p-deuda-bancaria.component';
import { PTrabajoComponent } from './info-persona/ip-detalle/p-trabajo/p-trabajo.component';
import { CapitalPagadoComponent } from './info-empresa/ie-detalle/e-antecedentes/capital-pagado/capital-pagado.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SeleccionarCalidadComponent } from './info-empresa/ie-detalle/e-datos-empresa/seleccionar-calidad/seleccionar-calidad.component';
import { AvalesComponent } from './info-empresa/ie-detalle/e-sbs-riesgo/avales/avales.component';
import { DialogComercioComponent } from './info-empresa/ie-detalle/e-ramo/dialog-comercio/dialog-comercio.component';
import { ListaEmpresasComponent } from './info-empresa/ie-detalle/e-antecedentes/lista-empresas/lista-empresas.component';
import { AgregarEditarRamoNegocioComponent } from './info-empresa/ie-detalle/e-ramo/ramo-actividad/agregar-editar/agregar-editar.component';
import { MatSortModule } from '@angular/material/sort';
import { SociosEmpresaComponent } from './info-empresa/ie-lista/socios-empresa/socios-empresa.component';
import { AgregarSocioComponent } from './info-empresa/ie-lista/socios-empresa/agregar-socio/agregar-socio.component';
import { SeleccionarPersonaComponent } from './info-empresa/ie-lista/socios-empresa/agregar-socio/seleccionar-persona/seleccionar-persona.component';
import { AgregarAccionistaComponent } from './info-empresa/ie-lista/socios-empresa/agregar-accionista/agregar-accionista.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SociosPersonaComponent } from './info-persona/ip-lista/socios-persona/socios-persona.component';
import { AgregarSocioPersonaComponent } from './info-persona/ip-lista/socios-persona/agregar-socio/agregar-socio.component';
import { AgregarHistorialTrabajadorComponent } from './info-empresa/ie-detalle/e-ramo/agregar-historial-trabajador/agregar-historial-trabajador.component';
import { ExportF1Component } from './info-empresa/ie-lista/export-f1/export-f1.component';
import { ImageEditorEComponent } from './info-persona/ip-detalle/p-imagenes/image-editor/image-editor.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { ImageEditorComponent } from './info-empresa/ie-detalle/e-imagenes/image-editor/image-editor.component';

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
    PDetalleProveedorComponent,
    PMorosidadComercialComponent,
    PDeudaBancariaComponent,
    HistoricoVentasComponent,
    HistoricoPedidosComponent,
    EmpresasRelacionadasComponent,
    InformacionGeneralComponent,
    ImagenesComponent,
    BalanceComponent,
    BalanceSituacionalComponent,
    PDatosPersonaComponent,
    PDomicilioComponent,
    POtrasActividadesComponent,
    PPropiedadesComponent,
    PSbsRiesgoComponent,
    PImagenesComponent,
    PInfoGeneralComponent,
    PHistoriaComponent,
    PTrabajoComponent,
    CapitalPagadoComponent,
    SeleccionarCalidadComponent,
    AvalesComponent,
    DialogComercioComponent,
    ListaEmpresasComponent,
    RamoComponent,
    RamoActividadDialogComponent,
    AgregarEditarRamoNegocioComponent,
    SociosEmpresaComponent,
    AgregarSocioComponent,
    SeleccionarPersonaComponent,
    AgregarAccionistaComponent,
    SociosPersonaComponent,
    AgregarSocioPersonaComponent,
    AgregarHistorialTrabajadorComponent,
    ExportF1Component,
    ImageEditorEComponent,
    ImageEditorComponent
  ],
  imports: [
    CommonModule,
    InformeRoutingModule,
    ComponentsModule,
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
    ClipboardModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxGaugeModule,
    CKEditorModule,
    MatSortModule,
    NgApexchartsModule,
    AngularCropperjsModule,
    ImageCropperModule

  ],
  exports: [
    ListaEmpresasComponent
  ],
  providers: [provideNgxMask()],
})
export class InformeModule { }
