import { Injectable } from '@angular/core';
import { RamoNegocio } from 'app/models/ramo-negocio';

const ramoNegocios : RamoNegocio[] = [
  {
    codigo: '1',
    nombre : 'Alimentos en General',
    nombreIng : 'Alimentos en General',
    enable : true,
    actividades : [
      {
        codigo:'1',
        nombre : 'aceites',
        nombreIng : "oils",
        enable : true
      },
      {
        codigo:'2',
        nombre : 'bebidas',
        nombreIng : "oils",
        enable : true
      },
      {
        codigo:'3',
        nombre : 'carne',
        nombreIng : "oils",
        enable : true
      },
      {
        codigo:'4',
        nombre : 'galletas',
        nombreIng : "oils",
        enable : true
      },
      {
        codigo:'5',
        nombre : 'lacteos',
        nombreIng : "oils",
        enable : true
      },
      {
        codigo:'6',
        nombre : 'legumbres',
        nombreIng : "oils",
        enable : true
      }
    ]
  },
  {
    codigo: '2',
    nombre : 'Agrícultura, ganadería, pesca',
    nombreIng : 'Agriculture, livestock, fishing',
    enable : true,
    actividades : [
      {
        codigo:'7',
        nombre : 'agricultura',
        nombreIng : "agriculture",
        enable : true
      },
      {
        codigo:'8',
        nombre : 'agroindustria',
        nombreIng : "agroindustry",
        enable : true
      },
      {
        codigo:'9',
        nombre : 'animales',
        nombreIng : "animals",
        enable : true
      },
      {
        codigo:'10',
        nombre : 'caza',
        nombreIng : "hunt",
        enable : true
      },
      {
        codigo: '11',
        nombre : 'pesca',
        nombreIng : "fishing",
        enable : true
      },
    ]
  },
  {
    codigo: '3',
    nombre : 'Ramo Automotriz',
    nombreIng : 'Automotive branch',
    enable : true,
    actividades : [
      {
        codigo:'12',
        nombre : 'accesorios',
        nombreIng : "accesories",
        enable : true
      },
      {
        codigo:'13',
        nombre : 'bicicletas',
        nombreIng : "bikes",
        enable : true
      },
      {
        codigo:'14',
        nombre : 'carroceria',
        nombreIng : "bodywork",
        enable : true
      },
      {
        codigo:'15',
        nombre : 'camiones',
        nombreIng : "trucks",
        enable : true
      },
      {
        codigo: '16',
        nombre : 'motos',
        nombreIng : "motorcycles",
        enable : true
      },
    ]
  },
  {
    codigo: '4',
    nombre : 'Enseñanza y Educación',
    nombreIng : 'Teaching and Education',
    enable : true,
    actividades : [
      {
        codigo:'17',
        nombre : 'primaria',
        nombreIng : "primary",
        enable : true
      },
      {
        codigo:'18',
        nombre : 'secundaria',
        nombreIng : "secondary",
        enable : true
      },
      {
        codigo:'19',
        nombre : 'superior',
        nombreIng : "superior",
        enable : true
      },
      {
        codigo:'20',
        nombre : 'tecnica',
        nombreIng : "technique",
        enable : true
      },
    ]
  },
  {
    codigo: '5',
    nombre : 'Materiales electricos',
    nombreIng : 'Electrical materials',
    enable : true,
    actividades : [
      {
        codigo:'21',
        nombre : 'cables',
        nombreIng : "wires",
        enable : true
      },
      {
        codigo:'22',
        nombre : 'iluminacion',
        nombreIng : "lightning",
        enable : true
      },
      {
        codigo:'23',
        nombre : 'herramientas',
        nombreIng : "tools",
        enable : true
      },
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
