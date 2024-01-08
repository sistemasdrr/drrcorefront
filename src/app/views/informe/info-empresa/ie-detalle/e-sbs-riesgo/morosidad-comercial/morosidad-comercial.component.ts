import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MorosidadComercial } from 'app/models/informes/empresa/sbs-riesgo';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-morosidad-comercial',
  templateUrl: './morosidad-comercial.component.html',
  styleUrls: ['./morosidad-comercial.component.scss']
})
export class MorosidadComercialComponent implements OnInit{
  accion = ""
  titulo = ""

  id = 0
  idCompany = 0
  idPerson = 0
  creditorOrSupplier = ""
  documentType = ""
  documentTypeEng = ""
  date = ""
  dateD : Date | null = null
  amountNc = 0
  amountFc = 0
  pendingPaymentDate = ""
  pendingPaymentDateD : Date | null = null
  daysLate = 0

  modelo : MorosidadComercial[] = []

  constructor(private sbsService : SbsRiesgoService, public dialogRef: MatDialogRef<MorosidadComercialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    if(data.accion == "AGREGAR"){
      this.accion = data.accion
      this.titulo = "Agregar Morosidad Comercial"
      this.id = 0
      this.idCompany = data.idCompany
    }else if(data.accion == "EDITAR"){
      this.accion = data.accion
      this.titulo = "Editar Morosidad Comercial"
      this.id = data.id
      this.idCompany = data.idCompany
    }
  }
  ngOnInit(): void {
    if(this.id !== 0 ){
      this.sbsService.getLatePaymentById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const morosidad = response.data
            if(morosidad){
              this.creditorOrSupplier = morosidad.creditorOrSupplier
              this.documentType = morosidad.documentType
              this.documentTypeEng = morosidad.documentTypeEng
              this.creditorOrSupplier = morosidad.creditorOrSupplier
              this.amountNc = morosidad.amountNc
              this.amountFc = morosidad.amountFc
              this.daysLate = morosidad.daysLate
              if(morosidad.date !== null && morosidad.date !== ''){
                const fecha = morosidad.date.split("/")
                if(fecha.length > 0){
                  this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.date = morosidad.date
                }else{
                  this.dateD = null
                }
              }
              if(morosidad.pendingPaymentDate !== null && morosidad.pendingPaymentDate !== ''){
                const fecha = morosidad.pendingPaymentDate.split("/")
                if(fecha.length > 0){
                  this.pendingPaymentDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.pendingPaymentDate = morosidad.pendingPaymentDate
                }else{
                  this.pendingPaymentDateD = null
                }
              }
            }
          }
        }
      )
    }
  }
  armarModelo(){
    this.modelo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idPerson : this.idPerson,
      creditorOrSupplier : this.creditorOrSupplier,
      documentType : this.documentType,
      documentTypeEng : this.documentTypeEng,
      date : this.date,
      amountNc : this.amountNc,
      amountFc : this.amountFc,
      pendingPaymentDate : this.pendingPaymentDate,
      daysLate : this.daysLate
    }
  }

  volver(){
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardaran",
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
        this.dialogRef.close()
      }
    })
  }
  guardar(){
    this.armarModelo()
    console.log(this.modelo[0])
    if(this.id === 0){
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          this.sbsService.addLatePayment(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se agregó correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.dialogRef.close()
                })
              }
            }
          )
        }
      })
    }else{
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          this.sbsService.addLatePayment(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se modificó correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.dialogRef.close()
                })
              }
            }
          )
        }
      })
    }
  }

  selectFecha1(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  selectFecha2(event: MatDatepickerInputEvent<Date>) {
    this.pendingPaymentDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.pendingPaymentDate = this.formatDate(selectedDate);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
