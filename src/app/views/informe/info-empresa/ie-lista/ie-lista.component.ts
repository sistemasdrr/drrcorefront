import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Empresa } from 'app/models/empresa';
import { EmpresaService } from 'app/services/empresa.service';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ie-lista',
  templateUrl: './ie-lista.component.html',
  styleUrls: ['./ie-lista.component.scss']
})
export class IEListaComponent implements OnInit, AfterViewInit{
  breadscrums = [
    {
      title: 'Lista de Empresas',
      subtitle: '',
      codigoInforme : '',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Empresa',
    },
  ];

  filtrarPais = ""

  dataSource: MatTableDataSource<Empresa>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef
  ;
  columnsToDisplay = ['rc', 'idioma', 'razonSocial', 'datosAl', 'pais', 'rucInit', 'fecEst', 'ex', 'calificacion','ejecPrincipal','acciones' ];

  constructor(private empresaService : EmpresaService,private router : Router){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.empresaService.getAllEmpresas())

  }
  ngAfterViewInit(): void {
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
      this.refresh();
      this.dataSource.sort = this.sort;
  }
  agregarEmpresa(){
    this.router.navigate(['informes/empresa/detalle/nuevo']);
  }

  editarEmpresa(codInforme : string){
    this.router.navigate(['informes/empresa/detalle/'+codInforme]);
  }
  eliminarEmpresa(codInforme : string){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.empresaService.deleteEmpresa(codInforme)
        this.refresh()
      }
    });
  }
  applyFilter() {
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.empresaService.getAllEmpresas());
  }
}
