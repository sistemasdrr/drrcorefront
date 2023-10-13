import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-opinion-credito',
  templateUrl: './opinion-credito.component.html',
  styleUrls: ['./opinion-credito.component.scss']
})
export class OpinionCreditoComponent {
  checkSolicitudCredito : boolean = false
  creditoConsultado = ""
  creditoSugerido = ""
  comentario = ""
  comentarioAnterior = ""

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
  titulo = 'Comentario - Traduccion'
  tituloCreditoConsultado = 'Crédito Consultado => '
  tituloCreditoSugerido = 'Crédito Sugerido => '
  tituloComentario = 'Comentario Acorde a lo Anotado => '
}
