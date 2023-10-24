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
        informeInvestigadoEl : '30/07/2023',
        idioma : 'ESPAÑOL-INGLES',
        tipoInstitucion : 'PERSONA JURÍDICA',
        yFundacion : 1967,
        razonSocial : 'TUBOS Y PERFILES METALICOS S.A.',
        nombreComercial : 'TUPEMESA',
        fechaConstitucion : '10/10/1967',
        personeriaJuridica : {
          id : 0,
          description : 'Sociedad Anonima'
        },

        tipoRuc : 'RUC',
        codigoRuc : '20100151112',
        situacionRuc : {
          id : 0,
          description : 'Activa'
        },

        comentarioIdentificacion : 'Debemos indicar que la presente empresa investigada NO APARECE EN LA LISTA CLINTON (Listado de empresas vinculadas al terrorismo y narcotráfico, publicado por la Oficina de Control de Activos Extranjeros del Departamento de Tesoro de Estados Unidos de N.A.',
        comentarioIdentificacionIng : 'Please be advised  that the investigated company DOES NOT appear in the list of companies linked to terrorism and drug trafficking published by OFAC, Office of Foreign Assets Control of the United States Department of the Treasury (Clinton List).',

        direccionCompleta : 'Henry Ford, Zona Industrial Sur, Edif. Superenvases Envalic (Frente al Concejo Municipal),',
        duracion : 'Indefinida',
        dptoEstado : 'Lima',
        pais : {
          id : 11,
          nombre : "Peru",
          nombreAcort : "PER",
          nombreMayus : "PERU",
          icono : "pe"
        },
        codigoTelefono : '+511',
        numeroTelefono : '6370000',
        numeroCelular : '',
        codPostal : 'Lima, 16',
        whatsappEmpresarial : '',
        emailCorporativo : 'mzanabria@tupemesa.com.pe ; rcalderon@tupemesa.com.pe',
        paginaWeb : 'www.tupemesa.com.pe',

        riesgoCrediticio : 'B : RIESGO MODERADO (Situación Financiera levemente extendida)',
        politicaPagos : '6. NC ( No se le reporta Notas en contra. Se presume buen cumplimiento)',
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
