import { MatTableDataSource } from '@angular/material/table';
import { HistoricoPedidosService } from '../../../../../../services/informes/historico-pedidos.service';
import { Component, Inject } from '@angular/core';
import { HistoricoPedidos } from 'app/models/informes/historico-pedidos';
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
    this.dialogRef.close()
  }

}
