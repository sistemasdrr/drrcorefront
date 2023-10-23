import { Injectable } from '@angular/core';
import { HistoricoVentas } from 'app/models/informes/historico-ventas';

@Injectable({
  providedIn: 'root'
})
export class HistoricoVentasService {

  historicoVentas : HistoricoVentas[] = [
    {
      id : 1,
      fecha : "3/10/2023",
      moneda : "USD",
      ventasMN : "6,000,000.00",
      TC : "3.3",
      equivaleDolar : "1,818,181.82"
    },
    {
      id : 2,
      fecha : "3/10/2022",
      moneda : "USD",
      ventasMN : "5,000,000.00",
      TC : "3.3",
      equivaleDolar : "1,515,515.32"
    }
  ]

  constructor() { }
  GetAllHistoricoVentas(){
    return this.historicoVentas
  }
  GetHistoricoVentasById(id : number){
    return this.historicoVentas.filter(x => x.id == id)[0]
  }
  AddHistoricoVentas(obj : HistoricoVentas){
    let idMax : number = 0
    for (let i = 0; i < this.historicoVentas.length; i++) {
      const elemento = this.historicoVentas[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.historicoVentas.push(obj)
  }
  UpdateHistoricoVentas(obj : HistoricoVentas){
    const index = this.historicoVentas.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.historicoVentas[index] = obj;
    }  }
  DeleteHistoricoVentas(id : number){
    this.historicoVentas = this.historicoVentas.filter(x => x.id !== id)
  }
}
