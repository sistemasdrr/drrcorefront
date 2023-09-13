import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

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
  Tipo_informe: string
  Tipo_tramite : string
  Calidad: string
  Fecha_ingreso: string
  Fecha_vencimiento: string
  Fecha_descarga: string
  Estado: string
  detalle_pedido : DetallePedido
}
const ped : Pedidos[] =[{
  id : '1',
  Cupon : "432412",
  Informe : "KARINTO",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2024",
  Fecha_descarga : "19/09/2024",
  Estado: "PENDIENTE",
  detalle_pedido : {
    credito_consultado : 100000,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "KARINTO SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "karinto@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432413",
  Informe : "NESTLE",
  Tipo_informe: "RV",
  Tipo_tramite : "T3",
  Calidad: "C",
  Fecha_ingreso: "22/07/2023",
  Fecha_vencimiento : "25/07/2023",
  Fecha_descarga : "26/07/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100001,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "NESTLE SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "nestle@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T2",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432414",
  Informe : "LAIVE",
  Tipo_informe: "RV",
  Tipo_tramite : "T1",
  Calidad: "B",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "19/09/2023",
  Estado: "ENV. VENCIDO",
  detalle_pedido : {
    credito_consultado : 100002,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "LAIVE SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "laive@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432415",
  Informe : "SAYON",
  Tipo_informe: "RV",
  Tipo_tramite : "T3",
  Calidad: "B",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "19/09/2023",
  Estado: "PENDIENTE",
  detalle_pedido : {
    credito_consultado : 100003,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "SAYON SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "sayon@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432416",
  Informe : "SAN JORGE",
  Tipo_informe: "OR",
  Tipo_tramite : "T2",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "19/09/2023",
  Estado: "PEND. VENCIDO",
  detalle_pedido : {
    credito_consultado : 100004,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "SAN JORGE",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "san-jorge@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432417",
  Informe : "GLORIA",
  Tipo_informe: "RV",
  Tipo_tramite : "T3",
  Calidad: "A",
  Fecha_ingreso: "12/08/2023",
  Fecha_vencimiento : "17/09/2023",
  Fecha_descarga : "21/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100005,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "GLORIA SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "gloria@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T3",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432418",
  Informe : "ALICORP",
  Tipo_informe: "RV",
  Tipo_tramite : "T2",
  Calidad: "C",
  Fecha_ingreso: "09/09/2023",
  Fecha_vencimiento : "14/09/2023",
  Fecha_descarga : "22/09/2023",
  Estado: "ENV. VENCIDO",
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
    tipo_tramite : "T2",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
    fax : "aqui va el fax ...",
    tipo_tramite : "T1",
    precio_informe: 50,
    tipo_informe: "RV",
    fecha_informe: "10/06/2022"
  }
},{
  id : '1',
  Cupon : "432419",
  Informe : "RIPLEY",
  Tipo_informe: "OR",
  Tipo_tramite : "T1",
  Calidad: "A",
  Fecha_ingreso: "12/09/2023",
  Fecha_vencimiento : "19/09/2023",
  Fecha_descarga : "20/09/2023",
  Estado: "ENVIADO",
  detalle_pedido : {
    credito_consultado : 100007,
    num_orden: 10345,
    revelar_nombre: "NO",
    numero_referencia: 23183012,
    indicaciones_abonado: "Indicaciones del abonado aqui Indicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aquiIndicaciones del abonado aqui",

    //datos de la empresa
    nombre_empresa : "RIPLEY SA",
    continente : "AMERICA",
    pais : "PERU",
    ciudad : "LIMA",
    reg_tributario : "Regi. tributario ...",
    direccion : "direccion de la empresa",
    telefono : "945848646",
    correo : "ripley@example.com",
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
export class ListaComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Pedidos>;
  columnsToDisplay = ['Cupon', 'Informe', 'Estado', 'Tipo_informe', 'Tipo_tramite', 'Calidad', 'Fecha_ingreso', 'Fecha_vencimiento', 'Fecha_descarga' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pedidos | null = null; // Aquí usamos el tipo Pedidos para expandedElement

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor() {
    // Create 100 users
    const pedidos = ped;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(pedidos);
  }
  public loadData() {
    this.dataSource = new MatTableDataSource(ped);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();

    // Escuchar los cambios en el campo de búsqueda y aplicar el filtro
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(300), // Agregar un retraso para evitar búsquedas excesivas mientras se escribe
        distinctUntilChanged(), // Asegurarse de que solo se aplique el filtro si el valor cambió
        tap(() => {
          this.applyFilter();
        })
      )
      .subscribe();
      this.refresh()
  }
  refresh() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }
  applyFilter() {
    const filterValue = (this.filter.nativeElement as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
