import { Injectable } from '@angular/core';
import { MorosidadComercial } from 'app/models/morosidad-comercial';



@Injectable({
  providedIn: 'root'
})
export class MorosidadComercialService {
  morosidadComercial : MorosidadComercial[] = [
    {
      id : 1,
      acreProv : "Acreedor o proveedor",
      tipoDocumento : "tipo doc",
      fecha : "29/06/2023",
      montoMN : "monto mn",
      montoME : "monto me",
      fechaPago : "29/09/2023",
      diasAtraso : "90 dias"
    }
  ]
  constructor()
  {

  }
  GetAllMorosidadComercial(){
    return this.morosidadComercial
  }
  GetMorosidadComercialById(id : number){
    return this.morosidadComercial.filter(x => x.id == id)[0]
  }
  AddMorosidadComercial(obj : MorosidadComercial){
    let idMax : number = 0
    for (let i = 0; i < this.morosidadComercial.length; i++) {
      const elemento = this.morosidadComercial[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax
    this.morosidadComercial.push(obj)
  }
  UpdateMorosidadComercial(id : number, obj : MorosidadComercial){
    obj.id = id
    this.morosidadComercial.filter(x => x.id == id)[0] = obj
  }
  DeleteMorosidadComercial(id : number){
    this.morosidadComercial = this.morosidadComercial.filter(x => x.id !== id)
  }
}
