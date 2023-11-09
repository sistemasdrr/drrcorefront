
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PedidoService } from 'app/services/pedido.service';

import { Router } from '@angular/router';
import { Pedido } from 'app/models/pedidos/pedido';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaComponent implements AfterViewInit {
  tipoInforme = 0
  tipoTramite = 0
  breadscrums = [
    {
      title: 'Lista de Pedidos',
      items: ['Producción'],
      active: 'Pedidos',
    },
  ];

  dataSource: MatTableDataSource<Pedido>;
  columnsToDisplay = ['cupon', 'informe', 'estado', 'tipoInforme', 'tipoTramite', 'calidad', 'fechaIngreso', 'fechaVencimiento', 'fechaDescarga', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Pedido | null = null;
  datosEmpresa : DatosEmpresa[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private pedidoService : PedidoService,
    private router : Router,
    private datosEmpresaService : DatosEmpresaService) {
    this.dataSource = new MatTableDataSource(this.pedidoService.getOrders());
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.pedidoService.getOrders());
  }
  getDatosEmpresa(codigoInforme : string){
    this.datosEmpresa = this.datosEmpresaService.getDatosEmpresaPorCodigo(codigoInforme)
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
      this.refresh();
      this.dataSource.sort = this.sort;
  }
  refresh() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterTipoInforme() {
    this.dataSource.data = this.pedidoService.getOrders()
      .filter(x => x.tipoTramite === this.tipoTramite && x.tipoInforme === this.tipoInforme);
  }

  applyFilterTipoTramite() {
    this.dataSource.data = this.pedidoService.getOrders()
      .filter(x => x.tipoTramite === this.tipoTramite && x.tipoInforme === this.tipoInforme);
  }

  addOrder(){
    this.router.navigate(['pedidos/detalle/agregar/nuevo']);
  }

  editOrder(cupon : string){
    this.router.navigate(['pedidos/detalle/editar/' + cupon]);
  }

  assignOrder(){
    this.router.navigate(['pedidos/asignacion']);
  }
}
