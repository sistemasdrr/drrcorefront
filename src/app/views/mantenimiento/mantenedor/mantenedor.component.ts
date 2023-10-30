import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MantenimientoGeneral } from 'app/models/mantenimiento/general/mantenimiento-general';
import { GeneralService } from 'app/services/mantenimiento/general.service';



@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.component.html',
  styleUrls: ['./mantenedor.component.scss']
})
export class MantenedorComponent implements OnInit {
  breadscrums = [
    {
      title: 'Mantenedor General',
      items: ['Administración','Mantenimiento'],
      active: 'General',
    },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource : MatTableDataSource<MantenimientoGeneral>
  columnas = ['codigo','descripcion', 'estado','opciones']
  constructor(private generalService : GeneralService){
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator

  }

  ngOnInit(): void {
    this.dataSource.data = this.generalService.getListaMantenimientoGeneral()
  }

}
