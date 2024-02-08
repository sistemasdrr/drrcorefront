import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface dataAbonado{
  id : number
  code : string
  name : string
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
  columnsDS : string[] = ['code','name']

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
  salesChech = false
  reportName = ""

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(){

  }
  ngOnInit(): void {

  }
}
