import { RamoNegocioService } from 'app/services/ramo-negocio.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad, RamoNegocio } from 'app/models/ramo-negocio';

@Component({
  selector: 'app-agregar-editar-ramo-negocio',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss']
})
export class AgregarEditarRamoNegocioComponent {
  titulo = ""
  accion = ""
  columnasR : string[] = ['nombre','nombreIng','enable']
  datosR : RamoNegocio[] = []
  datosA : Actividad[] = []
  dataSourceR : MatTableDataSource<RamoNegocio>
  dataSourceA : MatTableDataSource<Actividad>
  constructor(
    public dialogRef: MatDialogRef<AgregarEditarRamoNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ramoNegocioService : RamoNegocioService
  ) {
    this.datosR = this.ramoNegocioService.getRamoNegocio()
    this.datosR.forEach(data => {
      this.datosA = data.actividades
    });
    this.dataSourceR = new MatTableDataSource(this.datosR)
    this.dataSourceA = new MatTableDataSource(this.datosA)

    this.accion = data.accion
    if(data.accion == 'RAMO'){
      this.titulo = "Ramo de Negocio"
    }else{
      this.titulo = "Actividades Especifica"
    }
  }

  //RAMA
  buscarRamo : string = ''

  get filtrarRamo(): RamoNegocio[] {
    return this.datosR.filter(act =>
      act.nombre.toLowerCase().includes(this.buscarRamo.toLowerCase())
    );
  }





  //ACTIVIDAD





}
