import { Actividad } from 'app/models/informes/ramo-negocio';
import { RamoNegocioService } from 'app/services/informes/ramo-negocio.service';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarEditarRamoNegocioComponent } from './agregar-editar/agregar-editar.component';
import { MatSelectionList } from '@angular/material/list';
import { ComboData } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';

@Component({
  selector: 'app-ramo-actividad-dialog',
  templateUrl: './ramo-actividad.component.html',
  styleUrls: ['./ramo-actividad.component.scss']
})
export class RamoActividadDialogComponent implements OnInit {
  buscar : string =''
  buscarRamo : string = ''


  idBusinessBranch : number = 0
  specificActivities = ""

  listaRamoNegocio : ComboData[] = []
  listaActividades: ComboData[] = []
  actividadesSeleccionadas : ComboData[] = []

  @ViewChild('ramo') ramo! : MatSelectionList

  constructor(public dialogRef: MatDialogRef<AgregarEditarRamoNegocioComponent>, @Inject(MAT_DIALOG_DATA) public data : any,
    private ramoNegocioService : RamoNegocioService,private dialog : MatDialog, private comboService : ComboService
  ){
    if(data){
      this.idBusinessBranch = data.idBusinessBranch
      this.seleccionado = this.idBusinessBranch
      this.specificActivities = data.specificActivities
    }
    console.log(data)
  }
  ngOnInit(): void {
    this.comboService.getRamoNegocio().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaRamoNegocio = response.data
        }
      }
    ).add(
      () => {
        if(this.idBusinessBranch !== 0){
          this.comboService.getActividadesEspecificas(this.idBusinessBranch).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.listaActividades = response.data
              }
            }
          ).add(
            () => {
              if(this.specificActivities !== "" && this.specificActivities !== null){
                const lista = this.specificActivities.split(' - ')
                console.log(lista)
                lista.forEach((actividad : string)=> {
                  const act = this.listaActividades.filter(x => x.valor === actividad)[0]
                  if(actividad){
                    this.actividadesSeleccionadas.push(act)
                  }
                });
              }
            }
          )
        }
      }
    )
  }
  verificar(actividad : ComboData) : boolean{
    const index = this.actividadesSeleccionadas.findIndex(a => a.id === actividad.id);
    if (index !== -1) {
      return true
    }else{
      return false
    }
  }
  selectRamo(idRamo: number) {
    console.log(idRamo)
    this.idBusinessBranch = idRamo;
    this.actividadesSeleccionadas = [];
    this.comboService.getActividadesEspecificas(this.idBusinessBranch).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaActividades = response.data
        }
      }
    )
    this.seleccionado = idRamo
  }
  seleccionado: number | null = null;

  seleccionarItem(id: number) {
    if (this.seleccionado === id) {
      this.seleccionado = null;
    } else {
      this.seleccionado = id;
    }
  }


  selectActividad(actividad : ComboData){
    const index = this.actividadesSeleccionadas.findIndex(a => a.id === actividad.id);
    if (index !== -1) {
      this.actividadesSeleccionadas.splice(index, 1);
    } else {
      this.actividadesSeleccionadas.push(actividad);
    }
  }
  dialogRamo(){
    // const dialogRef1 = this.dialog.open(AgregarEditarRamoNegocioComponent, {
    //   data: {
    //     accion : "RAMO",
    //   },
    // });
    // dialogRef1.afterClosed().subscribe(() => {
    //   this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
    //   this.listaActividades = []
    //   this.actividadesSeleccionadas = []
    // });
  }
  dialogActividad(){
    // const dialogRef2 = this.dialog.open(AgregarEditarRamoNegocioComponent, {
    //   data: {
    //     accion : "ACTIVIDAD",
    //   },
    // });
    // dialogRef2.afterClosed().subscribe(() => {
    //   this.ramoNegocios = this.ramoNegocioService.getAllRamoNegocio()
    //   this.listaActividades = []
    //   this.actividadesSeleccionadas = []
    // });
  }
  guardar(){
    this.dialogRef.close({
      idBusinessBranch : this.idBusinessBranch,
      specificActivities : this.actividadesSeleccionadas
    })
  }
  salir(){
    this.dialogRef.close()
  }
}
