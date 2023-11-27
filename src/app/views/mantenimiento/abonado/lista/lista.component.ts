import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbonadoT } from 'app/models/mantenimiento/abonado/abonado';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-abonado',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaAbonadoComponent implements OnInit{
  breadscrums = [
    {
      title: 'Lista de Abonados',
      subtitle: '',
      items: ['Administración','Mantenimiento'],
      active: 'Abonado',
    },
  ];

  loading : boolean = true

  //FILTROS
  codigo = ""
  nombre = ""
  estado = "A"

  //TABLA
  dataSource : MatTableDataSource<AbonadoT>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay = ['codigo','nombre','siglas','direccion','pais','acciones']

  constructor(private abonadoService : AbonadoService){
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
      estado : this.nombre,
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
  agregarAbonado(){

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
          text : 'El registro se elimino correctamente.',
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
}
