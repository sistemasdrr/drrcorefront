import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Personal } from 'app/models/mantenimiento/persona/personal';
import { PersonalService } from 'app/services/mantenimiento/personal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit {
  breadscrums = [
    {
      title: 'Lista de Personal',
      items: ['Administración','Mantenimiento'],
      active: 'Lista',
    },
  ];

  loading : boolean = true

  filtroNombre = ""

  dataSource : MatTableDataSource<Personal>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnas = ['codigo','nombres','departamento','cargo','fechaIngreso','fechaNacimiento','estado','accion']


  constructor(private personalService : PersonalService, private router : Router){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.personalService.getPersonales().subscribe((response) => {
      if(response.isSuccess == true){
        this.dataSource.data = response.data;
        console.log(response.data)
        this.loading = false
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregarPersonal(){
    this.router.navigate(['mantenimiento/personal/detalle/nuevo']);
  }
  editarPersonal(id : number){
    this.router.navigate(['mantenimiento/personal/detalle/'+id]);
  }
  desactivarPersonal(id : number){
    Swal.fire({
      title: '¿Está seguro de desactivar este registro?',
      text: "",
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.personalService.deletePersonal(id).subscribe(
          (response) => {
            console.log(response)
            Swal.fire({
              title: 'Se desactivo el registro con exito.',
              text: "",
              icon: 'success',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '40rem',
              heightAuto : true
            }).then(() => {

              this.actualizarTabla()
            })
        },(error) => {
          console.log(error)
        }
        );
      }
    })
  }
  activarPersonal(id : number){
    Swal.fire({
      title: '¿Está seguro de activar este registro?',
      text: "",
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.personalService.activePersonal(id).subscribe(
          (response) => {
            console.log(response)
            Swal.fire({
              title: 'Se activo el registro con exito.',
              text: "",
              icon: 'success',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '40rem',
              heightAuto : true
            }).then(() => {
              this.actualizarTabla()
            })
        },(error) => {
          console.log(error)
        }
        );
      }
    })
  }
  actualizarTabla(){
    this.loading = true
    this.personalService.getPersonales().subscribe((response) => {
      if(response.isSuccess == true){
        this.dataSource.data = response.data;
        this.loading = false
      }
    },(error) => {
      this.loading = false
      Swal.fire({
        title: 'Ocurrió  un problema al actualizar la tabla',
        text: error,
        showCancelButton: true,
        cancelButtonText : 'Cerrar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Recargar la página',
        width: '40rem',
        heightAuto : true
      }).then(() => {
        this.router.navigate(['mantenimiento/personal/lista'])

      })
    });
  }
  enter(event : KeyboardEvent){
    if(event.code == 'Enter'){
      this.aplicarFiltro()
    }
  }
  aplicarFiltro(){
    this.loading = true
    if(this.filtroNombre !== ""){
      this.personalService.getPersonalByName(this.filtroNombre).subscribe((response) => {
        if(response.isSuccess == true){
          this.dataSource.data = response.data;
        }
        this.loading = false
      });
    }else{
      this.actualizarTabla()
      this.loading = false
    }
  }
}
