import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbonadoT } from 'app/models/mantenimiento/abonado';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-abonados',
  templateUrl: './lista-abonados.component.html',
  styleUrls: ['./lista-abonados.component.scss']
})
export class ListaAbonadosComponent implements OnInit{
  loading = false

  //FILTROS
  codigo = ""
  nombre = ""
  estado = "A"

  //TABLA
  dataSource : MatTableDataSource<AbonadoT>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //columnsToDisplay = ['codigo','nombre','siglas','direccion','pais','acciones']
  columnsToDisplay = ['codigo','nombre','pais','tipoFacturacion','acciones']

  constructor(public dialogRef: MatDialogRef<ListaAbonadosComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private abonadoService : AbonadoService, private router : Router){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {

    this.abonadoService.getAbonados(this.codigo, this.nombre, this.estado).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
        }
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }

  filtrarAbonados(){
    const listaAbonados = document.getElementById('loader-lista-abonados') as HTMLElement | null;
    if(listaAbonados){
      listaAbonados.classList.remove('hide-loader');
    }
    const busqueda = {
      codigo : this.codigo,
      nombre : this.nombre,
      estado : this.estado,
    }
    localStorage.setItem('busquedaAbonados', JSON.stringify(busqueda))
    this.abonadoService.getAbonados(this.codigo.trim(), this.nombre.trim(), this.estado).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource = new MatTableDataSource(response.data)
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }
      },(error) => {
        if(listaAbonados){
          listaAbonados.classList.add('hide-loader');
        }
        Swal.fire({
          title: 'Ocurrió un problema. Comunicarse con Sistemas.',
          text: error,
          icon: 'warning',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok',
          width: '40rem',
          heightAuto : true
        }).then(() => {
        })
      }).add(() => {
        if(listaAbonados){
          listaAbonados.classList.add('hide-loader');
        }
      })
  }
  limpiar(){
    this.codigo = ""
    this.nombre = ""
    this.estado = "A"
    this.filtrarAbonados()
  }
  seleccionarAbonado(id : number){
    this.dialogRef.close(
      {id : id}
    )
  }
  eliminarAbonado(idAbonado : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
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
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se eliminó correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.abonadoService.deleteAbonado(idAbonado).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarAbonados()
        })
      }
    });
  }
  activarAbonado(idAbonado : number){
    Swal.fire({
      title: '¿Está seguro de activar este registro?',
      text: "",
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
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se activó correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.abonadoService.activeAbonado(idAbonado).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarAbonados()
        })
      }
    });
  }
}

