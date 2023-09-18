import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyPerson } from 'app/models/company-person';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';



const datosEmpresaPersona : CompanyPerson[] = [
  {
    codigo : "1242112",
    tipo : "E",
    nombreBuscado : "INMOBILIARIA MONTES URALES",
    nombreSolicitado : "nombreSolicitado",
    pais : "MEXICO",
    iconoPais : "fi-mx",
    ruc : "202945467",
    fecha : "26/08/2004",
    situacion : "ACTIVA"
  },
  {
    codigo : "1275412",
    tipo : "P",
    nombreBuscado : "ALICORP",
    nombreSolicitado : "nombreSolicitado",
    pais : "PERU",
    iconoPais : "fi-pe",
    ruc : "202912347",
    fecha : "03/10/2012",
    situacion : "ACTIVA"
  },
]

@Component({
  selector: 'app-buscar-empresa-dialog',
  templateUrl: './buscar-empresa-dialog.component.html',
  styleUrls: ['./buscar-empresa-dialog.component.scss']
})
export class BuscarEmpresaDialogComponent implements AfterViewInit{

  titulo : string = "Empresas o Personas"
  mostrarEmpresas : boolean = true

  columnsToDisplay = ['select', 'tipo', 'nombreBuscado', 'nombreSolicitado', 'pais', 'ruc', 'fecha', 'situacion'];

  dataSource: MatTableDataSource<CompanyPerson>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(){
    this.dataSource = new MatTableDataSource(datosEmpresaPersona)
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarCodigoEmpresa(cod : string){
    console.log(cod)
  }

}
