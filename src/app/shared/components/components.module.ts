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
import { CuadroImpoExpoComponent } from './cuadro-impo-expo/cuadro-impo-expo.component';
import { AgregarEditarComponent } from './cuadro-impo-expo/agregar-editar/agregar-editar.component';
import { AgregarEditarRamoNegocioComponent } from './ramo-actividad/agregar-editar/agregar-editar.component';
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    AdjuntarArchivosComponent,
    ComentarioComponent,
    TraduccionDialogComponent,
    RamoActividadDialogComponent,
    CuadroImpoExpoComponent,
    AgregarEditarComponent,
    AgregarEditarRamoNegocioComponent,
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsModule,
    CKEditorModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ],
  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    ComentarioComponent,
    RamoActividadDialogComponent,
    CuadroImpoExpoComponent,
    TraduccionDialogComponent,
    AgregarEditarRamoNegocioComponent,
    AgregarEditarComponent,

  ],
})
export class ComponentsModule {}
