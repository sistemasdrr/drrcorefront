import { RamoNegocio } from 'app/models/ramo-negocio';
import { RamoNegocioService } from 'app/services/ramo-negocio.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ramo-actividad-dialog',
  templateUrl: './ramo-actividad.component.html',
  styleUrls: ['./ramo-actividad.component.scss']
})
export class RamoActividadDialogComponent {
  buscar : string =''
  buscarRamo : string = ''
  ramos : RamoNegocio[] = []
  idRamoSeleccionado : string = ''
  nombreRamoSeleccionado : string = ''
  actividades: string[] = []
  actividadesSeleccionadas : string[] = []

   //ENVIO DE COMENTARIO
   @Output()
   eventSelectAbonado = new EventEmitter<string[]>();

  constructor(public dialogRef: MatDialogRef<RamoActividadDialogComponent>,private ramoNegocioService :RamoNegocioService){
    this.ramos = this.ramoNegocioService.getRamoNegocio()
  }
  select(act : string){
    const index = this.actividades.indexOf(act);
    if (index !== -1) {
      this.actividades.splice(index, 1);
      this.actividadesSeleccionadas.push(act);
      console.log(this.actividadesSeleccionadas)
    }
  }
  deselect(act : string){
    const index = this.actividadesSeleccionadas.indexOf(act);
    if (index !== -1) {
      this.actividadesSeleccionadas.splice(index, 1);
      this.actividades.push(act);
      console.log(this.actividades)
    }
  }
  get filtrar(): string[] {
    return this.actividades.filter(act =>
      act.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }
  get filtrarRamo(): RamoNegocio[] {
    return this.ramos.filter(act =>
      act.nombre.toLowerCase().includes(this.buscarRamo.toLowerCase())
    );
  }
  selectRamo(id: string, nombre : string){
    const sel1 = document.getElementById(id+'-'+nombre);
    if(sel1) {
      sel1.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      sel1.style.color = 'white'
    }
    if (this.idRamoSeleccionado !== '') {
      const sel2 = document.getElementById(this.idRamoSeleccionado+'-'+this.nombreRamoSeleccionado);
      if (sel2) {
        sel2.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        sel2.style.color = 'black'
      }
    }

    this.actividadesSeleccionadas = []
    const ramo = this.ramos.find(ramo => ramo.id === id);
    if (ramo) {
      this.actividades = [...ramo.actividades];
    } else {
      this.actividades = [];
    }
    this.idRamoSeleccionado = id
    this.nombreRamoSeleccionado = nombre
  }
}