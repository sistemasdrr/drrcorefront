import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'app/models/pedidos/pedido';
import { PedidosService } from 'app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  nmrCupon = ""
  abonado = ""

  breadscrums = [
    {
      title: 'Historial',
      items: ['Producción','Situación'],
      active: 'Historial',
    },
  ];

  dataSource: MatTableDataSource<Pedido>;
  columnsToDisplayTbl1 = ['cupon', 'abonado', 'nombreSolicitado', 'calidad', 'fechaIngreso', 'fechaVencimiento', 'estado', 'acciones' ];
  columnsToDisplayTbl2 = ['receptor', 'emisor', 'fechaEnvio', 'fecha', 'fechaIngreso', 'fechaVencimiento', 'estado', 'acciones' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pedidoService : PedidosService){
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

  }

  applyFilter(){
   
  }

}
