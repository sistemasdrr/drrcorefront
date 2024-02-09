import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface dataAbonado{
  id : number
  code : string
  name : string
}
export interface dataPedido{
  id : number
  cupon : string
  name : string
  orderDate : string
  dispatchDate : string
  procedureType : string
  country : string
  price : number
}

@Component({
  selector: 'app-facturacion-mensual',
  templateUrl: './facturacion-mensual.component.html',
  styleUrls: ['./facturacion-mensual.component.scss']
})
export class FacturacionMensualComponent implements OnInit {
  breadscrums = [
    {
      title: 'Facturación Mensual de Abonado',
      items: ['Facturación'],
      active: 'Abonado',
    },
  ];

  dataSource = new MatTableDataSource<dataAbonado>()
  dataSourcePedido = new MatTableDataSource<dataPedido>()
  columnsDS : string[] = ['code','name']
  columnsDSP : string[] = ['ticket','name','orderDate','dispatchDate','procedureType', 'country','price']

  fechaDesde : Date | null = new Date()
  fechaHasta : Date = new Date()

  //FACTURACION
  invoiceNumber = ""
  invoiceDate : Date | null = null
  name = ""
  code = ""
  address = ""
  attendedBy = ""
  idContinent = 0
  idCountry = 0
  language = ""
  exchangeRateSD = 0
  exchangeRateED = 0
  observations = ""
  additionalAmount = false
  concept = ""
  amount = 0

  //MODIFICACIONES
  import = 0
  orderDate : Date | null = null
  dispatchDate : Date | null = null
  procedureType = ""
  salesCheck = false
  reportName = ""

  //FILTRAR
  //POR FACTURAR
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  //POR COBRAR
  monthPC = 1
  yearPC = 2024

  //COBRADAS
  monthC = 1
  yearC = 2024

  constructor(){

  }
  ngOnInit(): void {

  }
}
