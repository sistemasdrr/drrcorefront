import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-opinion-credito',
  templateUrl: './opinion-credito.component.html',
  styleUrls: ['./opinion-credito.component.scss']
})
export class OpinionCreditoComponent implements OnInit {
  checkSolicitudCredito : boolean = false
  creditoConsultado = ""
  creditoConsultadoIng = ""
  creditoSugerido = ""
  creditoSugeridoIng = ""
  comentarioAnotado = ""
  comentarioAnotadoIng = ""
  comentarioAnterior = ""

  constructor(
    private dialog : MatDialog
  ){

  }

  ngOnInit(): void {

  }

  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en
        },
      });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'creditoConsultado':
          this.creditoConsultado = data.comentario_es;
          this.creditoConsultadoIng = data.comentario_en;
          break
          case 'creditoSugerido':
          this.creditoSugerido = data.comentario_es;
          this.creditoSugeridoIng = data.comentario_en;
          break
        }
      }
    });
  }
  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'textarea',
        comentario_es : comentario_es,
        comentario_en : comentario_en
        },
      });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'comentarioAnotado':
          this.comentarioAnotado = data.comentario_es;
          this.comentarioAnotadoIng = data.comentario_en;
          break

        }
      }
    });
  }
  titulo = 'Comentario - Traduccion'
  tituloCreditoConsultado = 'Crédito Consultado'
  tituloCreditoSugerido = 'Crédito Sugerido'
  tituloComentario = 'Comentario Acorde a lo Anotado '
}
