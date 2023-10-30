import { Actividad, RamoNegocio } from 'app/models/informes/ramo-negocio';
import { RamoNegocioService } from 'app/services/informes/ramo-negocio.service';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarEditarRamoNegocioComponent } from './agregar-editar/agregar-editar.component';

@Component({
  selector: 'app-ramo-actividad-dialog',
  templateUrl: './ramo-actividad.component.html',
  styleUrls: ['./ramo-actividad.component.scss']
})
export class RamoActividadDialogComponent {
  buscar : string =''
  buscarRamo : string = ''

  ramoNegocios : RamoNegocio[] = []

  idRamoSeleccionado : number = 0
  nombreRamoSeleccionado : string = ""

  listaActividades: Actividad[] = []
  actividadesSeleccionadas : Actividad[] = []


   //ENVIO DE COMENTARIO
   @Output()
   eventSelectRamo = new EventEmitter<{
    ramoNegocio : string,
    actividades : Actividad[]
   }>();

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarRamoNegocioComponent>,
    private ramoNegocioService : RamoNegocioService,
    private dialog : MatDialog
    ){
    this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
  }
  selectRamo(idRamo : number, nombreRamo : string){
      this.idRamoSeleccionado = idRamo
      this.nombreRamoSeleccionado = nombreRamo
      this.listaActividades = this.ramoNegocioService.getActividadByRamoId(idRamo)
  }


  get filtrarActividad(): Actividad[] {
    return this.listaActividades.filter(act =>
      act.nombre.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }
  get filtrarRamo(): RamoNegocio[] {
    return this.ramoNegocios.filter(act =>
      act.nombre.toLowerCase().includes(this.buscarRamo.toLowerCase())
    );
  }

  mostrarActividades(){

  }

  selectActividad(idActividad : number){
    const selActividad = this.listaActividades.filter(x => x.id == idActividad)[0]
    this.listaActividades = this.listaActividades.filter(x => x.id !== idActividad)
    this.actividadesSeleccionadas.push(selActividad)
  }
  deselectActividad(idActividad : number){
    const deselActividad = this.actividadesSeleccionadas.filter(x => x.id == idActividad)[0]
    this.actividadesSeleccionadas = this.actividadesSeleccionadas.filter(x => x.id !== idActividad)
    this.listaActividades.push(deselActividad)
  }

  dialogRamo(){
    const dialogRef1 = this.dialog.open(AgregarEditarRamoNegocioComponent, {
      data: {
        accion : "RAMO",
      },
    });
    dialogRef1.afterClosed().subscribe(() => {
      this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
      this.listaActividades = []
      this.actividadesSeleccionadas = []
    });
  }

  dialogActividad(){
    const dialogRef2 = this.dialog.open(AgregarEditarRamoNegocioComponent, {
      data: {
        accion : "ACTIVIDAD",
      },
    });
    dialogRef2.afterClosed().subscribe(() => {
      this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
      this.listaActividades = []
      this.actividadesSeleccionadas = []
    });
  }


  guardar(){
    const data = {
      ramoNegocio : this.nombreRamoSeleccionado,
      actividades : this.actividadesSeleccionadas
    };
    this.eventSelectRamo.emit(data);
    this.dialogRef.close()
  }
  salir(){
    this.dialogRef.close()
  }
}
