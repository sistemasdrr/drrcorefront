import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PrecioAbonadoT } from 'app/models/mantenimiento/abonado/abonado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit{

 //TABLA
 dataSource : MatTableDataSource<PrecioAbonadoT>;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 columnsToDisplay = ['fecha','pais','precioT1','precioT2','precioT3','precioB','moneda','acciones']

  constructor(private router : Router){
    this.dataSource = new MatTableDataSource()
  }
  ngOnInit(): void {

  }

  guardar(){

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
