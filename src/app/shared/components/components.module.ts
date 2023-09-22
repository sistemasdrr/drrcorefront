import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { BuscarAbonadoDialogComponent } from "./buscar-abonado-dialog/buscar-abonado-dialog.component";
import {MatRadioModule} from '@angular/material/radio';
import { BuscarEmpresaDialogComponent } from './buscar-empresa-dialog/buscar-empresa-dialog.component';
import { AdjuntarArchivosComponent } from './adjuntar-archivos/adjuntar-archivos.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TraduccionDialogComponent } from './traduccion-dialog/traduccion-dialog.component';
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { RamoActividadDialogComponent } from "./ramo-actividad/ramo-actividad.component";

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    AdjuntarArchivosComponent,
    ComentarioComponent,
    TraduccionDialogComponent,
    RamoActividadDialogComponent
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsModule,
    CKEditorModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    ComentarioComponent,
    AdjuntarArchivosComponent,
    RamoActividadDialogComponent
  ],
})
export class ComponentsModule {}
