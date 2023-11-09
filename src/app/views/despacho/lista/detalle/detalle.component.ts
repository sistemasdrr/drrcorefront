import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pais } from 'app/models/pais';
import { PedidoService } from 'app/services/pedido.service';
import { PaisService } from 'app/services/pais.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit{

  nombreInforme = ""
  fechaIngresoDate = new Date()
  fechaVencimientoDate = new Date()
  fechaDespachoDate = new Date()
  fechaDespacho = ""
  direccionInforme = ""
  tipoRT = ""
  codigoRT = ""
  paisInforme = 0
  balanceInforme = ""
  calidad = ""
  tipoInforme = 0
  tipoTramite = 0
  precioInforme = 0

  paises : Pais[] = []

  constructor(public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private pedidoService : PedidoService, private paisService : PaisService){

  }
  ngOnInit(): void {
    const order = this.pedidoService.getOrders().filter(x => x.cupon == this.data.cupon)[0]
    this.paisService.getPaises().subscribe(data => {
      this.paises = data;
    });    // this.nombreInforme = order.informe
    // this.direccionInforme = order.direccion
    // this.tipoRT = order.tipoRT
    // this.codigoRT = order.codigoRT
    this.tipoInforme = order.tipoInforme
    this.tipoTramite = order.tipoTramite
    this.paisSeleccionado = order.pais
    this.actualizarSeleccion(this.paisSeleccionado)
    const fechaIngreso = order.fechaIngreso.split('/')
    this.fechaIngresoDate = new Date(parseInt(fechaIngreso[2]),parseInt(fechaIngreso[1])-1,parseInt(fechaIngreso[0]))
    const fechaVencimiento = order.fechaVencimiento.split('/')
    this.fechaVencimientoDate = new Date(parseInt(fechaVencimiento[2]),parseInt(fechaVencimiento[1])-1,parseInt(fechaVencimiento[0]))
  }
  paisSeleccionado : number = 0
  iconoSeleccionado: string = ""
  actualizarSeleccion(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisSeleccionado = paisSeleccionadoObj.id;
      this.iconoSeleccionado = paisSeleccionadoObj.bandera;
    }
  }
  salir(){
    this.dialogRef.close()
  }
}
