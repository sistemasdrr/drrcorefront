import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboData } from 'app/models/combo';
import { TipoVinculo } from 'app/models/mantenimiento/personal';
import { ComboService } from 'app/services/combo.service';
import { PersonalService } from 'app/services/mantenimiento/personal.service';

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

  tiposVinculo : ComboData[] = []

  constructor(public dialogRef: MatDialogRef<AgregarEssaludComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personalService : PersonalService,
    private comboService : ComboService){
      if(data){
        this.idPersonal = data
      }
  }

  ngOnInit(): void {
    this.comboService.getVinculoFamiliar().subscribe(response => {
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
