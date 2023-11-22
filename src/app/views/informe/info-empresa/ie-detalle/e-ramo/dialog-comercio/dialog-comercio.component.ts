import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comercio',
  templateUrl: './dialog-comercio.component.html',
  styleUrls: ['./dialog-comercio.component.scss']
})
export class DialogComercioComponent implements OnInit{
  title = ""
  monto = ""
  plazos = ""
  observacion = ""
  observacionIng = ""

  constructor(public dialogRef: MatDialogRef<DialogComercioComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {
    if(data){
      this.title = data.titulo
      this.monto = data.monto
      this.plazos = data.plazos
      this.observacion = data.observacion
      this.observacionIng = data.observacionIng
    }
  }
  ngOnInit(): void {

  }
  cerrar(){
    this.dialogRef.close()
  }
  guardar(){

  }
}
