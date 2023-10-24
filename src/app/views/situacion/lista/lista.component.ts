
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Order } from 'app/models/pedidos/order';
import { OrderService } from 'app/services/order.service';

import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDay()

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
export class ListaSituacionComponent implements  OnInit {
  breadscrums = [
    {
      title: 'Situación',
      items: ['Producción'],
      active: 'Situación',
    },
  ];

  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = [ 'informe',  'tipoInforme', 'tipoTramite', 'calidad', 'fechaIngreso', 'fechaVencimiento', 'fechaDescarga', 'Acciones' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private orderService : OrderService, private router : Router, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource();
    this.range = this.fb.group({
      start: new FormControl(new Date(2023, 0, 1)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  ngOnInit(): void {

  }




  applyFilter() {
    this.dataSource.data = this.orderService.getOrders()
      .filter(x => x.tipoTramite.includes(this.tipoTramite) &&
      x.tipoInforme.includes(this.tipoInforme) &&
      new Date(
        parseInt(x.fechaIngreso.split('/')[2], 10),
        parseInt(x.fechaIngreso.split('/')[1], 10) - 1,
        parseInt(x.fechaIngreso.split('/')[0], 10)
        ) > this.fechaInicio  &&
      new Date(
        parseInt(x.fechaIngreso.split('/')[2], 10),
        parseInt(x.fechaIngreso.split('/')[1], 10) - 1,
        parseInt(x.fechaIngreso.split('/')[0], 10)
        ) < this.fechaFin &&
      x.informe.includes(this.nombreEmpresa));

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //FILTROS



  nombreEmpresa = ""
  fechaInicio : Date = new Date(2023, 0, 1)
  fechaFin : Date = new Date(year, month, day)
  tipoInforme = ""
  tipoTramite = ""
  maxDate: Date = new Date();

  range : FormGroup

  mostrarFechas(){
    const startDate = this.range.controls['start'].value;
    const endDate = this.range.controls['end'].value;

    this.fechaInicio = new Date(startDate);
    this.fechaFin = new Date(endDate);
  }

  verHistorial() {
    window.open('/#/situacion/historial', '_blank');
  }


}
