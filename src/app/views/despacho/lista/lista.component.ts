import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'app/models/pedidos/pedido';
import { PedidoService } from 'app/services/pedido.service';
import { MovimientoInformeComponent } from './movimiento-informe/movimiento-informe.component';
import { DetalleComponent } from './detalle/detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
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
    this.dataSourceInforme.data = this.pedidoService.getOrders()
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
    this.dataSourceInforme.data = this.pedidoService.getOrders()
      .filter(x => x.tipoTramite.includes(this.tipoTramite) && x.tipoInforme.includes(this.tipoInforme));
  }

  applyFilterTipoTramite() {
    this.dataSourceInforme.data = this.pedidoService.getOrders()
      .filter(x => x.tipoTramite.includes(this.tipoTramite) && x.tipoInforme.includes(this.tipoInforme));
  }

}
