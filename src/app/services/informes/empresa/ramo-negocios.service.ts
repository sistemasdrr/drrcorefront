import { Injectable } from '@angular/core';
import { RamoNegocios } from 'app/models/informes/empresa/ramo-negocios';

@Injectable({
  providedIn: 'root'
})
export class RamoNegociosService {

  private ramoNegocios : RamoNegocios[] = []

  constructor() {
    this.ramoNegocios = [

    ]
  }

  getRamoNegocios(codigoInforme : string){
    return this.ramoNegocios.filter(emp => emp.codigoInforme === codigoInforme)
  }

  updateRamoNegocios(ramoNegocios : RamoNegocios){
    const index = this.ramoNegocios.findIndex(x => x.codigoInforme === ramoNegocios.codigoInforme);
    if (index !== -1) {
      this.ramoNegocios[index] = ramoNegocios;
    }else{
      console.log('No se encontro el informe.')
    }
  }
}
