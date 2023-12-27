import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comercio',
  templateUrl: './dialog-comercio.component.html',
  styleUrls: ['./dialog-comercio.component.scss']
})
export class DialogComercioComponent implements OnInit{
  titulo = ""
  porcentaje = ""
  comentario = ""
  comentarioEng = ""

  constructor(public dialogRef: MatDialogRef<DialogComercioComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {
    if(data){
      this.titulo = data.titulo
      this.porcentaje = data.porcentaje
      this.comentario = data.comentario
      this.comentarioEng = data.comentarioEng
    }
  }
  ngOnInit(): void {

  }
  cerrar(){
    this.dialogRef.close()
  }
  guardar(){
    this.dialogRef.close({
      porcentaje : this.porcentaje,
      comentario : this.comentario,
      comentarioEng : this.comentarioEng
    })
  }
}
