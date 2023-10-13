import { MatTableDataSource } from '@angular/material/table';
import { HistoricoPedidosService } from './../../../../../../services/historico-pedidos.service';
import { Component, Inject } from '@angular/core';
import { HistoricoPedidos } from 'app/models/historico-pedidos';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent {
  accion = ""
  titulo = ""
  datasourceHistoricoPedidos : MatTableDataSource<HistoricoPedidos>
  columnsToDisplayHistoricoPedidos : string[] = [
    "id","abonado","cupVirtual","fecPedido","fecDespacho","tipInforme","reputacion","agente",
    "supervisor","digitador","traductora","idioma","solicitado"
  ]
  constructor(
    public dialogRef: MatDialogRef<HistoricoPedidosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private historicoPedidosService : HistoricoPedidosService
  ){
    this.titulo = data.titulo
    this.datasourceHistoricoPedidos = new MatTableDataSource(this.historicoPedidosService.GetAllHistoricoPedidos())
  }


  volver(){
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardaran",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }

}
