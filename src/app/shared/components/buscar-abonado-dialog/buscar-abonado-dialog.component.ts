
import { Component, ElementRef, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData } from 'app/models/dialog-data';
import { Abonado } from 'app/models/abonado';
import { AbonadoService } from 'app/services/abonado.service';


@Component({
  selector: 'app-buscar-abonado-dialog',
  templateUrl: './buscar-abonado-dialog.component.html',
  styleUrls: ['./buscar-abonado-dialog.component.scss'],
})
export class BuscarAbonadoDialogComponent {

  codigoSeleccionado : string = ""

  columnsToDisplay = ['select', 'codigo', 'nombre'];

  dataSource: MatTableDataSource<Abonado>;
  botonDeshabilitado: boolean = true;
  codigoAbonado : string = ""

  @Output()
  eventSelectAbonado = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  public titulo : string = "titulo"

  setTitulo(titulo : string){
    this.titulo = titulo
  }


  constructor(public dialogRef: MatDialogRef<BuscarAbonadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private abonadoService : AbonadoService) {
    this.dataSource = new MatTableDataSource(this.abonadoService.getAbonados())
    this.titulo = data.data
  }
  setCodigoAbonado(codigo : string){
    this.codigoAbonado = codigo
    this.botonDeshabilitado = false;
  }
  realizarEnvioCodigo() {
    this.dialogRef.close({ codigoAbonado: this.codigoAbonado });
  }

}
