import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, DatosEmpresa, PersoneriaJuridica, Reputacion, SituacionRuc } from 'app/models/informes/empresa/datos-empresa';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  private datosEmpresas : Company[] = [
    {
      id : 1,
      oldCode : 'E0000143232',
      name : 'VALICO S.A.C.',
      socialName : 'VALICO S.A.C.',
      lastSearched : '31/12/2005',
      language : 'E',
      typeRegister : 'tipo registro',
      yearFundation : '1994',
      constitutionDate : '10/11/1994',
      quality : 'A',
      idLegalPersonType : 368,
      taxTypeName : 'RUC',
      taxTypeCode : '20254765814',
      idLegalRegisterSituation : 1,
      address : '',
      duration : '',
      place : '',
      idCountry : 182,
      subTelephone : '+51',
      tellphone : '2382198329',
      cellphone : '381279831',
      telephone : '2131903281',
      postalCode : '15201',
      whatsappPhone : '21321312',
      email : 'EADWADW@DASDAS',
      webPage : 'www.sdadsada.com',
      idCreditRisk : 1,
      idPaymentPolicy : 2,
      idReputation : 3,
      lastUpdaterUser : 0,
      reputationComentary : 'c',
      newsComentary : 'comentario de prensa',
      identificacionCommentary : 'comentario de identificacion',
      Traductions : []
    }
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

  constructor(private http : HttpClient) {
  }
  getDatosEmpresas(){
    return this.datosEmpresas
  }
  getDatosEmpresaPorId(id : number): Observable<Company[]>{
    const empresaEncontrada = this.datosEmpresas.filter(emp => emp.id === id);
    return of(empresaEncontrada);
  }
  updateDatosEmpresa(datosEmpresa : Company){
    const index = this.datosEmpresas.findIndex(x => x.id === datosEmpresa.id);
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

  url = environment.apiUrl
  controllerCompany = "/Company"
  AddDatosEmpresa(company : Company) :Observable<Response<Company>>{
    return this.http.post<Response<Company>>(this.url + this.controllerCompany + '/add', company);
  }
}
