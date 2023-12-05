import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecioAbonadoT } from 'app/models/mantenimiento/abonado';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import Swal from 'sweetalert2';
import { AgregarEditarPrecioAbonadoComponent } from './agregar-editar/agregar-editar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-precios-abonado',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosAbonadoComponent implements OnInit{

  //TABLA
  dataSource : MatTableDataSource<PrecioAbonadoT>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['fecha','pais','precioT1','precioT2','precioT3','precioB','moneda','acciones']

  id = 0

  constructor(private dialog : MatDialog,private router : Router, private abonadoService : AbonadoService, private activatedRoute : ActivatedRoute){
    this.dataSource = new MatTableDataSource()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {

    console.log(this.id)
    if(this.id > 0){
      this.abonadoService.getPreciosPorIdAbonado(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSource = new MatTableDataSource(response.data)
            console.log(response)
          }
        }
      )
    }
  }
  agregarPrecio(){
    const dialogRef = this.dialog.open(AgregarEditarPrecioAbonadoComponent, {
      data : {
        id : 0,
        idSubscriber : this.id
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.abonadoService.getPreciosPorIdAbonado(this.id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSource = new MatTableDataSource(response.data)
            }
          }
        )
      }
    )
  }
  editarPrecio(idPrecio : number){
    const dialogRef = this.dialog.open(AgregarEditarPrecioAbonadoComponent, {
      data : {
        id : idPrecio,
        idSubscriber : this.id
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.abonadoService.getPreciosPorIdAbonado(this.id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSource = new MatTableDataSource(response.data)
            }
          }
        )
      }
    )
  }
  eliminarPrecio(id : number) {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
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
        this.abonadoService.deletePrecio(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'Se eliminó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              })
            }
          })
      }
    })

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
