import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCuponComponent } from './agregar-cupon/agregar-cupon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { MatTableDataSource } from '@angular/material/table';
import { FacturacionPorCupones, HistorialFacturacionPorCupones } from 'app/models/mantenimiento/abonado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion-por-cupon',
  templateUrl: './facturacion-por-cupon.component.html',
  styleUrls: ['./facturacion-por-cupon.component.scss']
})
export class FacturacionPorCuponComponent implements OnInit{
  id = 0
  idSubscriber = 0

  nroCupones = 0
  precioT0 = 0
  precioT1 = 0
  precioT2 = 0
  precioT3 = 0
  facturacionPorCupon : FacturacionPorCupones[] = []

  dataSource = new MatTableDataSource<HistorialFacturacionPorCupones>
  columnsToDisplay = ['fecha','monto','precioUnidad','precioTotal']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router : Router,private dialog : MatDialog,private activatedRoute : ActivatedRoute, private abonadoService : AbonadoService){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idSubscriber = 0
    } else {
      this.idSubscriber = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    if(this.idSubscriber > 0){
      this.abonadoService.getFacturacionPorCupones(this.idSubscriber).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            console.log(response.data)
            const facturacion = response.data
            if(facturacion){
              this.id = facturacion.id
              this.nroCupones = facturacion.numCoupon
              this.precioT0 = facturacion.priceT0
              this.precioT1 = facturacion.priceT1
              this.precioT2 = facturacion.priceT2
              this.precioT3 = facturacion.priceT3
            }
          }
        }
      ).add(
        () => {
          this.abonadoService.getHistorialFacturacionPorCupones(this.idSubscriber).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.dataSource.data = response.data
                this.dataSource.paginator = this.paginator
              }
            }
          )
        }
      )
    }
  }

  agregarCupones(){
    const dialogRef = this.dialog.open(AgregarCuponComponent, {
      data : {
        idCouponBilling : this.id,
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.abonadoService.getFacturacionPorCupones(this.idSubscriber).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              console.log(response.data)
              const facturacion = response.data
              if(facturacion){
                this.id = facturacion.id
                this.nroCupones = facturacion.numCoupon
                this.precioT0 = facturacion.priceT0
                this.precioT1 = facturacion.priceT1
                this.precioT2 = facturacion.priceT2
                this.precioT3 = facturacion.priceT3
              }
            }
          }
        )
        this.abonadoService.getHistorialFacturacionPorCupones(this.idSubscriber).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSource.data = response.data
              this.dataSource.paginator = this.paginator
            }
          }
        )
      }
    )
  }
  guardar(){
    this.facturacionPorCupon[0] = {
      id : this.id,
      idSubscriber : this.idSubscriber,
      numCoupon : this.nroCupones,
      priceT1 : this.precioT1,
      priceT2 : this.precioT2,
      priceT3 : this.precioT3,
      priceT0 : this.precioT0
    }
    console.log(this.facturacionPorCupon[0])
    if(this.id > 0){
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
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
          this.abonadoService.addFacturacionPorCupones(this.facturacionPorCupon[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'Se modificó el registro correctamente',
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
          )
        }
      })
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
          this.abonadoService.addFacturacionPorCupones(this.facturacionPorCupon[0]).subscribe(
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
          )
        }
      })
    }
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
