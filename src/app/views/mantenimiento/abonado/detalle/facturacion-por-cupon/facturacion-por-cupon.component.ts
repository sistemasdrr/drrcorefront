import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-facturacion-por-cupon',
  templateUrl: './facturacion-por-cupon.component.html',
  styleUrls: ['./facturacion-por-cupon.component.scss']
})
export class FacturacionPorCuponComponent implements OnInit{

  date = ""
  dateD : Date | null = new Date()
  nroCupones = 0
  precioT0 = 0
  precioT1 = 0
  precioT2 = 0
  precioT3 = 0

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
    return `${month}/${day}/${year}`;
  }
  guardar(){

  }
  salir(){

  }
}
