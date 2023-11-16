import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-calidad',
  templateUrl: './seleccionar-calidad.component.html',
  styleUrls: ['./seleccionar-calidad.component.scss']
})
export class SeleccionarCalidadComponent implements OnInit {
  panelOpenState = false;

  constructor( public dialogRef: MatDialogRef<SeleccionarCalidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

  }

  ngOnInit(): void {

  }

  volver(){
    this.dialogRef.close()
  }
  seleccionarCalidad(calidad : string){
    this.dialogRef.close({
      calidad : calidad
    })
  }
}
