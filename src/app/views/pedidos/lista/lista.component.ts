import { Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface DetallePedido{
  //datos del abonado
  credito_consultado: number;
  num_orden: number;
  revelar_nombre: string;
  numero_referencia: number;
  indicaciones_abonado: string;

  //datos de la empresa
  nombre_empresa : string;
  continente : string;
  pais : string;
  ciudad : string
  reg_tributario : string;
  direccion : string;
  telefono : string;
  correo : string
  fax : string
  tipo_tramite : string
  precio_informe: number
  tipo_informe: string
  fecha_informe: string
}
export interface Pedidos {
  id: string
  Cupon: string
  Informe: string
  fecha_ingreso: string
  fecha_vencimiento: string
  Estado: string
  tipo_informe: string
  Calidad: string
  detalle_pedido : DetallePedido
}
const ped : Pedidos[] =[{
  id : '1',
  Cupon : "432412",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100000,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432413",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100001,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432414",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100002,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432415",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100003,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432416",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100004,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432417",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100005,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432418",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100006,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "ALICORP",
  fecha_ingreso : "12/09/2023",
  fecha_vencimiento : "19/09/2023",
  Estado: "PENDIENTE",
  tipo_informe: "RV",
  Calidad: "A",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "ALICORP SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "alicorp@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
}];

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaComponent {
  dataSource: MatTableDataSource<Pedidos>;
  columnsToDisplay = ['Cupon', 'Informe', 'Fecha Ingreso', 'fecha_vencimiento', 'Estado', 'tipo_informe', 'Calidad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pedidos | null = null; // Aquí usamos el tipo Pedidos para expandedElement

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const pedidos = ped;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(pedidos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
