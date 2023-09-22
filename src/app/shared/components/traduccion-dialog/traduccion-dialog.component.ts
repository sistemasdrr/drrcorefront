
import { Component, Inject, Output, EventEmitter,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DialogData, TraduccionData } from 'app/models/dialog-data';

@Component({
  selector: 'app-traduccion-dialog',
  templateUrl: './traduccion-dialog.component.html',
  styleUrls: ['./traduccion-dialog.component.scss']
})
export class TraduccionDialogComponent{

  empresa : string = ''
  //ENVIO DE COMENTARIO
  @Output()
  eventSelectAbonado = new EventEmitter<string>();
  comentario_es : string = ""
  comentario_en : string = ""

  titulo1 : string
  titulo2 : string
  subtitulo : string
  constructor(
    public dialogRef: MatDialogRef<TraduccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TraduccionData) {
      console.log(data)
    this.titulo1 = this.data.titulo1
    this.titulo2 = this.data.titulo2
    this.subtitulo = this.data.subtitulo
    this.empresa = this.data.empresa
  }
  realizarEnvioCodigo() {
    this.dialogRef.close({
      comentario_es: this.comentario_es,
      comentario_en: this.comentario_en,
     });
  }

  //CKEDITOR
  public Editor: any = ClassicEditor;

}
