import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import Swal from 'sweetalert2';
import { DeudaBancaria } from 'app/models/informes/empresa/sbs-riesgo';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Component({
  selector: 'app-deuda-bancaria',
  templateUrl: './deuda-bancaria.component.html',
  styleUrls: ['./deuda-bancaria.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class DeudaBancariaComponent implements OnInit{

  accion = ""
  titulo = ""

  id = 0
  idCompany = 0
  idPerson = 0
  bankName = ""
  qualification = ""
  debtDate = ""
  debtDateD : Date | null = null
  debtNc = 0
  debtFc = 0
  memo = ""
  memoEng = ""

  modelo : DeudaBancaria[] = []

  constructor(public dialogRef: MatDialogRef<DeudaBancariaComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private sbsService : SbsRiesgoService
  ){
    if(data.accion == "AGREGAR"){
      this.accion = data.accion
      this.titulo = "Agregar Deuda Bancaria"
      this.id = data.id
      this.idCompany= data.idCompany
    }else if(data.accion == "EDITAR"){
      this.titulo = "Editar Deuda Bancaria"
      this.id = data.id
      this.idCompany= data.idCompany
    }
  }
  ngOnInit(): void {
    if(this.id !== 0){
      this.sbsService.getBankDebtById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const deudaBancaria = response.data
            if(deudaBancaria){
              this.bankName = deudaBancaria.bankName
              this.qualification = deudaBancaria.qualification
              this.debtNc = deudaBancaria.debtNc
              this.debtFc = deudaBancaria.debtFc
              this.memo = deudaBancaria.memo
              this.memoEng = deudaBancaria.memoEng
              if(deudaBancaria.debtDate !== null && deudaBancaria.debtDate !== ''){
                const fecha = deudaBancaria.debtDate.split("/")
                if(fecha.length > 0){
                  this.debtDate = deudaBancaria.debtDate
                  this.debtDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
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
      bankName : this.bankName,
      qualification : this.qualification,
      debtDate : this.debtDate,
      debtNc : this.debtNc,
      debtFc : this.debtFc,
      memo : this.memo,
      memoEng : this.memoEng
    }
  }
  selectFecha1(event: MatDatepickerInputEvent<Date>) {
    this.debtDateD = event.value!
    if (moment.isMoment(this.debtDateD)) {
      this.debtDate = this.formatDate(this.debtDateD);
    }
  }
  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
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
          this.sbsService.addBankDebt(this.modelo[0]).subscribe(
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
          this.sbsService.addBankDebt(this.modelo[0]).subscribe(
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
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }
}
