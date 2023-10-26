import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

export interface Trabajador{
  id : number
  tipo : string
  codigo : string
  nombre : string
}
export interface TrabajadoresAsignados{
  id : number
  trabajador : Trabajador
  referencias : string
  observaciones : string
  fechaAsignacion : string
  fechaEntrega : string
  calidad : string
  precio : number
}

@Component({
  selector: 'app-seleccionar-agente',
  templateUrl: './seleccionar-agente.component.html',
  styleUrls: ['./seleccionar-agente.component.scss']
})
export class SeleccionarAgenteComponent implements OnInit {

  estado = "agregar"
  idEditar = 0

  dataSource : MatTableDataSource<TrabajadoresAsignados>
  columnas = ['asignado','fechaAsignacion','fechaEntrega','calidad','precio','accion']
  listaTrabajadores : Trabajador[] = [
    {
      id : 1,
      tipo : 'Reportero',
      codigo : 'R10',
      nombre : 'Rafael Alonso Del Risco'
    },
    {
      id : 2,
      tipo : 'Reportero',
      codigo : 'R11',
      nombre : 'Julio Enrique Del Risco L.'
    },
    {
      id : 3,
      tipo : 'Reportero',
      codigo : 'R12',
      nombre : 'Marco Antonio Polo'
    },
    {
      id : 4,
      tipo : 'Reportero',
      codigo : 'R14',
      nombre : 'Julio Jr. Del Risco A.'
    },
    {
      id : 5,
      tipo : 'Reportero',
      codigo : 'R15',
      nombre : 'Rafael Alonso Del Risco'
    },
    {
      id : 6,
      tipo : 'Agente',
      codigo : 'A04',
      nombre : 'BYINGTON COLOMBIA S.A.S.'
    },
    {
      id : 7,
      tipo : 'Agente',
      codigo : 'A09',
      nombre : 'VENEZUELA REPORTS DR-P C.A.'
    },
    {
      id : 8,
      tipo : 'Agente',
      codigo : 'A17',
      nombre : 'MM REPORTES MEXICANOS'
    },
    {
      id : 9,
      tipo : 'Agente',
      codigo : 'A26',
      nombre : 'RAAZIQ BCR - BUSINESS CREDITS REPORTS'
    },
    {
      id : 10,
      tipo : 'Digitadora',
      codigo : 'D11',
      nombre : 'Raquel Irene Perez'
    },
    {
      id : 11,
      tipo : 'Digitadora',
      codigo : 'D12',
      nombre : 'Katia Esther Bustamante'
    },
    {
      id : 12,
      tipo : 'Digitadora',
      codigo : 'D13',
      nombre : 'Sara Cristina Noriega'
    },
    {
      id : 13,
      tipo : 'Digitadora',
      codigo : 'D15',
      nombre : 'Cecilia Isabel Rodriguez'
    },
    {
      id : 14,
      tipo : 'Digitadora',
      codigo : 'D18',
      nombre : 'Rafael Alonso Del Risco'
    },
    {
      id : 15,
      tipo : 'Traductora',
      codigo : 'T11',
      nombre : 'Maria del Rosario Huanqui'
    },
    {
      id : 16,
      tipo : 'Traductora',
      codigo : 'T12',
      nombre : 'Rosa Luz Lara'
    },
    {
      id : 17,
      tipo : 'Traductora',
      codigo : 'T16',
      nombre : 'Saori Teruya'
    },
    {
      id : 18,
      tipo : 'Traductora',
      codigo : 'T18',
      nombre : 'Monica Yepez'
    },
    {
      id : 19,
      tipo : 'Digitadora',
      codigo : 'D19',
      nombre : 'Isabel Lujan'
    },
    {
      id : 20,
      tipo : 'Supervisor',
      codigo : 'S70',
      nombre : 'Rafael Del Risco Aliaga(TF)'
    },
    {
      id : 21,
      tipo : 'Supervisor',
      codigo : 'S71',
      nombre : 'Julio Jr. Del Risco Aliaga'
    },
    {
      id : 22,
      tipo : 'Supervisor',
      codigo : 'S72',
      nombre : 'Juan Carlos Lizarzaburu'
    },
    {
      id : 23,
      tipo : 'Supervisor',
      codigo : 'S73',
      nombre : 'Julio Del Risco Lizarzaburu(TF)'
    },
  ]
  tablaTrabajadoresAsignados : TrabajadoresAsignados[] = [
    {
      id : 1,
      trabajador : {
        id : 2,
        tipo : 'Reportero',
        codigo : 'R11',
        nombre : 'Julio Enrique Del Risco L.'
      },
      referencias : 'referencias',
      observaciones : 'observaciones',
      fechaAsignacion : '26/10/2023',
      fechaEntrega : '30/10/2023',
      calidad : 'A',
      precio : 0
    }
  ]

  asignado = ""
  precio = 0
  calidad = ""
  referencias = ""
  observaciones = ""
  seleccionarTrabajador(codigo : string, nombre : string){
    this.asignado = codigo + ' || ' + nombre
  }
  datos : Trabajador[] = []
  constructor(public dialogRef: MatDialogRef<SeleccionarAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.dataSource = new MatTableDataSource()

    }

    ngOnInit(): void {
      this.dataSource.data = this.tablaTrabajadoresAsignados
    }

  filtrarDatos(tipo : string){
    this.datos = this.listaTrabajadores.filter(x => x.tipo === tipo)
  }
  agregarAsignacion(codigo : string){
    console.log(this.listaTrabajadores.filter(x => x.codigo === codigo)[0])
    let maxId = 0
    this.tablaTrabajadoresAsignados.forEach(trabajadorAsignado => {
      if(trabajadorAsignado.id > maxId){
        maxId = trabajadorAsignado.id
      }
    });
    this.tablaTrabajadoresAsignados.push({
      id : maxId+1,
      trabajador : this.listaTrabajadores.filter(x => x.codigo === codigo)[0],
      referencias : this.referencias,
      observaciones : this.observaciones,
      fechaAsignacion : '26/10/2023',
      fechaEntrega : '30/10/2023',
      calidad : this.calidad,
      precio : this.precio
    })
    this.dataSource.data = this.tablaTrabajadoresAsignados
    this.estado = 'agregar'
    this.asignado = ''
    this.precio = 0
    this.calidad = ''
    this.referencias = ''
    this.observaciones = ''
    this.datos = []
  }
  editarAsignacion(id : number){
    this.estado = "editar"
    const asignacion = this.tablaTrabajadoresAsignados.filter(x => x.id == id)[0]
    this.idEditar = asignacion.id
    this.asignado = asignacion.trabajador.codigo + ' || ' + asignacion.trabajador.nombre
    this.precio = asignacion.precio
    this.calidad = asignacion.calidad
    this.referencias = asignacion.referencias
    this.observaciones = asignacion.observaciones
  }

  editar(){
    
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
        this.dataSource.data = this.tablaTrabajadoresAsignados.filter(x => x.id !== id)
      }
    })
  }
  cancelarEditar(){
    this.estado = 'agregar'
    this.asignado = ''
    this.precio = 0
    this.calidad = ''
    this.referencias = ''
    this.observaciones = ''
  }
  cerrarDialog(){
    this.dialogRef.close()
  }
}
