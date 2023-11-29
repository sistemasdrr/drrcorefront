import { Actividad, RamoNegocio } from 'app/models/informes/ramo-negocio';
import { RamoNegocioService } from 'app/services/informes/ramo-negocio.service';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarEditarRamoNegocioComponent } from './agregar-editar/agregar-editar.component';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-ramo-actividad-dialog',
  templateUrl: './ramo-actividad.component.html',
  styleUrls: ['./ramo-actividad.component.scss']
})
export class RamoActividadDialogComponent implements OnInit {
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

  @ViewChild('ramo') ramo! : MatSelectionList

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarRamoNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private ramoNegocioService : RamoNegocioService,
    private dialog : MatDialog
  ){
  }
  ngOnInit(): void {
    this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
    if(this.data.ramoNegocio != ''){
      const ramo = this.ramoNegocioService.getAllRamoNegocio().filter(x => x.nombre == this.data.ramoNegocio)[0]
      this.seleccionado = ramo.id
      this.nombreRamoSeleccionado = this.data.ramoNegocio
      this.listaActividades = this.ramoNegocioService.getActividadByRamoId(ramo.id);
      if(this.data.actividadEspecifica != ''){
        const lista = this.data.actividadEspecifica.split('-')
        lista.forEach((actividad : string)=> {
          this.actividadesSeleccionadas.push(this.ramoNegocioService.getAllActividad().filter(x => x.nombre == actividad.trim())[0])
        });
      }
    }

  }
  verificar(actividad : Actividad) : boolean{
    const index = this.actividadesSeleccionadas.findIndex(a => a.id === actividad.id);
    if (index !== -1) {
      return true
    }else{
      return false
    }
  }
  selectRamo(idRamo: number, nombreRamo: string) {
    this.idRamoSeleccionado = idRamo;
    this.nombreRamoSeleccionado = nombreRamo;
    this.actividadesSeleccionadas = [];
    this.listaActividades = this.ramoNegocioService.getActividadByRamoId(idRamo);
    this.seleccionado = idRamo;

  }
  seleccionado: number | null = null;

  seleccionarItem(id: number) {
    if (this.seleccionado === id) {
      this.seleccionado = null;
    } else {
      this.seleccionado = id;
    }
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

  selectActividad(actividad : Actividad){
    const index = this.actividadesSeleccionadas.findIndex(a => a.id === actividad.id);
    if (index !== -1) {
      this.actividadesSeleccionadas.splice(index, 1);
    } else {
      this.actividadesSeleccionadas.push(actividad);
    }
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
    this.dialogRef.close({
      ramoNegocio : this.nombreRamoSeleccionado,
      actividades : this.actividadesSeleccionadas
    })
  }
  salir(){
    this.dialogRef.close()
  }
}
