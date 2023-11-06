import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit{

  nombreInforme = ""
  siglasInforme = ""
  fechaDespachoDate = new Date()
  direccionInforme = ""
  tipoRT = ""
  codigoRT = ""
  paisInforme = ""
  balanceInforme = ""
  calidad = ""
  tipoInforme = ""
  tipoTramite = ""
  precioInforme = 0
  constructor(public dialogRef: MatDialogRef<DetalleComponent>,@Inject(MAT_DIALOG_DATA) public data : any, private orderService : OrderService){

  }
  ngOnInit(): void {
    const order = this.orderService.getOrders().filter(x => x.cupon == this.data.cupon)[0]
    this.nombreInforme = order.informe
  }

}
