
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Order } from 'app/models/pedidos/order';
import { OrderService } from 'app/services/order.service';

import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ComentarioComponent } from '@shared/components/comentario/comentario.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivosComponent } from '@shared/components/adjuntar-archivos/adjuntar-archivos.component';
import { SeleccionarAgenteComponent } from './seleccionar-agente/seleccionar-agente.component';

@Component({
  selector: 'app-asignacion2',
  templateUrl: './asignacion2.component.html',
  styleUrls: ['./asignacion2.component.scss']
})
export class Asignacion2Component implements AfterViewInit {
  //BREADCRUMB
  breadscrums = [
    {
      title: 'Asignación',
      items: ['Producción','Pedidos'],
      active: 'Asignación',
    },
  ];

  //TABLA
  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = ['cupon', 'informe', 'fechaIngreso','fechaVencimiento','calidad','tipoInforme', 'tipoTramite',  'Acciones' ];
  selection = new SelectionModel<Order>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private orderService : OrderService,
    private router : Router,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.orderService.getOrders());
    console.log(this.dataSource)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  asignarTrabajador(codigoCupon : string){
    const dialogRef = this.dialog.open(SeleccionarAgenteComponent, {
      data: {
        data: codigoCupon,
      },
    });
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
