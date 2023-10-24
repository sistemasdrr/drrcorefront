import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'app/models/pedidos/order';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  breadscrums = [
    {
      title: 'Historial',
      items: ['Producción','Situación'],
      active: 'Historial',
    },
  ];

  dataSource: MatTableDataSource<Order>;
  columnsToDisplayTbl1 = ['cupon', 'abonado', 'nombreSolicitado', 'calidad', 'fechaIngreso', 'fechaVencimiento', 'estado', 'acciones' ];
  columnsToDisplayTbl2 = ['receptor', 'emisor', 'fechaEnvio', 'fecha', 'fechaIngreso', 'fechaVencimiento', 'estado', 'acciones' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService : OrderService){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.dataSource.data = this.orderService.getOrders()
  }

}
