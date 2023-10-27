import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { Trabajador } from 'app/models/pedidos/asignacion/trabajador';
import { AsignacionService } from 'app/services/pedidos/asignacion/asignacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-agente',
  templateUrl: './seleccionar-agente.component.html',
  styleUrls: ['./seleccionar-agente.component.scss']
})
export class SeleccionarAgenteComponent implements OnInit {

  estado = "agregar"
  idEditarAsignacion = 0
  idEditarTrabajador = 0
  fechaAsignacionDate = new Date()
  fechaEntregaDate = new Date()

  dataSource : MatTableDataSource<Asignacion>
  columnas = ['asignado','fechaAsignacion','fechaEntrega','calidad','precio','accion']

  asignado = ""
  precio = 0
  calidad = ""
  fechaAsignacion = ""
  fechaEntrega = ""
  referencias = ""
  observaciones = ""

  seleccionarTrabajador(codigo : string, nombre : string){
    this.asignado = codigo + ' || ' + nombre
  }
  datos : Trabajador[] = []
  constructor(public dialogRef: MatDialogRef<SeleccionarAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private asignacionService : AsignacionService){
      this.dataSource = new MatTableDataSource()
    }

    ngOnInit(): void {
      this.dataSource.data = this.asignacionService.getAsignaciones()
    }

  filtrarDatos(tipo : string){
    this.datos = this.asignacionService.getTrabajadores().filter(x => x.tipo === tipo)
  }
  agregarAsignacion(codigo : string){
    const date = new Date()
    let maxId = 0
    this.asignacionService.getAsignaciones().forEach(asignacion => {
      if(asignacion.id > maxId){
        maxId = asignacion.id
      }
    });
    this.asignacionService.addAsignacion({
      id : maxId+1,
      trabajador : this.asignacionService.getTrabajadores().filter(x => x.codigo === codigo)[0],
      referencias : this.referencias,
      observaciones : this.observaciones,
      fechaAsignacion : this.fechaAsignacionDate.getDate()+'/'+this.fechaAsignacionDate.getMonth()+'/'+this.fechaAsignacionDate.getFullYear(),
      fechaEntrega : this.fechaEntregaDate.getDate()+'/'+this.fechaEntregaDate.getMonth()+'/'+this.fechaEntregaDate.getFullYear(),
      calidad : this.calidad,
      precio : this.precio
    })

    this.dataSource.data = this.asignacionService.getAsignaciones()
  }
  seleccionarAsignacion(id : number){
    this.estado = "editar"
    const asignacion = this.asignacionService.getAsignaciones().filter(x => x.id == id)[0]
    this.idEditarTrabajador = asignacion.trabajador.id
    this.idEditarAsignacion = asignacion.id
    this.asignado = asignacion.trabajador.codigo + ' || ' + asignacion.trabajador.nombre
    this.precio = asignacion.precio
    const fechaAsignacion = asignacion.fechaAsignacion.split('/')
    this.fechaAsignacion = asignacion.fechaAsignacion
    if(fechaAsignacion){
      this.fechaAsignacionDate = new Date(parseInt(fechaAsignacion[2]), parseInt(fechaAsignacion[1])-1,parseInt(fechaAsignacion[0]))
    }
    const fechaEntrega = asignacion.fechaEntrega.split('/')
    this.fechaEntrega = asignacion.fechaEntrega
    if(fechaEntrega){
      this.fechaEntregaDate = new Date(parseInt(fechaEntrega[2]), parseInt(fechaEntrega[1])-1,parseInt(fechaEntrega[0]))
    }
    this.calidad = asignacion.calidad
    this.referencias = asignacion.referencias
    this.observaciones = asignacion.observaciones
  }

  editarAsignacion(){
    Swal.fire({
      title: '¿Está seguro de editar este registro?',
      text: "",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.estado = "editar"
        const trabajador = this.asignacionService.getTrabajadores().filter(x => x.id == this.idEditarTrabajador)[0]

        const obj : Asignacion = {
          id : this.idEditarAsignacion,
          trabajador : trabajador,
          referencias : this.referencias,
          observaciones : this.observaciones,
          fechaAsignacion : this.fechaAsignacion,
          fechaEntrega : this.fechaEntrega,
          calidad : this.calidad,
          precio : this.precio
        }
        this.asignacionService.updateAsignacion(obj)
        this.dataSource.data = this.asignacionService.getAsignaciones()
        this.limpiar()
        Swal.fire({
          title :'¡Actualizado!',
          text : 'El registro se edito correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        })
      }
    })
  }

  eliminarAsignacion(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar esta asignación?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.asignacionService.deleteAsignacion(id)
        this.dataSource.data = this.asignacionService.getAsignaciones()
        this.limpiar()
      }
    })
  }

  cerrarDialog(){
    this.dialogRef.close()
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  selectFechaAsignacion(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaAsignacion = this.formatDate(selectedDate);
    }
  }
  selectFechaEntrega(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaEntrega = this.formatDate(selectedDate);
    }
  }
  limpiar(){
    this.estado = 'agregar'
    this.asignado = ''
    this.precio = 0
    this.calidad = ''
    this.fechaAsignacion = ''
    this.fechaAsignacionDate = new Date()
    this.fechaEntrega = ''
    this.fechaEntregaDate = new Date()
    this.referencias = ''
    this.observaciones = ''
    this.datos = []
  }
}
