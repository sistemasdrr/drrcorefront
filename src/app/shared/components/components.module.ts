import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent,SearchDialogComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, SearchDialogComponent],
})
export class ComponentsModule {}
