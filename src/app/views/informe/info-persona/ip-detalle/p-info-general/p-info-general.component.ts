import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-p-info-general',
  templateUrl: './p-info-general.component.html',
  styleUrls: ['./p-info-general.component.scss']
})
export class PInfoGeneralComponent {
  informacionGeneral = ""
  informacionIngGeneral = ""

  constructor(
    private dialog : MatDialog
  ){

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
