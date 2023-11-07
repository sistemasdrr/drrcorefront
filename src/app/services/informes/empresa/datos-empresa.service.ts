import { Injectable } from '@angular/core';
import { DatosEmpresa, PersoneriaJuridica, Reputacion, SituacionRuc } from 'app/models/informes/empresa/datos-empresa';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  private datosEmpresas : DatosEmpresa[] = [
    {
      codigoInforme : 'E0000143232',
      informeInvestigadoEl : '31/12/2005',
      idioma : 'ESPAÑOL',
      tipoInstitucion : '31/12/05',
      yFundacion : 1994,
      razonSocial : 'VALICO S.A.C.',
      nombreComercial : '',
      nombreSolicitado : '',
      fechaConstitucion : '10/11/1994',
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
      nombreSolicitado : '1',
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
      numeroCelular : 'a',
      codPostal : 'Lima, 16',
      whatsappEmpresarial : 'a',
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
  private situacionRuc : SituacionRuc[] = [
    {
      id : 1,
      description : "Activa"
    },
    {
      id : 2,
      description : "Baja de Oficio"
    },
    {
      id : 3,
      description : "Baja Definitiva"
    },
    {
      id : 4,
      description : "Baja Provisional"
    },
    {
      id : 5,
      description : "Cambio de Razón Social"
    },
    {
      id : 6,
      description : "Declarada en Quiebra"
    },
    {
      id : 7,
      description : "Disuelta"
    },
    {
      id : 8,
      description : "En Liquidación"
    },
    {
      id : 9,
      description : "Fusionada"
    },
    {
      id : 10,
      description : "Inactiva"
    },
    {
      id : 11,
      description : "Informe de Prueba"
    },
    {
      id : 12,
      description : "Inmovilizada Judicialmente"
    },
    {
      id : 13,
      description : "No Localizada con ese Nombre"
    },
    {
      id : 14,
      description : "Solo para Lectura"
    },
    {
      id : 15,
      description : "Suspensión Definitiva"
    },
    {
      id : 16,
      description : "Suspensión Temporal"
    },
  ]

  private politicaPagos : string[] = [
    "",
    "1. EXCELENTE PAGADORES (Pagan siempre a tiempo o antes)",
    "2. PUNTUALES (Pagos siempre a tiempo. Varios años)",
    "3. IRREGULARES (Pagos Puntuales y a veces demorados)",
    "4. MOROSOS (Demoras constantes. Incumplidos. Protestos)",
    "5. ND (No se pudo determinar política de pagos al momento. Nuevos)",
    "6. NC ( No se le reporta Notas en contra. Se presume buen cumplimiento)",
    "7. NN (Carece de experiencia crediticia. No son conocidos por consultados)"
  ]

  private calificacionCrediticia : string[] = [
    "",
    "A+ : SIN RIESGO (Solventes, Situación Financiera Muy Buena)",
    "A- : RIESGO MINIMO (Solventes, Situación Financiera Satisfactoria)",
    "B : RIESGO MODERADO (Situación Financiera levemente extendida)",
    "C : RIESGO ALTO (Situación Extendida. Se recomienda garantía colateral)",
    "D : RIESGO MUY ALTO (Situación Financiera Pesada. Pérdidas)",
    "E : RIESGO MUY ALTO (Inoperativa o Liquidada o Quebrada)",
    "NN : RIESGO INDETERMINADO (Información insuficiente o inexistente)."
  ]

  private personeriaJuridica : PersoneriaJuridica[] = [
    {
      id : 1,
      description : "Sociedad de Hecho"
    },
    {
      id : 2,
      description : "Sociedad de Producción Rural"
    },
    {
      id : 3,
      description : "Sociedad de Producción Rural de Resp. Ltda. de Cap. Variable"
    },
    {
      id : 4,
      description : "Sociedad de Producción Rural de Resp. Ilimitada"
    },
    {
      id : 5,
      description : "Sociedad de Producción Rural de Resp. Limitada"
    },
    {
      id : 6,
      description : "Sociedad de Responsabilidad Limitada"
    },
    {
      id : 7,
      description : "Sociedad de Responsabilidad Limitada de Cap. Variable"
    },
    {
      id : 8,
      description : "Sociedad de Responsabilidad Limitada Microindustrial"
    },
    {
      id : 9,
      description : "Sociedad del Estado"
    },
  ]

  private reputacion : Reputacion[] = [
    {
      id : 0,
      description : ""
    },
    {
      id : 1,
      description : "NADA EN SU CONTRA FUE LOCALIZADO."
    },
    {
      id : 2,
      description : "Buena Solvencia Económica y Moral."
    },
    {
      id : 3,
      description : "Referidos como Buenos Contribuyentes (SUNAT)."
    },
    {
      id : 4,
      description : "Empresa de buen prestigio."
    },
    {
      id : 5,
      description : "Aparecen en Lista Clinton."
    },
    {
      id : 6,
      description : "Faltaron el Respeto a nuesto Analista. Mala conducta."
    },
    {
      id : 7,
      description : "No reportan a los verdaderos accionistas (OFFSHORE)"
    },
    {
      id : 8,
      description : "Registra Cta. Cte. Cerrada x girar cheques sin fondo."
    },
    {
      id : 9,
      description : "Empresa poco transparente. Cuidado."
    },
    {
      id : 10,
      description : "Reputación discutible (Publicaciones)"
    },
  ]

  constructor() {
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

  getSituacionRuc(){
    return this.situacionRuc
  }
  getPoliticaPagos(){
    return this.politicaPagos
  }
  getCalificacionCrediticia(){
    return this.calificacionCrediticia
  }
  getPersoneriaJuridica(){
    return this.personeriaJuridica
  }
  getReputacion(){
    return this.reputacion
  }
}
