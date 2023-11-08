import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalService, data } from 'app/services/mantenimiento/personal.service';

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

  tiposVinculo : data[] = []

  constructor(public dialogRef: MatDialogRef<AgregarEssaludComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private personalService : PersonalService){

  }

  ngOnInit(): void {
    this.personalService.getVinculoFamiliar().subscribe(data => {
      if(data.isSuccess == true){
        this.tiposVinculo = data.data;
      }
    });
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
