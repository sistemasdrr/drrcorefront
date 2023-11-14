import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoVinculo } from 'app/models/mantenimiento/persona/personal';
import { PersonalService, data } from 'app/services/mantenimiento/personal.service';

@Component({
  selector: 'app-agregar-essalud',
  templateUrl: './agregar-essalud.component.html',
  styleUrls: ['./agregar-essalud.component.scss']
})
export class AgregarEssaludComponent implements OnInit {
  title = ""
  idPersonal = 0
  nombreCompleto = ""
  tipoVinculo : TipoVinculo = {
    id : 0,
    valor : ''
  }
  documentoIdentidad = ""

  tiposVinculo : data[] = []

  constructor(public dialogRef: MatDialogRef<AgregarEssaludComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private personalService : PersonalService){
      if(data){
        this.idPersonal = data
      }
  }

  ngOnInit(): void {
    this.personalService.getVinculoFamiliar().subscribe(response => {
      if(response.isSuccess == true){
        this.tiposVinculo = response.data;
      }
    });
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
  agregarDerechoHabiente(){
    this.dialogRef.close({
      nameHolder : this.nombreCompleto,
      idFamilyBondType : this.tipoVinculo.id,
      valueFamilyBondType : this.tipoVinculo.valor,
      documentNumber : this.documentoIdentidad
    })
  }
}
