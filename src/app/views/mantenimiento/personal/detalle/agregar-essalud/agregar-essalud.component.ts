import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-essalud',
  templateUrl: './agregar-essalud.component.html',
  styleUrls: ['./agregar-essalud.component.scss']
})
export class AgregarEssaludComponent implements OnInit {
  title = ""
  nombreCompleto = ""
  tipoVinculo = ""
  documentoIdentidad = ""

  constructor(public dialogRef: MatDialogRef<AgregarEssaludComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }

  ngOnInit(): void {

  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
