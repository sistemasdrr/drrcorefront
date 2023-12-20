import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { AttachmentService } from 'app/services/attachment.service';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.scss']
})
export class InformacionGeneralComponent implements OnInit {
  informacionGeneral = "";
  informacionIngGeneral = "";

  constructor(
    private dialog : MatDialog,
    private api : AttachmentService
  ){

  }

  ngOnInit(): void {

  }

  agregarComentario(titulo1 : string, titulo2 : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo1 : titulo1,
        titulo2 : titulo2,
        subtitulo : subtitulo,
        empresa: empresa,
        },
      });
  }
}
