import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeudaBancaria } from 'app/models/deuda-bancaria';
import { DeudaBancariaService } from 'app/services/deuda-bancaria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deuda-bancaria',
  templateUrl: './deuda-bancaria.component.html',
  styleUrls: ['./deuda-bancaria.component.scss']
})
export class DeudaBancariaComponent {
  accion = ""
  titulo = ""
  id = 0

  banco = ""
  calificacion = ""
  deudaMN = ""
  deudaME = ""
  memo = ""
  memoIng = ""

  constructor(
    public dialogRef: MatDialogRef<DeudaBancariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deudaBancariaService : DeudaBancariaService
  ){
    if(data.accion == "AGREGAR"){
      this.accion = data.accion
      this.titulo = "Agregar Deuda Bancaria"
      this.id = data.id
    }else if(data.accion == "EDITAR"){
      this.titulo = "Editar Deuda Bancaria"
      const deuBanc : DeudaBancaria = this.deudaBancariaService.getDeudaBancariaById(data.id)
      this.id = deuBanc.id
      this.banco = deuBanc.banco
      this.calificacion = deuBanc.calificacion
      this.deudaMN = deuBanc.deudaMN
      this.deudaME = deuBanc.deudaME
      this.memo = deuBanc.memo
      this.memoIng = deuBanc.memoIng
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
    const obj : DeudaBancaria = {
      id : 0,
      banco : this.banco,
      calificacion : this.calificacion,
      deudaMN : this.deudaMN,
      deudaME : this.deudaME,
      memo : this.memo,
      memoIng : this.memoIng
    }
    this.deudaBancariaService.AddDeudaBancaria(obj)
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
        const obj : DeudaBancaria = {
          id : this.id,
          banco : this.banco,
          calificacion : this.calificacion,
          deudaMN : this.deudaMN,
          deudaME : this.deudaME,
          memo : this.memo,
          memoIng : this.memoIng
        }
        this.deudaBancariaService.UpdateDeudaBancaria(obj)
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
