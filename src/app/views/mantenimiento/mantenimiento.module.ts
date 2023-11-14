import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { ListaComponent } from './personal/lista/lista.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { DetalleComponent } from './personal/detalle/detalle.component';
import { AgregarEssaludComponent } from './personal/detalle/agregar-essalud/agregar-essalud.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MantenedorComponent } from './mantenedor/mantenedor.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent,
    AgregarEssaludComponent,
    MantenedorComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    ComponentsModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxDropzoneModule,
    MatSortModule
  ],
  providers: [provideNgxMask()],

})
export class MantenimientoModule { }
