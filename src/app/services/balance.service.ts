import { Injectable } from '@angular/core';
import { BalanceGeneral } from 'app/models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balances : BalanceGeneral[] = [
    {
      id : 1,
      idInforme : 1,
      balance : [
        {
          id : 1,
          num : 0,
          nombreBalance : "Balance 1",
          fechaBalance : "31/12/2022",
          tipoBalance : "GENERAL",
          tipoBalanceIng : "GENERAL",
          tiempoBalance : "1 AÑO",
          tiempoBalanceIng : "ONE YEAR",

          tipoMoneda : "PEN",
          tipoCambioDolar : 3.75,
          ventas : 7333173000.00,
          utilidadesNetas : 524143000.00,

          cajaBanco : 255891000,
          porCobrar : 801296000,
          inventario : 1106362000,
          otrosActivosCorrientes: 54969000.00,
          activoCorriente : 2218518000.00,
          fijo : 1453466000.00,
          otrosActivosNoCorrientes : 6082188000.00,
          totalActivo : 9754172000.00,

          bancoProv : 4320087000.00,
          otrosPasivosCorrientes : 191616000.00,
          pasivoCorriente : 4511703000.00,
          largoPlazo : 2369990000.00,
          otrosPasivosNoCorrientes : 0,
          totalPasivo : 6881693000.00,

          capital : 847192000.00,
          reservas : 172299000.00,
          utilidades : 524143000.00,
          otros : 1328845000.00,
          totalPatrimonio : 2872479000.00,
          totalPasivoPatrimonio : 9754172000.00
        },
        {
          id : 2,
          num : 1,
          nombreBalance : "Balance 2",
          fechaBalance : "31/12/2023",
          tipoBalance : "GENERAL",
          tipoBalanceIng : "GENERAL",
          tiempoBalance : "1 AÑO",
          tiempoBalanceIng : "ONE YEAR",

          tipoMoneda : "PEN",
          tipoCambioDolar : 3.75,
          ventas : 7333173000.00,
          utilidadesNetas : 524143000.00,

          cajaBanco : 1255891000,
          porCobrar : 1801296000,
          inventario : 11106362000,
          otrosActivosCorrientes: 154969000.00,
          activoCorriente : 12218518000.00,
          fijo : 11453466000.00,
          otrosActivosNoCorrientes : 16082188000.00,
          totalActivo : 19754172000.00,

          bancoProv : 14320087000.00,
          otrosPasivosCorrientes : 191616000.00,
          pasivoCorriente : 4511703000.00,
          largoPlazo : 2369990000.00,
          otrosPasivosNoCorrientes : 0,
          totalPasivo : 6881693000.00,

          capital : 847192000.00,
          reservas : 172299000.00,
          utilidades : 524143000.00,
          otros : 1328845000.00,
          totalPatrimonio : 2872479000.00,
          totalPasivoPatrimonio : 9754172000.00
        },
        {
          id : 3,
          num : 2,
          nombreBalance : "Balance 3",
          fechaBalance : "31/12/2024",
          tipoBalance : "GENERAL",
          tipoBalanceIng : "GENERAL",
          tiempoBalance : "1 AÑO",
          tiempoBalanceIng : "ONE YEAR",

          tipoMoneda : "PEN",
          tipoCambioDolar : 3.75,
          ventas : 7333173000.00,
          utilidadesNetas : 524143000.00,

          cajaBanco : 1255891000,
          porCobrar : 1801296000,
          inventario : 11106362000,
          otrosActivosCorrientes: 154969000.00,
          activoCorriente : 12218518000.00,
          fijo : 11453466000.00,
          otrosActivosNoCorrientes : 16082188000.00,
          totalActivo : 19754172000.00,

          bancoProv : 14320087000.00,
          otrosPasivosCorrientes : 191616000.00,
          pasivoCorriente : 4511703000.00,
          largoPlazo : 2369990000.00,
          otrosPasivosNoCorrientes : 0,
          totalPasivo : 6881693000.00,

          capital : 847192000.00,
          reservas : 172299000.00,
          utilidades : 524143000.00,
          otros : 1328845000.00,
          totalPatrimonio : 2872479000.00,
          totalPasivoPatrimonio : 9754172000.00
        },
      ]
    }
  ]
  constructor() { }
  GetAllBalanceGeneral(){
    return this.balances
  }
  GeTBalanceGeneralById(id : number){
    return this.balances.filter(x => x.id == id)[0]
  }
  GeTBalanceGeneralByIdInforme(id : number){
    return this.balances.filter(x => x.idInforme == id)[0]
  }
  AddBalanceGeneral(obj : BalanceGeneral){
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
  UpdateBalanceGeneral(obj : BalanceGeneral){
    const index = this.balances.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.balances[index] = obj;
    }  }
  DeleteBalance(id : number){
    this.balances = this.balances.filter(x => x.id !== id)
  }
}
