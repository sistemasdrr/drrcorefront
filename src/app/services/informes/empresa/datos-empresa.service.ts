import { Injectable } from '@angular/core';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  private datosEmpresas : DatosEmpresa[] = []

  constructor() {
    this.datosEmpresas = [
      {
        codigoInforme : 'E0000143232',
        informeInvestigadoEl : '31/12/2005',
        idioma : 'ESPAÑOL',
        tipoInstitucion : '31/12/05',
        yFundacion : 1994,
        razonSocial : 'VALICO S.A.C.',
        nombreComercial : '',
        fechaConstitucion : '',
        personeriaJuridica : {
          id : 0,
          description : 'Sociedad Anonima Cerrada'
        },

        tipoRuc : 'RUC',
        codigoRuc : '20254765814',
        situacionRuc : {
          id : 0,
          description : ''
        },

        comentarioIdentificacion : '',
        comentarioIdentificacionIng : '',

        direccionCompleta : '',
        duracion : '',
        dptoEstado : 'LIMA',
        pais : {
          id : 11,
          nombre : "Peru",
          nombreAcort : "PER",
          nombreMayus : "PERU",
          icono : "pe"
        },
        codigoTelefono : '+511',
        numeroTelefono : '3721458',
        numeroCelular : '511',
        codPostal : '',
        whatsappEmpresarial : '3722741',
        emailCorporativo : '',
        paginaWeb : '',

        riesgoCrediticio : 'NN : RIESGO INDETERMINADO (Información insuficiente o inexistente).',
        politicaPagos : '',
        reputacion : '',
        comentarioReputacion : '',
        comentarioReputacionIng : '',
        comentarioPrensa : '',
        comentarioPrensaIng : ''
      },
      {
        codigoInforme : 'E0000406826',
        informeInvestigadoEl : '02/06/2006',
        idioma : 'ESPAÑOL-INGLES',
        tipoInstitucion : 'PERSONA JURÍDICA',
        yFundacion : 1976,
        razonSocial : 'SUPERENVASES ENVALIC C.A.',
        nombreComercial : '',
        fechaConstitucion : '27/05/1976',
        personeriaJuridica : {
          id : 0,
          description : 'Sociedad Anonima'
        },

        tipoRuc : 'RIF',
        codigoRuc : 'J0009824O',
        situacionRuc : {
          id : 0,
          description : 'Activa'
        },

        comentarioIdentificacion : 'En síntesis, SUPERENVASES ENVALIC CA es una empresa venezolana dedicada desde hace mas de dos décadas a la fabricación de envases desechables de aluminio, referida de importancia en el mercado y que además forma parte de un prestigioso Grupo POLAR.\nSe trató de obtener su balance y/o cifras tanto por fuentes directas como por terceros con la finalidad de conocer su real situación, sin buenos resultados.\nEn plaza se le ha detectado poca experiencia crediticia comercial, sin incidentes negativos.',
        comentarioIdentificacionIng : 'SUPERENVASES ENVALIC CA is a Venezuelan company engaged in manufacture of disposable aluminium cans, operating in the market for more than 20 years, referred as to an important company in its industry, which besides forms part of the prestigious POLAR GROUP.\nBalance Sheet for the Period 2004 shows a favorable condition. Prompt payments have been reported and no adverse credit records were found.',

        direccionCompleta : 'Henry Ford, Zona Industrial Sur, Edif. Superenvases Envalic (Frente al Concejo Municipal),',
        duracion : '',
        dptoEstado : 'Valencia',
        pais : {
          id : 12,
          nombre : "Venezuela",
          nombreAcort : "VENE",
          nombreMayus : "VENEZUELA",
          icono : "ve"
        },
        codigoTelefono : '+58241',
        numeroTelefono : '8397411   / 8397394   / 8397385',
        numeroCelular : '58241',
        codPostal : '',
        whatsappEmpresarial : '8397411   / 8397394',
        emailCorporativo : '',
        paginaWeb : 'www.empresas-polar.com',

        riesgoCrediticio : 'C : RIESGO ALTO (Situación Extendida. Se recomienda garantía colateral)',
        politicaPagos : '2. PUNTUALES (Pagos siempre a tiempo. Varios años)',
        reputacion : '',
        comentarioReputacion : '',
        comentarioReputacionIng : '',
        comentarioPrensa : '',
        comentarioPrensaIng : ''
      },
    ]
   }

  getDatosEmpresa(codigoInforme : string){
    return this.datosEmpresas.filter(emp => emp.codigoInforme === codigoInforme)
  }

  updateDatosEmpresa(datosEmpresa : DatosEmpresa){
    const index = this.datosEmpresas.findIndex(x => x.codigoInforme === datosEmpresa.codigoInforme);
    if (index !== -1) {
      this.datosEmpresas[index] = datosEmpresa;
    }else{
      console.log('No se encontro el informe.')
    }
  }



}
