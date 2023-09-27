import { PaisService } from './../../../services/pais.service';
import { Pais } from 'app/models/pais';
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaPersona } from 'app/models/empresa-persona';
import { EmpresaPersonaService } from 'app/services/empresa-persona.service';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';


@Component({
  selector: 'app-buscar-empresa-dialog',
  templateUrl: './buscar-empresa-dialog.component.html',
  styleUrls: ['./buscar-empresa-dialog.component.scss']
})
export class BuscarEmpresaDialogComponent implements AfterViewInit{

  titulo : string = "Empresas o Personas"
  mostrarEmpresas : boolean = true
  codigoSeleccionado : string = ""
  datos : EmpresaPersona = {
    codigo : "",
    tipo : "",
    nombreBuscado : "",
    nombreSolicitado : "",
    continente : "",
    pais : 0,
    ciudad : "",
    ruc : "",
    fecha : "",
    situacion : "",
    direccion : "",
    correo : "",
    telefono : ""
  }
  paises : Pais[] = []
  columnsToDisplay = ['select', 'nombreBuscado', 'nombreSolicitado', 'pais', 'ruc', 'fecha', 'situacion'];

  dataSource: MatTableDataSource<EmpresaPersona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;
  @Output()
  eventSelectAbonado = new EventEmitter<string>();
  constructor(public dialogRef: MatDialogRef<BuscarEmpresaDialogComponent>, private empresaPersonaService : EmpresaPersonaService, private paisService : PaisService){
    this.dataSource = new MatTableDataSource(this.empresaPersonaService.getEmpresasPersonas())
    this.paises = this.paisService.getPaises()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
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
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value.toLowerCase().trim();
    this.dataSource.filter = filterValue;
  }


  seleccionarCodigoEmpresa(cod : string){
    this.codigoSeleccionado = cod
  }
  realizarEnvioCodigo() {
    this.dialogRef.close({ datos: this.codigoSeleccionado });
  }

}
