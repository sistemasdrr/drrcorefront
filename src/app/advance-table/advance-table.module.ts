import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvanceTableRoutingModule } from './advance-table-routing.module';
import { AdvanceTableComponent } from './advance-table.component';
import { FormDialogComponent as advanceTableForm } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { AdvanceTableService } from './advance-table.service';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AdvanceTableComponent,
    advanceTableForm,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdvanceTableRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [AdvanceTableService],
})
export class AdvanceTableModule {}
