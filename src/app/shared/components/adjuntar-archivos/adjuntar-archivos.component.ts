import { AttachmentService } from './../../../services/attachment.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Attachment } from 'app/models/attachment';
import { DialogData } from 'app/models/dialog-data';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent {
  //TABLA
  dataSource: MatTableDataSource<Attachment>;
  displayColumn : string[] = ['position','name', 'path', 'type', 'accion']

  cupon: string = "";

  constructor(public dialogRef: MatDialogRef<AdjuntarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private attachmentService : AttachmentService
  ) {
    console.log(dialogData);
    this.cupon = dialogData.data;
    this.dataSource = new MatTableDataSource(this.attachmentService.getAttachmentsByCupon(dialogData.data))
  }
}
