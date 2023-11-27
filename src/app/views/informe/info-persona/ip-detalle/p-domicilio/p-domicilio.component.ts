import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-p-domicilio',
  templateUrl: './p-domicilio.component.html',
  styleUrls: ['./p-domicilio.component.scss']
})
export class PDomicilioComponent {

  constructor(
    public dialog: MatDialog) {
  }

  viviendaPropiaInforme = ""
  valorInforme = ""
  valorIngInforme = ""
  domicilioInforme = ""
  domicilioIngInforme = ""

  selectViviendaPropia(viviendaPropiaInforme : string){
    this.viviendaPropiaInforme = viviendaPropiaInforme
  }
  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      disableClose: true,
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        comentario_es : comentario_es,
        comentario_en : comentario_en
        },
      });
  }
}
