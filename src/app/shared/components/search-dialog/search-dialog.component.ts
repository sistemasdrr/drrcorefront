
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData } from 'app/models/dialog-data';

interface Abonado {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent {


  columnsToDisplay = ['codigo', 'nombre', 'Seleccionar'];

  dataSource: MatTableDataSource<Abonado>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  public titulo : string = "titulo"

  listaAbonados : Abonado[] = [
    {
      codigo : "1",
      nombre : "Abonado 1"
    },
    {
      codigo : "2",
      nombre : "Abonado 2"
    },
    {
      codigo : "3",
      nombre : "Abonado 3"
    },
    {
      codigo : "4",
      nombre : "Abonado 4"
    },
    {
      codigo : "5",
      nombre : "Abonado 5"
    },
    {
      codigo : "6",
      nombre : "Abonado 6"
    },
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dataSource = new MatTableDataSource(this.listaAbonados)
  }
}
