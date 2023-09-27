import { Injectable } from '@angular/core';
import { Pais } from 'app/models/pais';

const paises : Pais[] = [
  {
    id : 1,
    nombre : "Afghanistan",
    nombreAcort : "AFGH",
    nombreMayus : "AFGHANISTAN",
    icono : "af"
  },
  {
    id : 2,
    nombre : "Argentina",
    nombreAcort : "ARGE",
    nombreMayus : "ARGENTINA",
    icono : "ar"
  },
  {
    id : 3,
    nombre : "Bolivia",
    nombreAcort : "BOLI",
    nombreMayus : "BOLIVIA",
    icono : "bo"
  },
  {
    id : 4,
    nombre : "Brazil",
    nombreAcort : "BRAZ",
    nombreMayus : "BRAZIL",
    icono : "br"
  },
  {
    id : 5,
    nombre : "Chile",
    nombreAcort : "CHIL",
    nombreMayus : "CHILE",
    icono : "cl"
  },
  {
    id : 6,
    nombre : "China",
    nombreAcort : "CHIN",
    nombreMayus : "CHINA",
    icono : "cn"
  },
  {
    id : 7,
    nombre : "Francia",
    nombreAcort : "FRAN",
    nombreMayus : "FRANCIA",
    icono : "fr"
  },
  {
    id : 8,
    nombre : "Italia",
    nombreAcort : "ITAL",
    nombreMayus : "ITALIA",
    icono : "it"
  },
  {
    id : 9,
    nombre : "España",
    nombreAcort : "ESP",
    nombreMayus : "ESPAÑA",
    icono : "es"
  },
  {
    id : 10,
    nombre : "Estados Unido",
    nombreAcort : "USA",
    nombreMayus : "USA",
    icono : "us"
  },
  {
    id : 11,
    nombre : "Peru",
    nombreAcort : "PER",
    nombreMayus : "PERU",
    icono : "pe"
  },
  {
    id : 12,
    nombre : "Venezuela",
    nombreAcort : "VENE",
    nombreMayus : "VENEZUELA",
    icono : "ve"
  },
]

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor() { }

  getPaises(){
    return paises
  }
  getPaisById(id : number){
    return paises.filter(x => x.id == id)
  }
  getPaisByNombre(nombre : string){
    return paises.filter(x => x.nombre.match(nombre))
  }
}
