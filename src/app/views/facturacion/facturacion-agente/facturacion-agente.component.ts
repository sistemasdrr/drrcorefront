import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { dataAbonado, dataPedido } from '../facturacion-abonado/facturacion-mensual/facturacion-mensual.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-facturacion-agente',
  templateUrl: './facturacion-agente.component.html',
  styleUrls: ['./facturacion-agente.component.scss']
})
export class FacturacionAgenteComponent implements OnInit {
  breadscrums = [
    {
      title: 'Facturación de Agente',
      items: ['Facturación'],
      active: 'Agente',
    },
  ];

  dataSource = new MatTableDataSource<dataAbonado>()
  dataSourcePedido = new MatTableDataSource<dataPedido>()
  columnsDS : string[] = ['code','name']
  columnsDSP : string[] = ['ticket','name','orderDate','dispatchDate','procedureType', 'country','price']

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
  range1 = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  //POR COBRAR
  range2 = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  //COBRADAS
  range3 = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(){

  }
  ngOnInit(): void {

  }
}
