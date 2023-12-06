
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { PedidoService } from 'app/services/pedido.service';

import { Router } from '@angular/router';
import { Pedido } from 'app/models/pedidos/pedido';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';
import { MatDialog } from '@angular/material/dialog';
import { ConsultarComponent } from './consultar/consultar.component';

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
  tipoInforme = ""
  tipoTramite = ""
  breadscrums = [
    {
      title: 'Lista de Pedidos',
      items: ['Producción'],
      active: 'Pedidos',
    },
  ];
  buscarCupon = ""
  buscarInforme = ""
  buscarAbonado = ""

  dataSource: MatTableDataSource<Pedido>;
  columnsToDisplay = ['cupon', 'informe','abonado', 'estado', 'tipoInforme', 'tipoTramite', 'calidad', 'fechaIngreso', 'fechaVencimiento', 'fechaDescarga', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Pedido | null = null;
  datosEmpresa : DatosEmpresa[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pedidoService : PedidoService,
    private router : Router,
    private datosEmpresaService : DatosEmpresaService,
    public dialog : MatDialog) {
    this.dataSource = new MatTableDataSource(this.pedidoService.getPedidos());
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.pedidoService.getPedidos());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refresh() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro() {
      this.dataSource.data = this.pedidoService.getPedidos()
      .filter(x => x.cupon.includes(this.buscarCupon) && x.codigoInforme.includes(this.buscarInforme) && x.codigo.includes(this.buscarAbonado) && x.tipoTramite === this.tipoTramite && x.tipoInforme === this.tipoInforme)
      console.log(this.dataSource.data)
  }

  addOrder(){
    this.router.navigate(['pedidos/detalle/agregar/nuevo']);
  }

  editOrder(cupon : string){
    this.router.navigate(['pedidos/detalle/editar/' + cupon]);
  }
  consultar(){
    const dialogRef = this.dialog.open(ConsultarComponent, {
      data : {
       
      },
    });
  }

  assignOrder(){
    this.router.navigate(['pedidos/asignacion']);
  }
}
