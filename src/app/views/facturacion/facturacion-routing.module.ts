import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionAgenteComponent } from './facturacion-agente/facturacion-agente.component';
import { FacturacionMensualComponent } from './facturacion-abonado/facturacion-mensual/facturacion-mensual.component';
import { FacturacionConCuponesComponent } from './facturacion-abonado/facturacion-con-cupones/facturacion-con-cupones.component';

const routes: Routes = [
  {
    path: 'abonado/mensual',
    component: FacturacionMensualComponent,
    data: { title: 'Facturación Mensual de Abonado - DRR Core V1' }
  },
  {
    path: 'abonado/con-cupones',
    component: FacturacionConCuponesComponent,
    data: { title: 'Facturación Con Cupones de Abonado - DRR Core V1' }
  },
  {
    path: 'agente',
    component: FacturacionAgenteComponent,
    data: { title: 'Facturación de Agente - DRR Core V1' }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
