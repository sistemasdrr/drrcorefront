
import { Component, ViewChild, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { Router } from '@angular/router';
import { Pedido } from 'app/models/pedidos/pedido';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsultarComponent } from './consultar/consultar.component';
import { ListTicket } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import Swal from 'sweetalert2';
import { PedidosService } from 'app/services/pedidos/pedidos.service';

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
export class ListaComponent implements OnInit {

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


  loading = false;

  dataSource: MatTableDataSource<ListTicket>;
  columnsToDisplay = ['number', 'busineesName','subscriberCode', 'status', 'reportType', 'procedureType', 'quality', 'orderDate', 'expireDate', 'dispatchDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Pedido | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pedidoService : PedidosService,
    private router : Router,
    private datosEmpresaService : DatosEmpresaService, private ticketService : TicketService,
    public dialog : MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
   this.init();
  }
  init(){
    this.loading = true
    this.ticketService.getList().subscribe(
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
  getColor(arg0: boolean,arg1: number): string {
    console.log(arg0);
    if(!arg0){
      return 'black';
    } else if(arg1===1){
       return'red';
    }else{
      return 'green';
    }

    }
  refresh(){
    this.loading=true;
    this.ticketService.getList().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator
        }
      })
      .add(
        () => {
          this.loading=false;
          }
      )

  }

  addOrder(){
    this.router.navigate(['pedidos/detalle/agregar/nuevo']);
  }

  editOrder(cupon : string){
    this.router.navigate(['pedidos/detalle/editar/' + cupon]);
  }
  deleteOrder(id : number){
    console.log(id)
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        const loader = document.getElementById('loader-lista-cupon') as HTMLElement | null;
        if(loader){
          loader.classList.remove('hide-loader');
        }
        this.ticketService.deleteTicket(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'El registro se eliminó correctamente.',
                text: '',
                icon: 'success',
                width: '30rem',
                heightAuto: true
              }).then(() => {
                this.refresh()
              })
            }
          }
        ).add(
          () => {
            if(loader){
              loader.classList.add('hide-loader');
            }
          }
        )
      }
    });
  }
  consultar(myticket:unknown){
    const dialogRef = this.dialog.open(ConsultarComponent, {
      data : {
          ticket:myticket
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
     this.refresh();
    });
  }

  assignOrder(){
    this.router.navigate(['pedidos/asignacion']);
  }
  downloadReport(){
    this.loading=true;
    this.ticketService.downloadReport().subscribe(response=>{
      let blob : Blob = response.body as Blob;
      let a =document.createElement('a');
      a.download="ReporteTicket_"+Date.now();
      a.href=window.URL.createObjectURL(blob);
      a.target="_blank";
      a.click();
}).add(
  () => {
    this.loading = false
  }
);
}
  buscar(){
    this.loading = true
    this.ticketService.getListBy(this.buscarCupon,this.buscarInforme,this.buscarAbonado,this.tipoInforme,this.tipoTramite).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){

          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator
        }
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
}
