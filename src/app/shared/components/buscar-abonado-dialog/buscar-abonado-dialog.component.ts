
import { Component, ElementRef, Inject, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData } from 'app/models/dialog-data';
import { Abonado } from 'app/models/pedidos/abonado';
import { AbonadoService } from 'app/services/pedidos/abonado.service';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';


@Component({
  selector: 'app-buscar-abonado-dialog',
  templateUrl: './buscar-abonado-dialog.component.html',
  styleUrls: ['./buscar-abonado-dialog.component.scss'],
})
export class BuscarAbonadoDialogComponent implements AfterViewInit {

  codigoSeleccionado : string = ""

  columnsToDisplay = ['codigo', 'nombre', 'select'];

  dataSource: MatTableDataSource<Abonado>;
  botonDeshabilitado: boolean = true;
  codigoAbonado : string = ""

  @Output()
  eventSelectAbonado = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  titulo : string

  constructor(public dialogRef: MatDialogRef<BuscarAbonadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private abonadoService : AbonadoService) {
    this.dataSource = new MatTableDataSource(this.abonadoService.getAbonados())
    this.titulo = "Abonado"
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        tap(() => {
          this.applyFilter();
        })
      )
      .subscribe();
      this.dataSource.sort = this.sort;
  }
  applyFilter() {
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  realizarEnvioCodigo(codigo : string) {
    this.codigoAbonado = codigo
    this.dialogRef.close({ codigoAbonado: this.codigoAbonado });
  }

}
