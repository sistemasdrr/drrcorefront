import { Injectable } from '@angular/core';
import { MantenimientoGeneral } from 'app/models/mantenimiento/general/mantenimiento-general';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  listaMantenimientoGeneral : MantenimientoGeneral[] = [
    {
      id : 1,
      codigo : "Cod1",
      descripcion : "desc 1",
      estado : true
    },
    {
      id : 2,
      codigo : "Cod2",
      descripcion : "desc 2",
      estado : false
    },
    {
      id : 3,
      codigo : "Cod3",
      descripcion : "desc 3",
      estado : true
    },
  ]

  constructor() { }

  getListaMantenimientoGeneral(){
    return this.listaMantenimientoGeneral
  }
}
