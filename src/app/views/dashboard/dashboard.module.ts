import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashSupervisorComponent } from './dash-supervisor/dash-supervisor.component';
import { DashDigitadorComponent } from './dash-digitador/dash-digitador.component';


@NgModule({
  declarations: [
    DashAdminComponent,
    DashSupervisorComponent,
    DashDigitadorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
