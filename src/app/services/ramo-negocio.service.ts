import { Injectable } from '@angular/core';
import { RamoNegocio } from 'app/models/ramo-negocio';

let ramoNegocios : RamoNegocio[] = [
  {
    id: 1,
    nombre : 'Alimentos en General',
    nombreIng : 'Alimentos en General',
    enable : true,
    actividades : [
      {
        id:1,
        nombre : 'aceites',
        nombreIng : "oils",
        enable : true
      },
      {
        id:2,
        nombre : 'bebidas',
        nombreIng : "oils",
        enable : true
      },
      {
        id:3,
        nombre : 'carne',
        nombreIng : "oils",
        enable : true
      },
      {
        id:4,
        nombre : 'galletas',
        nombreIng : "oils",
        enable : true
      },
      {
        id:5,
        nombre : 'lacteos',
        nombreIng : "oils",
        enable : true
      },
      {
        id:6,
        nombre : 'legumbres',
        nombreIng : "oils",
        enable : true
      }
    ]
  },
  {
    id: 2,
    nombre : 'Agrícultura, ganadería, pesca',
    nombreIng : 'Agriculture, livestock, fishing',
    enable : true,
    actividades : [
      {
        id:7,
        nombre : 'agricultura',
        nombreIng : "agriculture",
        enable : true
      },
      {
        id:8,
        nombre : 'agroindustria',
        nombreIng : "agroindustry",
        enable : true
      },
      {
        id:9,
        nombre : 'animales',
        nombreIng : "animals",
        enable : true
      },
      {
        id:10,
        nombre : 'caza',
        nombreIng : "hunt",
        enable : true
      },
      {
        id: 11,
        nombre : 'pesca',
        nombreIng : "fishing",
        enable : true
      },
    ]
  },
  {
    id: 3,
    nombre : 'Ramo Automotriz',
    nombreIng : 'Automotive branch',
    enable : true,
    actividades : [
      {
        id:12,
        nombre : 'accesorios',
        nombreIng : "accesories",
        enable : true
      },
      {
        id:13,
        nombre : 'bicicletas',
        nombreIng : "bikes",
        enable : true
      },
      {
        id:14,
        nombre : 'carroceria',
        nombreIng : "bodywork",
        enable : true
      },
      {
        id:15,
        nombre : 'camiones',
        nombreIng : "trucks",
        enable : true
      },
      {
        id: 16,
        nombre : 'motos',
        nombreIng : "motorcycles",
        enable : true
      },
    ]
  },
  {
    id: 4,
    nombre : 'Enseñanza y Educación',
    nombreIng : 'Teaching and Education',
    enable : true,
    actividades : [
      {
        id:17,
        nombre : 'primaria',
        nombreIng : "primary",
        enable : true
      },
      {
        id:18,
        nombre : 'secundaria',
        nombreIng : "secondary",
        enable : true
      },
      {
        id:19,
        nombre : 'superior',
        nombreIng : "superior",
        enable : true
      },
      {
        id:20,
        nombre : 'tecnica',
        nombreIng : "technique",
        enable : true
      },
    ]
  },
  {
    id: 5,
    nombre : 'Materiales electricos',
    nombreIng : 'Electrical materials',
    enable : true,
    actividades : [
      {
        id:21,
        nombre : 'cables',
        nombreIng : "wires",
        enable : true
      },
      {
        id:22,
        nombre : 'iluminacion',
        nombreIng : "lightning",
        enable : true
      },
      {
        id:23,
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
  getRamoNegocioByCodigo(codigo : number){
    return ramoNegocios
  }
  constructor() { }
}
