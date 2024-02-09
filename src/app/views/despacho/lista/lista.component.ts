import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'app/models/pedidos/pedido';
import { PedidoService } from 'app/services/pedido.service';
import { MovimientoInformeComponent } from './movimiento-informe/movimiento-informe.component';
import { DetalleComponent } from './detalle/detalle.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class ListaComponent implements OnInit {
  breadscrums = [
    {
      title: 'Despacho de Informes Pendientes',
      items: ['Producción'],
      active: 'Despacho',
    },
  ];

  columnasInforme = ['informe','fecha','tipoTramite','tipoInforme','pais','abonado','opciones']
  dataSourceInforme : MatTableDataSource<Pedido>
  tipoTramite = ""
  tipoInforme = ""

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private pedidoService : PedidoService,public dialog: MatDialog){
    this.dataSourceInforme = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.dataSourceInforme.data = this.pedidoService.getPedidos()
    console.log(this.dataSourceInforme.data)
    this.dataSourceInforme.paginator = this.paginator
    this.dataSourceInforme.sort = this.sort
  }

  movimientosInforme(cupon : string){
    const dialogRef = this.dialog.open(MovimientoInformeComponent, {
      data: {
        cupon : cupon,
      },
    })
  }
  despachoInforme(cupon : string){
    const dialogRef = this.dialog.open(DetalleComponent, {
      data: {
        cupon : cupon,
      },
    })
  }
  applyFilterTipoInforme() {
    this.dataSourceInforme.data = this.pedidoService.getPedidos()
      .filter(x => x.tipoTramite === this.tipoTramite && x.tipoInforme === this.tipoInforme);
  }

  applyFilterTipoTramite() {
    this.dataSourceInforme.data = this.pedidoService.getPedidos()
      .filter(x => x.tipoTramite === this.tipoTramite && x.tipoInforme === this.tipoInforme);
  }

}
