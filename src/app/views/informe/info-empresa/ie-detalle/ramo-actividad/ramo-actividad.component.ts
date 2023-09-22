import { RamoNegocio } from 'app/models/ramo-negocio';
import { RamoNegocioService } from './../../../../../services/ramo-negocio.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ramo-actividad',
  templateUrl: './ramo-actividad.component.html',
  styleUrls: ['./ramo-actividad.component.scss']
})
export class RamoActividadComponent {
  buscar : string =''
  buscarRamo : string = ''
  ramos : RamoNegocio[] = []
  actividades: string[] = []
  actividadesSeleccionadas : string[] = []

  constructor(private ramoNegocioService :RamoNegocioService){
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
      act.nombre.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }
  selectRamo(id: string){
    this.actividadesSeleccionadas = []
    const ramo = this.ramos.find(ramo => ramo.id === id);
    if (ramo) {
      this.actividades = [...ramo.actividades];
    } else {
      this.actividades = [];
    }
  }
}
