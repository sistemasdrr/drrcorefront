import { Injectable } from '@angular/core';
import { ReportesSolicitados } from 'app/models/informes/reportes-solicitados';

const requestedReports : ReportesSolicitados[] = [
  {
    tipo : "RV",
    cupon : "81294",
    nombreSolicitado : "TRES MONTES LUCCHETI S.A.",
    despacho : "20/01/2012",
    abonado : "1013",
    tramite : "T1",
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    balance : "NO",
    calidad : "B",
    estado : "PEND. VENCIDO"
  },
  {
    tipo : "RV",
    cupon : "70198",
    nombreSolicitado : "ACONCAGUA FOODS S.A.",
    despacho : "20/04/2011",
    abonado : "1043",
    tramite : "T3",
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    balance : "SI",
    calidad : "A",
    estado : "ENV. VENCIDO"
  },
  {
    tipo : "OR",
    cupon : "57762",
    nombreSolicitado : "ACONCAGUA FOODS BRASIL S.A.",
    despacho : "18/05/2010",
    abonado : "2004",
    tramite : "T1",
    pais :  {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    balance : "SI",
    calidad : "A",
    estado : "ENVIADO"
  },
  {
    tipo : "RV",
    cupon : "32816",
    nombreSolicitado : "ACONCAGUA FOODS S.A.",
    despacho : "31/07/2008",
    abonado : "3000",
    tramite : "T2",
    pais :  {
      id : 49,
      valor : "Chile",
      bandera : "cl"
    },
    balance : "SI",
    calidad : "A",
    estado : "PENDIENTE"
  }
]

@Injectable({
  providedIn: 'root'
})
export class RequestedReportsService {

  constructor() { }

  getRequestedReports(){
    return requestedReports;
  }
}
