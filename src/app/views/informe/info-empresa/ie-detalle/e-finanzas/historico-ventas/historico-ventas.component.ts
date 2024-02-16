import { Component, Inject, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComboData } from 'app/models/combo';
import { HistoricoVentas } from 'app/models/informes/empresa/situacion-financiera';
import { ComboService } from 'app/services/combo.service';
import { FinanzasService } from 'app/services/informes/empresa/finanzas.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-historico-ventas',
  templateUrl: './historico-ventas.component.html',
  styleUrls: ['./historico-ventas.component.scss'],
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
export class HistoricoVentasComponent implements OnInit {

  accion = ""
  titulo = ""

  id = 0
  idCompany = 0
  listaMonedas : ComboData[] = []
  idMoneda = 0
  fecha : string = ""
  fechaD : Date = new Date()
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
                  this.fechaD = new Date(historicoVenta.date)

                }
              }
            }
          )
        }
      }
    )
  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.fechaD = event.value!;
    if (moment.isMoment(this.fechaD)) {
      this.fecha = this.formatDate(this.fechaD);
    }
  }

  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }
  armarModelo(){
    this.modelo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idCurrency : this.idMoneda,
      date : new Date(this.fechaD),
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
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.finanzasService.addOrUpdateHistoricoVentas(this.modelo[0]).subscribe((response) => {
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
              }).then(() => {
                this.dialogRef.close()
              })
            }else{
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
    }
  }
  salir(){
    this.dialogRef.close()
  }
}
