import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaSituacionComponent } from './lista/lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { SituacionRoutingModule } from './situacion-routing.module';
import { HistorialComponent } from './historial/historial.component';


@NgModule({
  declarations: [
    ListaSituacionComponent,
    HistorialComponent
  ],
  imports: [
    SituacionRoutingModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class SituacionModule { }
