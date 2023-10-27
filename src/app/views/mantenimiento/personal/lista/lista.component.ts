import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Personal } from 'app/models/mantenimiento/persona/personal';
import { PersonalService } from 'app/services/mantenimiento/personal.service';

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
  columnas = ['codigo','nombres','cargo','fechaIngreso','fechaNacimiento','estado','accion']
  dataSource : MatTableDataSource<Personal>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalService : PersonalService, private router : Router){
    this.dataSource = new MatTableDataSource()

  }

  ngOnInit(): void {
    this.dataSource.data = this.personalService.getPersonales()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregarPersonal(){

  }

  editarPersonal(id : number){
    this.router.navigate(['mantenimiento/personal/detalle/'+id]);
  }

  eliminarPersonal(id : number){

  }
}
