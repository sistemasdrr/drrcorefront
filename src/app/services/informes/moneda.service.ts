import { Injectable } from '@angular/core';
import { Moneda } from 'app/models/informes/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  listaMonedas : Moneda[] = [
    {
      id : 1,
      pais : 'PERU',
      moneda : 'SOL'
    },
    {
      id : 2,
      pais : 'CHILE',
      moneda : 'PESO CHILENO'
    },
    {
      id : 3,
      pais : 'BOLIVIA',
      moneda : 'BOLIVIANO'
    },
    {
      id : 4,
      pais : 'MEXICO',
      moneda : 'PESO MEXICANO'
    },
    {
      id : 5,
      pais : 'CHINA',
      moneda : 'YUAN'
    },
    {
      id : 6,
      pais : 'RUSIA',
      moneda : 'RUBLO RUSO'
    },
  ]
  constructor() { }
  getMonedas(){
    return this.listaMonedas
  }
  getMonedaById(id : number){
    return this.listaMonedas.filter(x => x.id == id)
  }
  getMonedaByPais(pais : string){
    return this.listaMonedas.filter(x => x.pais == pais)
  }
}
