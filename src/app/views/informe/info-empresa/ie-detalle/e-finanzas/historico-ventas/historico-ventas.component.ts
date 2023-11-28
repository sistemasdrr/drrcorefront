import { HistoricoVentasService } from '../../../../../../services/informes/historico-ventas.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistoricoVentas } from 'app/models/informes/historico-ventas';

@Component({
  selector: 'app-historico-ventas',
  templateUrl: './historico-ventas.component.html',
  styleUrls: ['./historico-ventas.component.scss']
})
export class HistoricoVentasComponent implements OnInit {

  accion = ""
  titulo = ""

  id : number = 0
  moneda : string = ""
  fecha : string = ""
  ventas : string = ""
  tc : string = ""
  equivaleDolar : string = ""

  constructor(
    private historicoVentasService : HistoricoVentasService,
    public dialogRef: MatDialogRef<HistoricoVentasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){

  }

  ngOnInit(): void {

    this.accion = this.data.accion
    if(this.accion == "AGREGAR"){
      this.titulo = "Agregar Historico de Venta"
    }else{
      this.titulo = "Editar Historico de Venta"
      this.id = this.data.id
      const datos = this.historicoVentasService.GetHistoricoVentasById(this.id)
      this.moneda = datos.moneda
      this.fecha = datos.fecha
      this.ventas = datos.ventasMN
      this.tc = datos.TC
      this.equivaleDolar = datos.equivaleDolar
    }
  }

  agregar(){
    const obj : HistoricoVentas =
    {
      id : 0,
      moneda : this.moneda,
      fecha : this.fecha,
      ventasMN : this.ventas,
      TC : this.tc,
      equivaleDolar : this.equivaleDolar
    }
    this.historicoVentasService.AddHistoricoVentas(obj)
  }
  editar(){
    const obj : HistoricoVentas =
    {
      id : this.id,
      moneda : this.moneda,
      fecha : this.fecha,
      ventasMN : this.ventas,
      TC : this.tc,
      equivaleDolar : this.equivaleDolar
    }
    this.historicoVentasService.UpdateHistoricoVentas(obj)
  }
  salir(){
    this.dialogRef.close()
  }
}
