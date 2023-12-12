import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-facturacion-web',
  templateUrl: './facturacion-web.component.html',
  styleUrls: ['./facturacion-web.component.scss']
})
export class FacturacionWebComponent implements OnInit {

  date = ""
  dateD : Date | null = new Date()
  nroCupones = 0
  precio = 0
  total = 0

  //TABLA HISTORIAL
  columnsToDisplay = ['fechaCompra','cantidadCupones','precioCupones','total']

  constructor(){

  }
  ngOnInit(): void {

  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  guardar(){

  }
  salir(){

  }
}
