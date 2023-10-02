import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MorosidadComercial } from 'app/models/morosidad-comercial';
import { MorosidadComercialService } from 'app/services/morosidad-comercial.service';
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
      this.montoMN = morCom.montoMN
      this.montoME = morCom.montoME
      this.fechaPago = morCom.fechaPago
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
}
