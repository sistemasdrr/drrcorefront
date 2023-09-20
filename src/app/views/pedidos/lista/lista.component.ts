
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Order } from 'app/models/order';
import { OrderService } from 'app/services/order.service';

import { Router } from '@angular/router';

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
  breadscrums = [
    {
      title: 'Pedidos',
      items: ['Home'],
      active: 'Pedidos',
    },
  ];

  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = ['Cupon', 'Informe', 'Estado', 'Tipo_informe', 'Tipo_tramite', 'Calidad', 'Fecha_ingreso', 'Fecha_vencimiento', 'Fecha_descarga', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Order | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private orderService : OrderService, private router : Router) {
    this.dataSource = new MatTableDataSource(this.orderService.getOrders());
  }
  loadData() {
    this.dataSource = new MatTableDataSource(this.orderService.getOrders());
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
