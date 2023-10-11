import { Component  } from '@angular/core';
import { Balance, BalanceGeneral } from 'app/models/balance';
import { BalanceService } from 'app/services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  balanceSeleccionado : number = 0

  agregar : boolean = false

  fechaBalance : Date = new Date()
  tipoBalance : string = ""
  tiempoBalance : string = ""

  balanceGeneral : BalanceGeneral = {
    id : 0,
    idInforme : 0,
    balance : []
  }

  separator = ","

  tipoMoneda : string = ""
  tipoCambio : number = 0
  utilidades : number = 0
  ventas : number = 0

  activoCorriente1 : number = 0
  activoCorriente2 : number = 0
  activoCorriente3 : number = 0
  activoCorriente4 : number = 0
  activosCorrientes : number = this.activoCorriente1 + this.activoCorriente2 + this.activoCorriente3 + this.activoCorriente4

  activoNoCorriente1 : number = 0
  activoNoCorriente2 : number = 0
  activosNoCorrientes : number = this.activoNoCorriente1 + this.activoNoCorriente2

  activos : number = this.activosCorrientes + this.activosNoCorrientes

  pasivoCorriente1 : number = 0
  pasivoCorriente2 : number = 0
  pasivosCorrientes : number = this.pasivoCorriente1 + this.pasivoCorriente2

  pasivoNoCorriente1 : number = 0
  pasivoNoCorriente2 : number = 0
  pasivosNoCorrientes : number = this.pasivoNoCorriente1 + this.pasivoNoCorriente2

  pasivos : number = 0

  patrimonio1 : number = 0
  patrimonio2 : number = 0
  patrimonio3 : number = 0
  patrimonio4 : number = 0

  patrimonios : number = 0

  totalPasivoPatrimonio : number = 0

  indiceLiquidez : number = this.activosCorrientes / this.pasivosCorrientes
  ratioEndeudamiento : number = this.patrimonios / this.pasivosCorrientes * 100
  ratioRentabilidad : number = this.utilidades / this.ventas * 100
  capitalTrabajo : number = this.activosCorrientes - this.pasivosCorrientes

  updActivoCorriente(){
    console.log(this.activoCorriente1)
    this.activosCorrientes = this.activoCorriente1 + this.activoCorriente2 + this.activoCorriente3 + this.activoCorriente4
    this.activos = this.activosCorrientes + this.activosNoCorrientes
    this.updRatios()
  }
  updActivoNoCorriente(){
    this.activosNoCorrientes = this.activoNoCorriente1 + this.activoNoCorriente2
    this.activos = this.activosCorrientes + this.activosNoCorrientes
    this.updRatios()
  }

  updPasivoCorriente(){
    this.pasivosCorrientes = this.pasivoCorriente1 + this.pasivoCorriente2
    this.pasivos = this.pasivosCorrientes + this.pasivosNoCorrientes
    this.totalPasivoPatrimonio = this.patrimonios + this.pasivos
    this.updRatios()
  }
  updPasivoNoCorriente(){
    this.pasivosNoCorrientes = this.pasivoNoCorriente1 + this.pasivoNoCorriente2
    this.pasivos = this.pasivosCorrientes + this.pasivosNoCorrientes
    this.totalPasivoPatrimonio = this.patrimonios + this.pasivos
    this.updRatios()
  }

  updPatrimonio(){
    this.patrimonios = this.patrimonio1 + this.patrimonio2 + this.patrimonio3 + this.patrimonio4
    this.totalPasivoPatrimonio = this.patrimonios + this.pasivos
    this.updRatios()
  }

  updRatios(){
    this.indiceLiquidez = parseFloat((this.activosCorrientes / this.pasivosCorrientes).toFixed(2));
    this.ratioEndeudamiento = parseFloat((this.patrimonios / this.pasivosCorrientes * 100).toFixed(2));
    this.ratioRentabilidad = parseFloat((this.utilidades / this.ventas * 100).toFixed(2));
    this.capitalTrabajo = parseFloat((this.activosCorrientes - this.pasivosCorrientes).toFixed(2));
  }

  imprimirValor(){
    let val = this.activoCorriente1.toLocaleString();
    val = val.replaceAll(",","-")
    val = val.replaceAll(".",",")
    val = val.replaceAll("-",".")
    console.log(val);
  }

  constructor(private balanceService : BalanceService){
    this.balanceGeneral = this.balanceService.GeTBalanceGeneralByIdInforme(1)
    this.actualizarBalance(this.balanceSeleccionado)
  }

  actualizarBalance(numBalance : number){
    this.agregar = false
    this.balanceSeleccionado = numBalance

    const fecha = this.balanceGeneral.balance[this.balanceSeleccionado].fechaBalance.split("/");
    console.log(fecha)
    this.fechaBalance = new Date(parseInt(fecha[2]), parseInt(fecha[1])-1,parseInt(fecha[0]))

    this.tipoBalance = this.balanceGeneral.balance[this.balanceSeleccionado].tipoBalance
    this.tiempoBalance = this.balanceGeneral.balance[this.balanceSeleccionado].tiempoBalance

    this.tipoMoneda = this.balanceGeneral.balance[this.balanceSeleccionado].tipoMoneda
    this.tipoCambio = this.balanceGeneral.balance[this.balanceSeleccionado].tipoCambioDolar
    this.utilidades = this.balanceGeneral.balance[this.balanceSeleccionado].utilidades
    this.ventas = this.balanceGeneral.balance[this.balanceSeleccionado].ventas

    this.activoCorriente1 = this.balanceGeneral.balance[this.balanceSeleccionado].cajaBanco
    this.activoCorriente2 = this.balanceGeneral.balance[this.balanceSeleccionado].porCobrar
    this.activoCorriente3 = this.balanceGeneral.balance[this.balanceSeleccionado].inventario
    this.activoCorriente4 = this.balanceGeneral.balance[this.balanceSeleccionado].otrosActivosCorrientes
    this.activosCorrientes = this.balanceGeneral.balance[this.balanceSeleccionado].activoCorriente

    this.activoNoCorriente1 = this.balanceGeneral.balance[this.balanceSeleccionado].fijo
    this.activoNoCorriente2 = this.balanceGeneral.balance[this.balanceSeleccionado].otrosActivosNoCorrientes
    this.activosNoCorrientes = this.activoNoCorriente1 + this.activoNoCorriente2

    this.activos = this.balanceGeneral.balance[this.balanceSeleccionado].totalActivo

    this.pasivoCorriente1 = this.balanceGeneral.balance[this.balanceSeleccionado].bancoProv
    this.pasivoCorriente2 = this.balanceGeneral.balance[this.balanceSeleccionado].otrosPasivosCorrientes
    this.pasivosCorrientes = this.balanceGeneral.balance[this.balanceSeleccionado].pasivoCorriente

    this.pasivoNoCorriente1 = this.balanceGeneral.balance[this.balanceSeleccionado].largoPlazo
    this.pasivoNoCorriente2 = this.balanceGeneral.balance[this.balanceSeleccionado].otrosActivosNoCorrientes
    this.pasivosNoCorrientes = this.pasivoNoCorriente1 + this.pasivoNoCorriente2

    this.pasivos = this.balanceGeneral.balance[this.balanceSeleccionado].totalPasivo

    this.patrimonio1 = this.balanceGeneral.balance[this.balanceSeleccionado].capital
    this.patrimonio2 = this.balanceGeneral.balance[this.balanceSeleccionado].reservas
    this.patrimonio3 = this.balanceGeneral.balance[this.balanceSeleccionado].utilidades
    this.patrimonio4 = this.balanceGeneral.balance[this.balanceSeleccionado].otros
    this.patrimonios = this.balanceGeneral.balance[this.balanceSeleccionado].totalPatrimonio

    this.totalPasivoPatrimonio = this.balanceGeneral.balance[this.balanceSeleccionado].totalPasivoPatrimonio
    this.updRatios()

  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  agregarBalance(){
    if(this.agregar == false){
      this.agregar = true
      this.fechaBalance = new Date()
      this.tipoBalance = ""
      this.tiempoBalance = ""
      this.tipoMoneda = ""
      this.tipoCambio = 0
      this.utilidades = 0
      this.ventas = 0
      this.activoCorriente1 = 0
      this.activoCorriente2 = 0
      this.activoCorriente3 = 0
      this.activoCorriente4 = 0
      this.activosCorrientes = 0
      this.activoNoCorriente1 = 0
      this.activoNoCorriente2 = 0
      this.activosNoCorrientes = 0
      this.activos = 0
      this.pasivoCorriente1 = 0
      this.pasivoCorriente2 = 0
      this.pasivosCorrientes = 0
      this.pasivoNoCorriente1 = 0
      this.pasivoNoCorriente2 = 0
      this.pasivosNoCorrientes = 0
      this.pasivos = 0
      this.patrimonio1 = 0
      this.patrimonio2 = 0
      this.patrimonio3 = 0
      this.patrimonio4 = 0
      this.patrimonios = 0
      this.totalPasivoPatrimonio = 0
      this.updRatios()

    }else{
      let nuevoBalance : Balance = {
        id : this.ultimoIdBalance(),
        num : this.ultimoNumBalance(),
        nombreBalance : "Balance " + (this.ultimoNumBalance()+1),
        fechaBalance : this.formatDate(this.fechaBalance),
        tipoBalance : this.tipoBalance,
        tipoBalanceIng : this.tipoBalance + " ing",
        tiempoBalance : this.tiempoBalance,
        tiempoBalanceIng : this.tiempoBalance + " ing",
        //CABECERA
        tipoMoneda : this.tipoMoneda,
        tipoCambioDolar : this.tipoCambio,
        ventas : this.ventas,
        utilidadesNetas : this.utilidades,
        //ACTIVO
        cajaBanco : this.activoCorriente1,
        porCobrar : this.activoCorriente2,
        inventario : this.activoCorriente3,
        otrosActivosCorrientes: this.activoCorriente4,
        activoCorriente : this.activosCorrientes,
        fijo : this.activoNoCorriente1,
        otrosActivosNoCorrientes : this.activoNoCorriente2,
        totalActivo : this.activos,
        //PASIVO
        bancoProv : this.pasivoCorriente1,
        otrosPasivosCorrientes : this.pasivoCorriente2,
        pasivoCorriente : this.pasivosCorrientes,
        largoPlazo : this.pasivoNoCorriente1,
        otrosPasivosNoCorrientes : this.pasivoNoCorriente2,
        totalPasivo : this.pasivos,
        //PATRIMONIO
        capital : this.patrimonio1,
        reservas : this.patrimonio2,
        utilidades : this.patrimonio3,
        otros : this.patrimonio4,
        totalPatrimonio : this.patrimonios,
        totalPasivoPatrimonio : this.totalPasivoPatrimonio,
      }
      this.balanceGeneral.balance.push(nuevoBalance)
      this.agregar = false
      this.updRatios()

    }
  }

  ultimoNumBalance() : number{
    let num = 0
    this.balanceGeneral.balance.forEach(balance => {
      if(num < balance.num){
        num = balance.num
      }
    });
    num += 1
    return num
  }
  ultimoIdBalance(){
    let id = 0
    this.balanceGeneral.balance.forEach(balance => {
      if(id < balance.id){
        id = balance.id
      }
    });
    id += 1
    return id
  }
}
