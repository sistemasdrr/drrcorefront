import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { BuscarAbonadoDialogComponent } from "./buscar-abonado-dialog/buscar-abonado-dialog.component";
import {MatRadioModule} from '@angular/material/radio';
import { BuscarEmpresaDialogComponent } from './buscar-empresa-dialog/buscar-empresa-dialog.component';
import { AdjuntarArchivosComponent } from './adjuntar-archivos/adjuntar-archivos.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    AdjuntarArchivosComponent,
    ComentarioComponent,
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    BuscarAbonadoDialogComponent,
    BuscarEmpresaDialogComponent,
    ComentarioComponent,
    AdjuntarArchivosComponent
  ],
})
export class ComponentsModule {}
