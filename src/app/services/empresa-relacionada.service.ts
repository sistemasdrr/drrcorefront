import { Injectable } from '@angular/core';
import { EmpresaRelacionada } from 'app/models/empresa-relacionada';

const empresaRelacionada : EmpresaRelacionada[] = [
  {
    razonSocial : "3M COLOMBIA",
    pais : "COLOMBIA",
    situacion : "AC",
    fechaEstablecimiento : "09/03/1961",
    registroTributario : "8600026933",
    estado : "estado 1"
  },
  {
    razonSocial : "3M COLOMBIA",
    pais : "COLOMBIA",
    situacion : "AC",
    fechaEstablecimiento : "09/03/1961",
    registroTributario : "8600026933",
    estado : "estado 2"
  },
  {
    razonSocial : "3M COLOMBIA",
    pais : "COLOMBIA",
    situacion : "AC",
    fechaEstablecimiento : "09/03/1961",
    registroTributario : "8600026933",
    estado : "estado 3"
  },
]

@Injectable({
  providedIn: 'root'
})
export class EmpresaRelacionadaService {

  constructor() { }

  getListEmpresasRelacionadas(){
    return empresaRelacionada;
  }
}
