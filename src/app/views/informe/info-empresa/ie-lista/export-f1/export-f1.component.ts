import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-export-f1',
  templateUrl: './export-f1.component.html',
  styleUrls: ['./export-f1.component.scss']
})
export class ExportF1Component implements OnInit {
  titulo = "Generar F1 de la Empresa"
  idCompany = 0
  idioma = "E"
  formato = "PDF"

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ExportF1Component>) {
    if(data){
      this.idCompany = data.idCompany
      console.log(this.idCompany)
    }
  }

  ngOnInit(): void {
  }
  descargarDocumento(){

  }
  cerrar(){
    this.dialogRef.close()
  }
}
