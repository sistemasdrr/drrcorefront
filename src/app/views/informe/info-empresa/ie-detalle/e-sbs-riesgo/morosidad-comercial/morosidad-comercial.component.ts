import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MorosidadComercial } from 'app/models/informes/morosidad-comercial';
import { MorosidadComercialService } from 'app/services/informes/morosidad-comercial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-morosidad-comercial',
  templateUrl: './morosidad-comercial.component.html',
  styleUrls: ['./morosidad-comercial.component.scss']
})
export class MorosidadComercialComponent {
  accion = ""
  titulo = ""
  id = 0

  acreProv = ""
  tipoDoc = ""
  fecha = ""
  montoMN = ""
  montoME = ""
  fechaPago = ""
  diasAtraso = ""

  fechaSeleccionada : Date = new Date()
  fechaPagoSeleccionada : Date = new Date()
  constructor(
    public dialogRef: MatDialogRef<MorosidadComercialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private morosidadComercialService : MorosidadComercialService
  ){
    if(data.accion == "AGREGAR"){
      this.accion = data.accion
      this.titulo = "Agregar Morosidad Comercial"
      this.id = data.id
    }else if(data.accion == "EDITAR"){
      this.accion = data.accion
      this.titulo = "Editar Morosidad Comercial"
      this.id = data.id
      const morCom : MorosidadComercial = this.morosidadComercialService.GetMorosidadComercialById(data.id)
      this.id = morCom.id
      this.acreProv = morCom.acreProv
      this.tipoDoc = morCom.tipoDocumento
      this.fecha = morCom.fecha
      const fecha = this.fecha.split("/");
      console.log(fecha)
      this.fechaSeleccionada = new Date(parseInt(fecha[2]), parseInt(fecha[1])-1,parseInt(fecha[0]))
      this.montoMN = morCom.montoMN
      this.montoME = morCom.montoME
      this.fechaPago = morCom.fechaPago
      const fechaPago = this.fechaPago.split("/");
      console.log(fechaPago)
      this.fechaPagoSeleccionada = new Date(parseInt(fechaPago[2]), parseInt(fechaPago[1])-1,parseInt(fechaPago[0]))
      this.diasAtraso = morCom.diasAtraso
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
  agregar(){
    const obj : MorosidadComercial = {
      id : 0,
      acreProv : this.acreProv,
      tipoDocumento : this.tipoDoc,
      fecha : this.fecha,
      montoMN : this.montoMN,
      montoME : this.montoME,
      fechaPago : this.fechaPago,
      diasAtraso : this.diasAtraso
    }
    this.morosidadComercialService.AddMorosidadComercial(obj)
    Swal.fire({
      title :'¡Registrado!',
      text : 'El registro se guardo correctamente.',
      icon : 'success',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }
  editar(){
    Swal.fire({
      title: '¿Está seguro de editar este registro?',
      text: "",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        const obj : MorosidadComercial = {
          id : this.id,
          acreProv : this.acreProv,
          tipoDocumento : this.tipoDoc,
          fecha : this.fecha,
          montoMN : this.montoMN,
          montoME : this.montoME,
          fechaPago : this.fechaPago,
          diasAtraso : this.diasAtraso
        }
        this.morosidadComercialService.UpdateMorosidadComercial(obj)
        Swal.fire({
          title :'¡Actualizado!',
          text : 'El registro se edito correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        }).then((result) => {
          if (result.value) {
            this.dialogRef.close()
          }
        })
      }
    })
  }

  onDateChange1(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fecha = this.formatDate(selectedDate)
    }
  }
  onDateChange2(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaPago = this.formatDate(selectedDate)
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
