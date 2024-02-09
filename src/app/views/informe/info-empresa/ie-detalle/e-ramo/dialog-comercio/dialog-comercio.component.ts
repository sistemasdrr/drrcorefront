import { Component, Inject, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comercio',
  templateUrl: './dialog-comercio.component.html',
  styleUrls: ['./dialog-comercio.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
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
