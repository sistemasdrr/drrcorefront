import { Component, OnInit } from '@angular/core';
import { dataAbonado } from '../facturacion-mensual/facturacion-mensual.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-facturacion-con-cupones',
  templateUrl: './facturacion-con-cupones.component.html',
  styleUrls: ['./facturacion-con-cupones.component.scss']
})
export class FacturacionConCuponesComponent implements OnInit{
  breadscrums = [
    {
      title: 'Facturación Con Cupones de Abonado',
      items: ['Facturación'],
      active: 'Abonado',
    },
  ];

  dataSource = new MatTableDataSource<dataAbonado>()
  columnsDS : string[] = ['code','name']

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

  //FILTRAR
  //POR FACTURAR
  monthPF = 1
  yearPF = 2024

  //POR COBRAR
  monthPC = 1
  yearPC = 2024

  //COBRADAS
  monthC = 1
  yearC = 2024

  //Cupones
  startDate : Date | null = null
  endDate : Date | null = null

  availableTicket = 0
  pricePerTicket = 0
  totalAmount = 0
  igvCheck = false
  totalGeneral = 0
  constructor(){

  }
  ngOnInit(): void {

  }

}
