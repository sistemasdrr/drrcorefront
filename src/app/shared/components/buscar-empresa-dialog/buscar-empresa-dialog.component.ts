import { PaisService } from './../../../services/pais.service';
import { Pais } from 'app/models/pais';
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';


@Component({
  selector: 'app-buscar-empresa-dialog',
  templateUrl: './buscar-empresa-dialog.component.html',
  styleUrls: ['./buscar-empresa-dialog.component.scss']
})
export class BuscarEmpresaDialogComponent implements AfterViewInit, OnInit{

  titulo : string = "Empresas o Personas"
  mostrarEmpresas : boolean = true
  codigoSeleccionado : string = ""
  paises : Pais[] = []
  datosEmpresa : DatosEmpresa[] = []
  columnsToDisplayEmpresa = ['select', 'nombreBuscado', 'nombreSolicitado', 'pais', 'ruc', 'fechaInvestigacion', 'fechaConstitucion'];
  columnsToDisplayPersona = ['select', 'nombreBuscado', 'nombreSolicitado', 'pais', 'ruc', 'fecha', 'situacion'];

  dataSourceEmpresa: MatTableDataSource<DatosEmpresa>;
  //dataSourcePersona: MatTableDataSource<DatosEmpresa>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;
  @Output()
  eventSelectAbonado = new EventEmitter<string>();
  constructor(public dialogRef: MatDialogRef<BuscarEmpresaDialogComponent>,
    private paisService : PaisService,
    private datosEmpresaService : DatosEmpresaService
  ){
    this.dataSourceEmpresa = new MatTableDataSource()
    this.paisService.getPaises().subscribe(data => {
      this.paises = data;
    });
  }
  ngOnInit(): void {
    this.dataSourceEmpresa.data = this.datosEmpresaService.getDatosEmpresas()
  }
  ngAfterViewInit() {
    this.dataSourceEmpresa.paginator = this.paginator;
    this.dataSourceEmpresa.sort = this.sort;
    console.log(this.dataSourceEmpresa)
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        tap(() => {
          this.applyFilter();
        })
      )
      .subscribe();
      this.dataSourceEmpresa.sort = this.sort;
  }

  applyFilter() {
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value.toLowerCase().trim();
    this.dataSourceEmpresa.filter = filterValue;
  }


  seleccionarCodigoEmpresa(empresa : DatosEmpresa){
    this.datosEmpresa = []
    this.datosEmpresa.push(empresa)
  }
  realizarEnvioCodigo() {
    this.dialogRef.close({
      datosEmpresa: this.datosEmpresa[0]
     });
  }

}
