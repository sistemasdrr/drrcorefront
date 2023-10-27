import { Injectable } from '@angular/core';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { Trabajador } from 'app/models/pedidos/asignacion/trabajador';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

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
  listaAsignaciones : Asignacion[] = [
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

  constructor() { }

  getTrabajadores(){
    return this.listaTrabajadores
  }
  getTrabajadorById(id : number){
    return this.listaTrabajadores.filter(x => x.id == id)[0]
  }

  getTrabajadorByCodigo(codigo : string){
    return this.listaTrabajadores.filter(x => x.codigo == codigo)[0]
  }
  addTrabajador(obj : Trabajador){
    let idMax : number = 0
    for (let i = 0; i < this.listaTrabajadores.length; i++) {
      const elemento = this.listaTrabajadores[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.listaTrabajadores.push(obj)
  }
  updateTrabajador(obj : Trabajador){
    const index = this.listaTrabajadores.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.listaTrabajadores[index] = obj;
    }  }
  deleteTrabajador(id : number){
    this.listaTrabajadores = this.listaTrabajadores.filter(x => x.id !== id)
  }
  getAsignaciones(){
    return this.listaAsignaciones
  }
  getAsignacionById(id : number){
    return this.listaAsignaciones.filter(x => x.id == id)[0]
  }
  addAsignacion(obj : Asignacion){
    let idMax : number = 0
    for (let i = 0; i < this.listaAsignaciones.length; i++) {
      const elemento = this.listaAsignaciones[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.listaAsignaciones.push(obj)
  }
  updateAsignacion(obj : Asignacion){
    const index = this.listaAsignaciones.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.listaAsignaciones[index] = obj;
    }  }
  deleteAsignacion(id : number){
    this.listaAsignaciones = this.listaAsignaciones.filter(x => x.id !== id)
  }
}
