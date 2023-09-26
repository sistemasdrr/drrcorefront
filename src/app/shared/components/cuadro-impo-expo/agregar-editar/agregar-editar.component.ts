import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImpoExpoData } from '../cuadro-impo-expo.component';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss']
})
export class AgregarEditarComponent {
  accion = ""
  anio = ""
  monto = ""
  titulo = ""

  @Output()
  eventSelectAbonado = new EventEmitter<ImpoExpoData>();

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accion = data.accion;
    if(this.accion == "AGREGAR"){
      this.titulo = "Agregar"
      this.anio = ""
      this.monto = ""
    }else{
      this.anio = data.anio;
      this.monto = data.monto;
      this.titulo = "Editar"
    }

  }
  agregarEditar(anio : string, monto : string){
    this.dialogRef.close({
      anio : anio,
      monto : monto
  })
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
