import { Injectable } from '@angular/core';
import { Balance } from 'app/models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balances : Balance[] = [
    {
      id : 1,
      idInforme : 1,
      fechaBalance : "4/10/2020",
      tipoBalance : "GENERAL",
      tipoBalanceIng : "GENERAL",
      tiempoBalance : "1 AÑO",
      tiempoBalanceIng : "ONE YEAR",

      tipoMoneda : "NUEVOS SOLES",
      tipoCambioDolar : 3.80,
      ventas : 10000000,
      utilidadesNetas : 1000000,

      cajaBanco : 10000000,
      porCobrar : 50000,
      inventario : 6000000,
      otrosActivosCorrientes: 300000,
      activoCorriente : 16250000,
      fijo : 500000,
      otrosActivosNoCorrientes : 500000,
      totalActivo : 17350000,

      bancoProv : 10000000,
      otrosPasivosCorrientes : 50000,
      pasivoCorriente : 10050000,
      largoPlazo : 500000,
      otrosPasivosNoCorrientes : 300000,
      totalPasivo : 10850000,

      capital : 10000000,
      reservas : 500000,
      utilidades : 500000,
      otros : 50000,
      totalPatrimonio : 11050000,
      totalPasivoPatrimonio : 21900000
    },
  ]
  constructor() { }
  GetAllBalance(){
    return this.balances
  }
  GeTBalanceById(id : number){
    return this.balances.filter(x => x.id == id)[0]
  }
  AddBalance(obj : Balance){
    let idMax : number = 0
    for (let i = 0; i < this.balances.length; i++) {
      const elemento = this.balances[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.balances.push(obj)
  }
  UpdateBalance(obj : Balance){
    const index = this.balances.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.balances[index] = obj;
    }  }
  DeleteBalance(id : number){
    this.balances = this.balances.filter(x => x.id !== id)
  }
}
