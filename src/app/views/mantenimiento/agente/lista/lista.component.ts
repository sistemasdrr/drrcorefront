import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgenteT } from 'app/models/mantenimiento/agente';
import { AgenteService } from 'app/services/mantenimiento/agente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaAgenteComponent implements OnInit{
  breadscrums = [
    {
      title: 'Lista de Agentes',
      subtitle: '',
      items: ['Administración','Mantenimiento'],
      active: 'Agente',
    },
  ];

  loading : boolean = true

  //FILTROS
  codigo = ""
  nombre = ""
  estado = "A"

   //TABLA
   dataSource : MatTableDataSource<AgenteT>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   columnsToDisplay = ['code','name','address','email','telephone','country','acciones']

  constructor(private agenteService : AgenteService, private router : Router){
    this.dataSource = new MatTableDataSource()
  }
  ngOnInit(): void {
    this.loading = false
  }
  filtrarAgentes(){
    const listaAgentes = document.getElementById('loader-lista-agentes') as HTMLElement | null;
    if(listaAgentes){
      listaAgentes.classList.remove('hide-loader');
    }
    const busqueda = {
      codigo : this.codigo,
      nombre : this.nombre,
      estado : this.nombre,
    }
    localStorage.setItem('busquedaAgentes', JSON.stringify(busqueda))
    this.agenteService.getAgentes(this.codigo.trim(), this.nombre.trim(), this.estado).subscribe(
      (response) => {
        console.log(response.data)
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource = new MatTableDataSource(response.data)
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }
      },(error) => {
        if(listaAgentes){
          listaAgentes.classList.add('hide-loader');
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
        if(listaAgentes){
          listaAgentes.classList.add('hide-loader');
        }
      })
  }
  limpiar(){
    this.codigo = ""
    this.nombre = ""
    this.estado = "A"
    this.filtrarAgentes()
  }
  agregarAgente(){
    this.router.navigate(['mantenimiento/agente/detalle/nuevo']);
  }
  eliminarAgente(idAbonado : number){
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
        this.agenteService.deleteAgente(idAbonado).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarAgentes()
        })
      }
    });
  }
}
