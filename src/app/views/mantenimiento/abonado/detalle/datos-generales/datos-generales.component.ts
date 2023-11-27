import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss']
})
export class DatosGeneralesComponent implements OnInit {

  //DATOS GENERALES
  id = 0
  code = ""
  idContinent = 0
  idCountry = 0
  city = ""
  incomeDate = ""
  incomeDateD : Date | null = null
  name = ""
  acronym = ""
  address = ""
  language = ""
  telephone = ""
  fax = ""
  email = ""
  webPage = ""
  principalContact = ""
  idRubro = 0
  taxRegistration = ""
  sendReportToName = ""
  sendReportToTelephone = ""
  sendReportToEmail = ""
  sendInvoiceToName = ""
  sendInvoiceToTelephone = ""
  sendInvoiceToEmail = ""
  additionalContactName = ""
  additionalContactTelephone = ""
  additionalContactEmail = ""
  observations = ""
  indications = ""
  maximumCredit = false
  revealName = false
  abonadoType = ""
  currency = ""
  facturationType = ""
  normalPrice = false


  constructor(private router : Router){

  }
  ngOnInit(): void {

  }

  selectFechaIngreso(event: MatDatepickerInputEvent<Date>) {
    this.incomeDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.incomeDate = this.formatDate(selectedDate);
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
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardarán",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['mantenimiento/abonado/lista'])
      }
    })
  }
}
