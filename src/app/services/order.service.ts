import { Injectable } from '@angular/core';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { Order } from 'app/models/pedidos/order';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [
    {
      id: '1',
      cupon: '432412',
      informe: 'KARINTO',
      tipoInforme: 'OR',
      tipoTramite: 'T1',
      calidad: 'A',
      fechaIngreso: '12/09/2023',
      fechaVencimiento: '19/09/2024',
      fechaVencimientoReal: '20/09/2024',
      fechaDescarga: '19/09/2024',
      estado: 'PENDIENTE',
      comment: 'comentario 1',
      attachments: [
        {
          id: 1,
          name: "karinto.pdf",
          type: "PDF",
          path: "/Downloads/archivo1.pdf",
          data: "b64"
        },
        {
          id: 2,
          name: "karinto.docx",
          type: "WORD",
          path: "/Downloads/archivo1.docx",
          data: "b64"
        },
        {
          id: 3,
          name: "karinto.xlsx",
          type: "EXCEL",
          path: "/Downloads/archivo1.xlsx",
          data: "b64"
        },
      ],
      abonado: {
        id: "1",
        nombre: "Abonado 1 ",
        codigo: "12345",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "INACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100000,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'KARINTO SA',
      nombreSolicitado: 'KARINTO ',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RTM',
      codigoRT: '1545643546',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'karinto@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [
        {
          id: 1,
          trabajador: {
            id: 2,
            tipo: 'Reportero',
            codigo: 'R11',
            nombre: 'Julio Enrique Del Risco L.'
          },
          referencias: 'referencias',
          observaciones: 'observaciones',
          fechaAsignacion: '26/10/2023',
          fechaVencimiento : '31/10/2023',
          fechaEntrega: '30/10/2023',
          calidad: 'A',
          precio: 50
        }
      ],
    },
    {
      id: '2',
      cupon: '432413',
      informe: 'NESTLE',
      tipoInforme: 'RV',
      tipoTramite: 'T3',
      calidad: 'C',
      fechaIngreso: '22/07/2023',
      fechaVencimiento: '25/07/2023',
      fechaVencimientoReal: '26/07/2023',
      fechaDescarga: '26/07/2023',
      estado: 'ENVIADO',
      comment: 'comentario 2',
      attachments: [
        {
          id: 4,
          name: "nestle.docx",
          type: "WORD",
          path: "432413/docs/nestle.docx",
          data: "data1"
        },
      ],
      abonado: {
        id: "1",
        nombre: "Abonado 1 Abonado Abonado",
        codigo: "12345",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "INACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100001,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'NESTLE SA',
      nombreSolicitado: 'NESTLE',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RTM',
      codigoRT: '1545643546',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'nestle@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
    {
      id: '3',
      cupon: '432414',
      informe: 'LAIVE',
      tipoInforme: 'RV',
      tipoTramite: 'T1',
      calidad: 'B',
      fechaIngreso: '12/09/2023',
      fechaVencimiento: '19/09/2023',
      fechaVencimientoReal: '20/09/2023',
      fechaDescarga: '19/09/2023',
      estado: 'ENV. VENCIDO',
      comment: '',
      attachments: [
        {
          id: 5,
          name: "laive.pdf",
          type: "PDF",
          path: "432414/docs/laive.pdf",
          data: "data1"
        },
      ],
      abonado: {
        id: "3",
        nombre: "Abonado 3",
        codigo: "12347",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "ACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100002,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'LAIVE SA',
      nombreSolicitado: 'LAIVE',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RTM',
      codigoRT: '154567549',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'laive@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
    {
      id: '4',
      cupon: '432415',
      informe: 'SAYON',
      tipoInforme: 'RV',
      tipoTramite: 'T3',
      calidad: 'B',
      fechaIngreso: '12/09/2023',
      fechaVencimiento: '19/09/2023',
      fechaVencimientoReal: '20/09/2023',
      fechaDescarga: '19/09/2023',
      estado: 'PENDIENTE',
      comment: '',
      attachments: [],
      abonado: {
        id: "4",
        nombre: "Abonado 4",
        codigo: "12348",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "ACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100003,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'SAYON SA',
      nombreSolicitado: 'SAYON ',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RUC',
      codigoRT : '1541515654',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'sayon@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
    {
      id: '5',
      cupon: '432416',
      informe: 'SAN JORGE',
      tipoInforme: 'OR',
      tipoTramite: 'T2',
      calidad: 'A',
      fechaIngreso: '12/09/2023',
      fechaVencimiento: '19/09/2023',
      fechaVencimientoReal: '20/09/2023',
      fechaDescarga: '19/09/2023',
      estado: 'PEND. VENCIDO',
      comment: 'comentario 5',
      attachments: [],
      abonado: {
        id: "3",
        nombre: "Abonado 3",
        codigo: "12347",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "ACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100004,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'SAN JORGE SAC',
      nombreSolicitado: 'SAN JORGE',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RUC',
      codigoRT : '78465489465',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'san-jorge@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
    {
      id: '6',
      cupon: '432417',
      informe: 'GLORIA',
      tipoInforme: 'RV',
      tipoTramite: 'T3',
      calidad: 'A',
      fechaIngreso: '12/08/2023',
      fechaVencimiento: '17/09/2023',
      fechaVencimientoReal: '18/09/2023',
      fechaDescarga: '21/09/2023',
      estado: 'ENVIADO',
      comment: '',
      attachments: [],
      abonado: {
        id: "4",
        nombre: "Abonado 4",
        codigo: "12348",
        revelarNombre: true,
        pais: "PERU",
        codigoPais: "pe",
        estado: "ACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100005,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'GLORIA SA',
      nombreSolicitado: 'GLORIA ',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT: 'RUC',
      codigoRT : '1085161564',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'gloria@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
    {
      id: '7',
      cupon: '432418',
      informe: 'ALICORP',
      tipoInforme: 'RV',
      tipoTramite: 'T2',
      calidad: 'C',
      fechaIngreso: '09/09/2023',
      fechaVencimiento: '14/09/2023',
      fechaVencimientoReal: '15/09/2023',
      fechaDescarga: '22/09/2023',
      estado: 'ENV. VENCIDO',
      comment: '',
      attachments: [],
      abonado: {
        id: "5",
        nombre: "Abonado 5",
        codigo: "12349",
        revelarNombre: false,
        pais: "PERU",
        codigoPais: "pe",
        estado: "ACTIVO",
        nroReferencia: "1234546789",
        creditoConsultado: "1 000 000",
        indicaciones: "Aqui van las indicaciones",
        dtsAdicionales: "Datos adicionales"
      },
      creditoConsultado: 100006,
      numOrden: 10345,
      revelarNombre: 'NO',
      numeroReferencia: 23183012,
      indicacionesAbonado: 'Indicaciones del abonado aqui',

      //datos de la empresa
      nombreReal: 'ALICORP SA',
      nombreSolicitado: 'ALICORP ',
      continente: 'AMERICA',
      pais: {
        id : 11,
        nombre : "Peru",
        nombreAcort : "PER",
        nombreMayus : "PERU",
        icono : "pe"
      },
      ciudad: 'LIMA',
      tipoRT : 'RUC',
      codigoRT: 'Regi. tributario ...',
      direccion: 'direccion de la empresa',
      telefono: '945848646',
      correo: 'alicorp@example.com',
      fax: 'aqui va el fax ...',
      precioInforme: 50,
      fechaInforme: '10/06/2022',
      asignacion: [],
    },
  ];

  constructor() { }
  getOrders() {
    return this.orders;
  }
  getCommentByCupon(cupon: string) {
    return this.orders.filter((x) => x.cupon === cupon);
  }
  getAttachmentsByCupon(cupon: string) {
    const order = this.orders.filter((x) => x.cupon === cupon)
    return order[0].attachments
  }
  getLastNumCupon(){
    let maxCupon = 0
    for(let i = 0; i < this.orders.length ; i++){
      if(maxCupon < parseInt(this.orders[i].cupon)){
        maxCupon = parseInt(this.orders[i].cupon)
      }
    }
    return maxCupon
  }
  addAsignacionCupon(cupon: string, asignacion: Asignacion) {
    const index = this.orders.findIndex(x => x.cupon === cupon);
    if (index !== -1) {
      this.orders[index].asignacion.push(asignacion)
    }
  }
  deleteAsignacionCupon(cupon : string, idAsignacion : number){
    const indexPedido = this.orders.findIndex(x => x.cupon === cupon);
    if (indexPedido !== -1) {
      const indexAsignacion = this.orders[indexPedido].asignacion
    }
  }
}

