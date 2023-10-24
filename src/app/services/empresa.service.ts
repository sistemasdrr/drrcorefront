import { Injectable } from '@angular/core';
import { Empresa } from 'app/models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresas : Empresa[] = [
    {
      id : 1,
      codigoInforme : 'E0000143232',
      rc : 'NN',
      idioma : 'ESPAÑOL',
      razonSocial : 'VALICO S.A.C.',
      datosAl : '31/12/05',
      pais : 'PER',
      rucInit : '20254765814',
      fecEst : '1994',
      ram : '',
      ex : '',
      calificacion : 'A',
      direccion : '',
      dptoEstado : 'LIMA',
      telefono : '3721458',
      ejecPrincipal : ''
    },
    {
      id : 2,
      codigoInforme : 'E0000406826',
      rc : 'B',
      idioma : 'ESPAÑOL-INGLES',
      razonSocial : 'Tubos y Perfiles Metalicos S.A.',
      datosAl : '30/07/23',
      pais : 'PER',
      rucInit : '20100151112',
      fecEst : '1967',
      ram : '16',
      ex : 'SI',
      calificacion : 'A',
      direccion : 'Industrial S/N Z.I. Predio Almonte',
      dptoEstado : 'LIMA',
      telefono : '6370000',
      ejecPrincipal : 'Romero Madariaga, Javier Eduardo'
    },
    {
      id : 3,
      codigoInforme : 'E0000651081',
      rc : 'A+',
      idioma : 'ESPAÑOL-INGLES',
      razonSocial : 'Tejeduria Galicia S.A.',
      datosAl : '10/02/10',
      pais : 'ARG',
      rucInit : '30618824655',
      fecEst : '1985',
      ram : '',
      ex : 'NO',
      calificacion : 'A',
      direccion : 'Cisneros 1532',
      dptoEstado : 'Buenos Aires',
      telefono : '44413300',
      ejecPrincipal : 'Rodriguez, Manuel'
    },
    {
      id : 4,
      codigoInforme : 'E0000379674',
      rc : 'C',
      idioma : 'ESPAÑOL-INGLES',
      razonSocial : 'Superenvases Envalic C.A.',
      datosAl : '02/06/06',
      pais : 'VEN',
      rucInit : 'J00098240',
      fecEst : '1976',
      ram : '',
      ex : 'SI',
      calificacion : 'A',
      direccion : 'Henry Ford, Zona Industrial Sur',
      dptoEstado : 'VALENCIA',
      telefono : '8397411',
      ejecPrincipal : 'Quinteros,  Nicolas'
    },
  ]
  constructor() { }
  getAllEmpresas(){
    return this.empresas
  }
  getEmpresaById(id : number){
    return this.empresas.filter(x => x.id == id)[0]
  }
  deleteEmpresa(codInforme : string){
    this.empresas = this.empresas.filter(x => x.codigoInforme !== codInforme)
  }
}
