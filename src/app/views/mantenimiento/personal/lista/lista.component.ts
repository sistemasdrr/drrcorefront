import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComboData } from 'app/models/combo';
import { Personal } from 'app/models/mantenimiento/personal';
import { ComboService } from 'app/services/combo.service';
import { PersonalService } from 'app/services/mantenimiento/personal.service';
import Swal from 'sweetalert2';
import { PermisosComponent } from './permisos/permisos.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaPersonalComponent implements OnInit, AfterViewInit {
  breadscrums = [
    {
      title: 'Lista de Personal',
      items: ['Administración','Mantenimiento'],
      active: 'Personal',
    },
  ];

  loading : boolean = true

  filtroNombre = ""
  filtroDepartamento = 0

  departamentos : ComboData[] = []

  dataSource : MatTableDataSource<Personal>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnas = ['code','shortName','department','job','startDate','birthday','enable','accion']


  constructor(private personalService : PersonalService, private comboService : ComboService, private router : Router,private dialog : MatDialog){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.comboService.getDepartamento().subscribe(response => {
      if(response.isSuccess == true){
        this.departamentos = response.data;
      }
    });
    this.personalService.getPersonales().subscribe(
      (response) => {
      if(response.isSuccess == true){
        this.dataSource.data = response.data;
        this.dataSource.sort = this.sort;
        console.log(response.data)
        this.loading = false
      }
    },() => {
      this.loading = false;
        Swal.fire({
          title: 'Ocurrió un problema. Comunicarse con Sistemas.',
          text: '',
          icon: 'warning',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok',
          width: '30rem',
          heightAuto : true
        }).then(() => {
        })
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilterDepartamento(){
    console.log(this.filtroDepartamento)
    this.dataSource.data =  this.dataSource.data.filter(x => x.idJobDepartment === this.filtroDepartamento)
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
        this.loading = true
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
              this.loading = false
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
        this.loading = true
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
              this.loading = false
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
  editarPermisos(id : number){
    const dialogRef = this.dialog.open(PermisosComponent, {
      data : {
        id : id
      },
    });
  }
}
