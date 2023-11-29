import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecioAgenteT } from 'app/models/mantenimiento/agente';
import { AgenteService } from 'app/services/mantenimiento/agente.service';
import Swal from 'sweetalert2';
import { AgregarEditarAgenteComponent } from './agregar-editar/agregar-editar.component';

@Component({
  selector: 'app-precios-agente',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosAgenteComponent implements OnInit{
  //TABLA
  dataSource : MatTableDataSource<PrecioAgenteT>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['fecha','pais','precioT1','precioT2','precioT3','precioPN','precioBD','precioRP','precioCR','moneda','acciones']

  id = 0

  constructor(private dialog : MatDialog,private router : Router, private agenteService : AgenteService, private activatedRoute : ActivatedRoute){
    this.dataSource = new MatTableDataSource()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    if(this.id > 0){
      this.agenteService.getPreciosPorIdAgente(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSource = new MatTableDataSource(response.data)
          }
        }
      )
    }
  }

  agregarPrecio(){
    const dialogRef = this.dialog.open(AgregarEditarAgenteComponent, {
      data : {
        id : 0
      },
    });
  }
  editarPrecio(idPrecio : number){
    const dialogRef = this.dialog.open(AgregarEditarAgenteComponent, {
      data : {
        id : idPrecio
      },
    });
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
