import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { Trabajador } from 'app/models/pedidos/asignacion/trabajador';
import { PedidoService } from 'app/services/pedido.service';
import { AsignacionService } from 'app/services/pedidos/asignacion/asignacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-agente',
  templateUrl: './seleccionar-agente.component.html',
  styleUrls: ['./seleccionar-agente.component.scss']
})
export class SeleccionarAgenteComponent implements OnInit {
  activeList = 0
  estado = "agregar"
  idEditarAsignacion = 0
  idEditarTrabajador = 0
  fechaAsignacionDate = new Date()
  fechaVencimientoDate = new Date()
  fechaEntregaDate = new Date()

  dataSource : MatTableDataSource<Asignacion>
  columnas = ['asignado','fechaAsignacion','fechaVencimiento','fechaEntrega','calidad','precio','accion']

  asignado = ""
  precio = 0
  calidad = ""
  fechaAsignacion = ""
  fechaVencimiento = ""
  fechaEntrega = ""
  referencias = ""
  observaciones = ""

  seleccionarTrabajador(codigo : string, nombre : string){
    this.asignado = codigo + ' || ' + nombre
  }
  datos : Trabajador[] = []
  constructor(public dialogRef: MatDialogRef<SeleccionarAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private asignacionService : AsignacionService,
    private pedidoService : PedidoService){
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    console.log(this.data.data)
    const order = this.pedidoService.getPedidos().filter(x => x.cupon == this.data.data)[0]
    console.log(order)
    if(order.asignacion.length > 0){
      this.dataSource.data = order.asignacion
    }else{
      console.log('El pedido no tiene asignaciones')
    }
  }

  filtrarDatos(tipo : string){
    this.datos = this.asignacionService.getTrabajadores().filter(x => x.tipo === tipo)
    this.asignado = ""
  }
  agregarAsignacion(codigo : string){
    const date = new Date()
    let maxId = 0
    this.asignacionService.getAsignaciones().forEach(asignacion => {
      if(asignacion.id > maxId){
        maxId = asignacion.id
      }
    });
    this.pedidoService.addAsignacionCupon(this.data.data ,{
      id : maxId+1,
      trabajador : this.asignacionService.getTrabajadores().filter(x => x.codigo === codigo)[0],
      referencias : this.referencias,
      observaciones : this.observaciones,
      fechaAsignacion : this.fechaAsignacionDate.getDate()+'/'+this.fechaAsignacionDate.getMonth()+'/'+this.fechaAsignacionDate.getFullYear(),
      fechaVencimiento : this.fechaVencimientoDate.getDate()+'/'+this.fechaVencimientoDate.getMonth()+'/'+this.fechaVencimientoDate.getFullYear(),
      fechaEntrega : this.fechaEntregaDate.getDate()+'/'+this.fechaEntregaDate.getMonth()+'/'+this.fechaEntregaDate.getFullYear(),
      calidad : this.calidad,
      precio : this.precio
    })

    this.dataSource.data = this.pedidoService.getPedidos().filter(x => x.cupon == this.data.data)[0].asignacion
  }
  seleccionarAsignacion(id : number){
    this.limpiar()
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
    const fechaVencimiento = asignacion.fechaVencimiento.split('/')
    this.fechaVencimiento = asignacion.fechaVencimiento
    if(fechaVencimiento){
      this.fechaVencimientoDate = new Date(parseInt(fechaVencimiento[2]), parseInt(fechaVencimiento[1])-1,parseInt(fechaVencimiento[0]))
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
          fechaVencimiento : this.fechaAsignacion,
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
  selectFechaVencimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaVencimiento = this.formatDate(selectedDate);
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
    this.fechaVencimiento = ''
    this.fechaVencimientoDate = new Date()
    this.fechaEntrega = ''
    this.fechaEntregaDate = new Date()
    this.referencias = ''
    this.observaciones = ''
    this.datos = []
    this.activeList = 0
  }
}
