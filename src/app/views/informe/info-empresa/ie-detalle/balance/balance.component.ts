import { Component  } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {

  valorInput : string = ""
  activoCorriente1 : number = 0
  activoCorriente2 : number = 0
  activoCorriente3 : number = 0
  activoCorriente4 : number = 0
  activosCorrientes : number = this.activoCorriente1 + this.activoCorriente2 + this.activoCorriente3 + this.activoCorriente4

  activoNoCorriente1 : number = 0
  activoNoCorriente2 : number = 0
  activosNoCorrientes : number = this.activoNoCorriente1 + this.activoNoCorriente2

  activos : number = this.activosCorrientes + this.activosNoCorrientes

  getActivoCorriente(){
    this.activosCorrientes = this.activoCorriente1 + this.activoCorriente2 + this.activoCorriente3 + this.activoCorriente4
    this.activos = this.activosCorrientes + this.activosNoCorrientes
  }
  getActivoNoCorriente(){
    this.activosNoCorrientes = this.activoNoCorriente1 + this.activoNoCorriente2
    this.activos = this.activosCorrientes + this.activosNoCorrientes
  }

}
