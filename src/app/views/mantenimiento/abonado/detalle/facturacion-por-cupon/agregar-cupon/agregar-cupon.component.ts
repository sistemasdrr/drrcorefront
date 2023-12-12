import { HistorialFacturacionPorCupones } from './../../../../../../models/mantenimiento/abonado';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cupon',
  templateUrl: './agregar-cupon.component.html',
  styleUrls: ['./agregar-cupon.component.scss']
})
export class AgregarCuponComponent implements OnInit {
  titulo = ""
  accion = ""

  //FORM
  id = 0
  idCouponBilling = 0
  date = ""
  dateD : Date | null = null
  couponAmount = 0
  unitPrice = 0

  historial : HistorialFacturacionPorCupones[] = []

  constructor(private activatedRoute : ActivatedRoute,public dialogRef: MatDialogRef<AgregarCuponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private abonadoService : AbonadoService){
    if(data){
      this.idCouponBilling = data.idCouponBilling

      console.log(this.idCouponBilling)
    }
  }
  ngOnInit(): void {

  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
      console.log(this.date)
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  guardar(){
    this.historial[0] = {
      id : this.id,
      idCouponBilling : this.idCouponBilling,
      idEmployee : 0,
      purchaseDate : this.date,
      couponAmount : this.couponAmount,
      couponUnitPrice : this.unitPrice,
      totalPrice : this.couponAmount * this.unitPrice
    }
    console.log(this.historial[0])
    if(this.id === 0){
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          this.abonadoService.addHistorialFacturacionPorCupones(this.historial[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'Se agregó el registro correctamente',
                  text: "",
                  icon: 'success',
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                  width: '30rem',
                  heightAuto: true
                })
              }
            }
          ).add(
            () => {
              this.dialogRef.close()
            }
          )
        }
      })
    }
  }
  salir(){
    this.dialogRef.close()
  }
}
