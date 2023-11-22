import { Pais } from "app/models/pais"

export interface DatosEmpresa{
  idInforme : string
  informeInvestigadoEl : string
  idioma : string
  tipoInstitucion : string
  calidadInforme : string
  yFundacion : number
  razonSocial : string
  nombreComercial : string
  nombreSolicitado : string
  fechaConstitucion : string
  personeriaJuridica : PersoneriaJuridica

  tipoRuc : string
  codigoRuc : string
  situacionRuc : SituacionRuc

  comentarioIdentificacion : string
  comentarioIdentificacionIng : string

  direccionCompleta : string
  duracion : string
  dptoEstado : string
  pais : Pais
  codigoTelefono : string
  numeroTelefono : string
  numeroCelular : string
  codPostal : string
  whatsappEmpresarial : string
  emailCorporativo : string
  paginaWeb : string

  riesgoCrediticio : string
  politicaPagos : string
  reputacion : string
  comentarioReputacion : string
  comentarioReputacionIng : string
  comentarioPrensa : string
  comentarioPrensaIng : string
}
export interface Company{
  id : number
  oldCode : string
  name : string
  socialName : string
  lastSearched : string
  language : string
  typeRegister : string
  yearFundation : string
  constitutionDate : string
  quality : string
  idLegalPersonType : number
  taxTypeName : string
  taxTypeCode : string
  idLegalRegisterSituation : number
  address : string
  duration : string
  place : string
  idCountry : number
  subTelephone : string
  tellphone : string
  cellphone : string
  telephone : string
  postalCode : string
  whatsappPhone : string
  email : string
  webPage : string
  idCreditRisk : number
  idPaymentPolicy : number
  idReputation : number
  lastUpdaterUser : number
  reputationComentary : string
  newsComentary : string
  identificacionCommentary : string
  enable : boolean
  traductions : Traduction[]
}
export interface TCompany{
  id : number
  name : string
  code : string
  creditRisk : string
  language : string
  traductionPercentage : number
  lastReportDate : string
  country : string
  flagCountry : string
  isoCountry : string
  taxNumber : string
  quality : string
  manager : string
  onWeb : boolean
}
export interface data {
  name: string;
}
export interface SituacionRuc {
  id : number
  description : string
}
export interface PersoneriaJuridica {
  id : number
  description : string
}
export interface Reputacion {
  id : number
  description : string
}
export interface Duracion {
  id : number
  description : string
}
export interface Traduction{
  key : string
  value : string
}
