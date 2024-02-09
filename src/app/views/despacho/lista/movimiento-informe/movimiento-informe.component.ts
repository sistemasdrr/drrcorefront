import { Component, Inject, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { PedidoService } from 'app/services/pedido.service';


@Component({
  selector: 'app-movimiento-informe',
  templateUrl: './movimiento-informe.component.html',
  styleUrls: ['./movimiento-informe.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class MovimientoInformeComponent implements OnInit {

  dataSource : MatTableDataSource<Asignacion>
  columnas = ['asignado','fechaAsignacion','fechaVencimiento','fechaEntrega','calidad','precio']

  constructor(public dialogRef: MatDialogRef<MovimientoInformeComponent>, @Inject(MAT_DIALOG_DATA) public data : any,private pedidoService : PedidoService){
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    const order = this.pedidoService.getPedidos().filter(x => x.cupon == this.data.cupon)[0]
    if(order.asignacion.length > 0){
      this.dataSource.data = order.asignacion
    }else{
      console.log('El pedido no tiene asignaciones')
    }
  }

  salir(){
    this.dialogRef.close()
  }

}
