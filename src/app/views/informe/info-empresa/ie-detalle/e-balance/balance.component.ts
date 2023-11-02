import { Component, OnInit,   } from '@angular/core';
import { Balance, BalanceInforme,  } from 'app/models/informes/balance';
import { BalanceService } from 'app/services/informes/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  // options: data[] = [
  //   {
  //     name: 'PEN - Nuevos Soles (S/.)'
  //   },
  //   {
  //     name: 'USD - Dolár EstadoUnidense ($)'
  //   },
  //   {
  //     name: 'EUR - Euro (€)'
  //   },
  //   {
  //     name: 'JPY - Yen Japonés (¥)'
  //   },
  //   {
  //     name: 'MXN - Peso Mexicano ($)'
  //   },
  //   {
  //     name: 'CLP - Peso Chileno ($)'
  //   },
  //   {
  //     name: 'INR -Rupia India (₹)'
  //   },
  //   {
  //     name: 'RUB - Rublo Ruso (₽)'
  //   }];

  balanceSeleccionado : number = 0

  agregar : boolean = false

  fechaBalance : Date = new Date()
  tipoBalance : string = ""
  tiempoBalance : string = ""

  balanceInforme : BalanceInforme = {
    id : 0,
    idInforme : 0,
    balanceGeneral : [],
    balanceSituacional : []
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
  activosCorrientes : number = 0

  activoNoCorriente1 : number = 0
  activoNoCorriente2 : number = 0
  activosNoCorrientes : number = 0

  activos : number = 0

  pasivoCorriente1 : number = 0
  pasivoCorriente2 : number = 0
  pasivosCorrientes : number = 0

  pasivoNoCorriente1 : number = 0
  pasivoNoCorriente2 : number = 0
  pasivosNoCorrientes : number = 0

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

  constructor(private balanceService : BalanceService,
   ){
  }

  ngOnInit(): void {
    console.log("balance general")
    this.balanceInforme = this.balanceService.GeTbalanceInformeByIdInforme(1)
    this.actualizarBalance(this.balanceSeleccionado)
  }

  actualizarBalance(numBalance : number){
    this.agregar = false
    this.balanceSeleccionado = numBalance

    const fecha = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].fechaBalance.split("/");
    console.log(fecha)
    this.fechaBalance = new Date(parseInt(fecha[2]), parseInt(fecha[1])-1,parseInt(fecha[0]))

    this.tipoBalance = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].tipoBalance
    this.tiempoBalance = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].tiempoBalance

    this.tipoMoneda = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].tipoMoneda
    this.tipoCambio = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].tipoCambioDolar
    this.utilidades = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].utilidades
    this.ventas = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].ventas

    this.activoCorriente1 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].cajaBanco
    this.activoCorriente2 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].porCobrar
    this.activoCorriente3 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].inventario
    this.activoCorriente4 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].otrosActivosCorrientes
    this.activosCorrientes = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].activoCorriente

    this.activoNoCorriente1 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].fijo
    this.activoNoCorriente2 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].otrosActivosNoCorrientes
    this.activosNoCorrientes = this.activoNoCorriente1 + this.activoNoCorriente2

    this.activos = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].totalActivo

    this.pasivoCorriente1 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].bancoProv
    this.pasivoCorriente2 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].otrosPasivosCorrientes
    this.pasivosCorrientes = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].pasivoCorriente

    this.pasivoNoCorriente1 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].largoPlazo
    this.pasivoNoCorriente2 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].otrosActivosNoCorrientes
    this.pasivosNoCorrientes = this.pasivoNoCorriente1 + this.pasivoNoCorriente2

    this.pasivos = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].totalPasivo

    this.patrimonio1 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].capital
    this.patrimonio2 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].reservas
    this.patrimonio3 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].utilidades
    this.patrimonio4 = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].otros
    this.patrimonios = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].totalPatrimonio

    this.totalPasivoPatrimonio = this.balanceInforme.balanceGeneral[this.balanceSeleccionado].totalPasivoPatrimonio
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
      this.indiceLiquidez = 0
      this.ratioEndeudamiento = 0
      this.ratioRentabilidad = 0
      this.capitalTrabajo = 0
      this.updRatios()

    }else{
      const nuevoBalance : Balance = {
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
        activoNoCorriente : this.activosNoCorrientes,
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
        //RATIOS
        indiceLiquidez : this.indiceLiquidez,
        ratioEndeudamiento : this.ratioEndeudamiento,
        ratioRentabilidad : this.ratioRentabilidad,
        capitalTrabajo : this.capitalTrabajo
      }
      this.balanceInforme.balanceGeneral.push(nuevoBalance)
      console.log(nuevoBalance)
      this.agregar = false
      this.updRatios()

    }
  }
  cancelarAgregarBalance(){
    this.agregar = false
    this.balanceSeleccionado = 0
    this.actualizarBalance(0)
  }

  ultimoNumBalance() : number{
    let num = 0
    this.balanceInforme.balanceGeneral.forEach(balance => {
      if(num < balance.num){
        num = balance.num
      }
    });
    num += 1
    return num
  }
  ultimoIdBalance(){
    let id = 0
    this.balanceInforme.balanceGeneral.forEach(balance => {
      if(id < balance.id){
        id = balance.id
      }
    });
    id += 1
    return id
  }

  enter(event : any){
    console.log(event)
  }

  pintar(){
    console.log("balance mostrado")
  }
}
