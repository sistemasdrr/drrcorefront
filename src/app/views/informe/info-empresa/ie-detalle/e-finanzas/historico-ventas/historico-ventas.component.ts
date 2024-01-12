import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComboData } from 'app/models/combo';
import { HistoricoVentas } from 'app/models/informes/empresa/situacion-financiera';
import { ComboService } from 'app/services/combo.service';
import { FinanzasService } from 'app/services/informes/empresa/finanzas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historico-ventas',
  templateUrl: './historico-ventas.component.html',
  styleUrls: ['./historico-ventas.component.scss']
})
export class HistoricoVentasComponent implements OnInit {

  accion = ""
  titulo = ""

  id = 0
  idCompany = 0
  listaMonedas : ComboData[] = []
  idMoneda = 0
  fecha : string = ""
  fechaD : Date | null = null
  ventas = 0
  tc = 0
  equivaleDolar = 0
  modelo : HistoricoVentas[] = []

  constructor(private finanzasService : FinanzasService, private comboService : ComboService, public dialogRef: MatDialogRef<HistoricoVentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
  }

  ngOnInit(): void {
    this.comboService.getTipoMoneda().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaMonedas = response.data
        }
      }
    ).add(
      () => {
        this.id = this.data.id
        this.idCompany = this.data.idCompany
        if(this.id === 0){
          this.titulo = "Agregar Historico de Venta"

        }else{
          this.titulo = "Editar Historico de Venta"
          this.finanzasService.getHistoricoVenta(this.id).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning ===false){
                const historicoVenta = response.data
                if(historicoVenta !== null){
                  this.idMoneda = historicoVenta.idCurrency
                  this.ventas = historicoVenta.amount
                  this.tc = historicoVenta.exchangeRate
                  this.equivaleDolar = historicoVenta.equivalentToDollars
                  if(historicoVenta.date !== null || historicoVenta.date !== ''){
                    const fecha = historicoVenta.date.split("/")
                    if(fecha){
                      this.fechaD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.fecha = historicoVenta.date
                    }
                  }else{
                    this.fecha = ""
                    this.fechaD = null
                  }
                }
              }
            }
          )
        }
      }
    )
  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.fechaD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.fecha = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  armarModelo(){
    this.modelo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idCurrency : this.idMoneda,
      date : this.fecha,
      amount : this.ventas,
      exchangeRate : this.tc,
      equivalentToDollars : this.equivaleDolar
    }
  }
  actualizarCampo(){
    if(this.ventas !== 0 && this.tc !== 0){
      this.equivaleDolar = this.ventas / this.tc
      this.equivaleDolar = parseFloat(this.equivaleDolar.toFixed(2));
    }
  }
  guardar(){
    this.armarModelo()
    console.log(this.modelo[0])
    if(this.id > 0){
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.finanzasService.addOrUpdateHistoricoVentas(this.modelo[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Se guardaron los cambios correctamente',
              text: "",
              icon: 'success',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto: true
            }).then(() => {
              this.dialogRef.close()
            })
          }else{
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: 'Comunicarse con Sistemas',
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
              this.dialogRef.close()
            })
          }
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
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

          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          this.finanzasService.addOrUpdateHistoricoVentas(this.modelo[0]).subscribe((response) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Se agregó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              }).then(() => {
                this.dialogRef.close()
              })
            }else{
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              }).then(() => {
                this.dialogRef.close()
              })
            }
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema. Comunicarse con Sistemas',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
              this.dialogRef.close()
            })
          })
        }
      });

    this.dialogRef.close()
    }
  }
  salir(){
    this.dialogRef.close()
  }
}
