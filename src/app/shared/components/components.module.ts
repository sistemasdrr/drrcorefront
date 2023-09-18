import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { BuscarAbonadoDialogComponent } from "./buscar-abonado-dialog/buscar-abonado-dialog.component";
import {MatRadioModule} from '@angular/material/radio';
import { BuscarEmpresaDialogComponent } from './buscar-empresa-dialog/buscar-empresa-dialog.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
  ],
  imports: [
    SharedModule,
    MatRadioModule
  ],
  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent
  ],
})
export class ComponentsModule {}
