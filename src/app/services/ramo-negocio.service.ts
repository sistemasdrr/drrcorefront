import { Injectable } from '@angular/core';
import { RamoNegocio } from 'app/models/ramo-negocio';

const ramoNegocios : RamoNegocio[] = [
  {
    id: '1',
    nombre : 'Alimentos en General',
    actividades : [
      'aceites','bebidas','carne','galletas','lacteos', 'legumbres'
    ]
  },
  {
    id: '2',
    nombre : 'Agrícultura, ganadería, pesca',
    actividades :[
      'agricultura','agroindustria','animales','caza','pesca'
    ]
  },
  {
    id: '3',
    nombre : 'Ramo Automotriz',
    actividades :[
      'accesorios y repuestos','bicicletas','carroceria','camiones','motos'
    ]
  },
  {
    id: '4',
    nombre : 'Enseñanza. Educación primaria y secundaria',
    actividades :[
      'primaria','secundaria','superior','tecnica'
    ]
  },
  {
    id: '5',
    nombre : 'Materiales electricos, iluminación, cables',
    actividades :[
      'acero galvanizado','cables','herrajes','iluminacion'
    ]
  },
]

@Injectable({
  providedIn: 'root'
})
export class RamoNegocioService {
  getRamoNegocio(){
    return ramoNegocios
  }
  constructor() { }
}
