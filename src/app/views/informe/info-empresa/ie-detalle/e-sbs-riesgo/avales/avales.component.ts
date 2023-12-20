import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Avales } from 'app/models/informes/empresa/sbs-riesgo';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avales',
  templateUrl: './avales.component.html',
  styleUrls: ['./avales.component.scss']
})
export class AvalesComponent implements OnInit{

  accion = ""
  titulo = ""

  id = 0
  idCompany = 0
  endorsementName = ""
  ruc = ""
  amountUs = 0
  amountNc = 0
  date = ""
  dateD : Date | null = null
  receivingEntity = ""

  modelo : Avales[] = []

  constructor(private sbsService : SbsRiesgoService, public dialogRef: MatDialogRef<AvalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    if(data.accion == "AGREGAR"){
      this.accion = data.accion
      this.titulo = "Agregar Aval"
      this.id = 0
      this.idCompany = data.idCompany
    }else if(data.accion == "EDITAR"){
      this.accion = data.accion
      this.titulo = "Editar Aval"
      this.id = data.id
      this.idCompany = data.idCompany
    }
  }
  ngOnInit(): void {
    if(this.id !== 0 ){
      this.sbsService.getEndorsementById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const aval = response.data
            if(aval){
              this.endorsementName = aval.endorsementName
              this.ruc = aval.ruc
              this.amountUs = aval.amountUs
              this.amountNc = aval.amountNc
              this.receivingEntity = aval.receivingEntity
              if(aval.date !== null && aval.date !== ''){
                const fecha = aval.date.split("/")
                if(fecha.length > 0){
                  this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.date = aval.date
                }else{
                  this.dateD = null
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
      endorsementName : this.endorsementName,
      ruc : this.ruc,
      amountUs : this.amountUs,
      amountNc : this.amountNc,
      date : this.date,
      receivingEntity : this.receivingEntity,
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
          this.sbsService.addEndorsements(this.modelo[0]).subscribe(
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
          this.sbsService.addEndorsements(this.modelo[0]).subscribe(
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
}
