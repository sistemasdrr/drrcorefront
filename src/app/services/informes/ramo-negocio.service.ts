import { Injectable } from '@angular/core';
import { Actividad, RamoNegocio } from 'app/models/informes/ramo-negocio';



@Injectable({
  providedIn: 'root'
})
export class RamoNegocioService {
  ramoNegocios : RamoNegocio[] = [
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

  actividades : Actividad[] = []

  getAllRamoNegocio(){
    return this.ramoNegocios
  }
  getRamoNegocioByCodigo(codigo : number){
    return this.ramoNegocios.filter(x => x.id= codigo)[0]
  }
  addRamoNegocio(obj : RamoNegocio){
    let idMax : number = 0
    for (let i = 0; i < this.ramoNegocios.length; i++) {
      const elemento = this.ramoNegocios[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.ramoNegocios.push(obj)
  }
  updareRamoNegocio(obj : RamoNegocio){
    const index = this.ramoNegocios.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.ramoNegocios[index] = obj;
    }
  }
  deleteProveedor(id : number){
    this.ramoNegocios = this.ramoNegocios.filter(x => x.id !== id)
  }
  getAllActividad(){
    const lista : Actividad[] = []
    for (let i = 0; i < this.ramoNegocios.length; i++) {
      const elemento = this.ramoNegocios[i]
      for (let i = 0; i < elemento.actividades.length; i++) {
        lista.push(elemento.actividades[i])
      }
    }
    this.actividades = lista
    return lista
  }
  getActividadByRamoId(idRamo: number){
    const ramo = this.ramoNegocios.find(x => x.id === idRamo);
    if (ramo) {
      return ramo.actividades
    } else {
      return []
    }
  }

  getActividadById(id : number){
    const lista : Actividad[] = []
    for (let i = 0; i < this.ramoNegocios.length; i++) {
      const elemento = this.ramoNegocios[i]
      for (let i = 0; i < elemento.actividades.length; i++) {
        lista.push(elemento.actividades[i])
      }
    }
    return lista.filter(x => x.id == id)[0]
  }
  addActividad(obj : Actividad, idRamo : number){
    let idMax : number = 0
    for (let i = 0; i < this.ramoNegocios.length; i++) {
      const ramo = this.ramoNegocios[i]
      for (let i = 0; i < ramo.actividades.length; i++) {
        const actividad = ramo.actividades[i]
        if(idMax < actividad.id){
          idMax = actividad.id
        }
      }
    }
    obj.id = idMax+1
    const index = this.ramoNegocios.findIndex(x => x.id === idRamo);
    if (index !== -1) {
      this.ramoNegocios[index].actividades.push(obj);
    }
  }
  updateActividad(obj : Actividad){
    const index = this.actividades.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.actividades[index] = obj;
    }
  }
  deleteActividad(idActividad: number, idRamo: number) {
    const indexRamo = this.ramoNegocios.findIndex(x => x.id === idRamo);
    if (indexRamo !== -1) {
      this.ramoNegocios[indexRamo].actividades = this.ramoNegocios[indexRamo].actividades.filter(x => x.id !== idActividad);
    }
    this.actividades = this.actividades.filter(x => x.id !== idActividad);
  }


  constructor() {
    this.actividades = this.getAllActividad()
   }
}
