
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Order } from 'app/models/order';
import { OrderService } from 'app/services/order.service';

import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ComentarioComponent } from '@shared/components/comentario/comentario.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivosComponent } from '@shared/components/adjuntar-archivos/adjuntar-archivos.component';

interface Agentes{
  codigo : string
  nombre : string
}

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements AfterViewInit {
  //BREADCRUMB
  breadscrums = [
    {
      title: 'Asignación',
      items: ['Home','Pedidos'],
      active: 'Asignación',
    },
  ];

  //TABLA
  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = ['position','Cupon', 'Informe', 'Tipo_informe', 'Tipo_tramite', 'Fecha_ingreso', 'Fecha_vencimiento', 'Acciones' ];
  selection = new SelectionModel<Order>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private orderService : OrderService,
    private router : Router,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.orderService.getOrders());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }


  //FUNCION DE LOS BOTONES
  agenteSeleccionado : string = ""

  agentes : Agentes[] = [
    {
      codigo : "98765",
      nombre : "agente 1"
    },
    {
      codigo : "98485",
      nombre : "agente 2"
    },
    {
      codigo : "98331",
      nombre : "agente 3"
    },
    {
      codigo : "98983",
      nombre : "agente 4"
    },
    {
      codigo : "98744",
      nombre : "agente 5"
    },
  ]

  //CHECKBOX

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: Order): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  volver(){
    this.router.navigate(['pedidos/lista']);
  }

  //ACCIONES
  agregarComentario(cod : string) {
    const dialogRef = this.dialog.open(ComentarioComponent, {
    data: {
      data: cod,
    },
  });
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }
  agregarAdjuntos(cod : string) {
    const dialogRef = this.dialog.open(AdjuntarArchivosComponent, {
    data: {
      data: cod,
    },
  });
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }
}