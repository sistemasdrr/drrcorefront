import { Injectable } from '@angular/core';
import { Order } from 'app/models/order';
const ped : Order[] =[{
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
  id : '2',
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
  id : '3',
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
  id : '4',
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
  id : '5',
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
  id : '6',
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
  id : '7',
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
}];

@Injectable({
  providedIn: 'root'
})


export class OrderService {

  constructor() { }
  getOrders(){
    return ped;
  }
}
