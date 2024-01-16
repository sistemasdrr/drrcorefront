
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ComentarioComponent } from '@shared/components/comentario/comentario.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivosComponent } from '@shared/components/adjuntar-archivos/adjuntar-archivos.component';
import { ComboData } from 'app/models/combo';
import { TicketListPending } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import { Pedido } from 'app/models/pedidos/pedido';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AsignacionComponent implements OnInit {
  //BREADCRUMB
  breadscrums = [
    {
      title: 'Asignación',
      items: ['Producción','Pedidos'],
      active: 'Asignación',
    },
  ];
 
  lista : ComboData[] = [
    {
      id : 5,
      valor : "KATIA BUSTAMANTE"
    },
    {
      id : 42,
      valor : "MARIELA ACOSTA"
    },
    {
      id : 50,
      valor : "MONICA YEPEZ"
    },
    {
      id : 51,
      valor : "RAFAEL DEL RISCO"
    },
    {
      id : 55,
      valor : "CECILIA RODRIGUEZ"
    },
    {
      id : 64,
      valor : "JESSICA LIAU"
    },
    {
      id : 8,
      valor : "CECILIA SAYAS"
    },
  ]

  //TABLA
  dataSource: MatTableDataSource<TicketListPending>;
  columnsToDisplay = ['position','number', 'busineesName','subscriberCode', 'reportType', 'procedureType', 'orderDate', 'expireDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Pedido | null = null;
  selection = new SelectionModel<TicketListPending>(true, []);
  loading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticketService : TicketService, private router : Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log(this.dataSource)
  }

  ngOnInit(): void {
    this.loading = true;
    this.ticketService.getListPending().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      }
    ).add(
      () => {
        this.loading = false
      }
    )
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
  checkboxLabel(row?: TicketListPending): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  volver(){
    this.router.navigate(['pedidos/lista']);
  }
  guardar(){
    this.selection.selected.forEach(element => {
      
    });
    

    console.log(this.selection.selected);
  }

  //ACCIONES
  agregarComentario(id : number, cupon : string, comentario : string) {
    const dialogRef = this.dialog.open(ComentarioComponent, {
    data: {
      id: id,
      cupon: cupon,
      comentario : comentario
    },
  }); 
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data) {
        this.dataSource.data.filter(x => x.id === id)[0].commentary = data.comentario
      }
    });
  }
  agregarAdjuntos(id : number, cupon : string) {
    const dialogRef = this.dialog.open(AdjuntarArchivosComponent, {
    data: {
      id: id,
      cupon: cupon
    },
  });
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }


}
