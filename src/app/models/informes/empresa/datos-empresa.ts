import { Pais } from 'app/models/combo';

export interface Company{
  id : number
  oldCode : string
  name : string
  socialName : string
  lastSearched : string
  language : string
  typeRegister : string
  yearFundation : string
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
  print : boolean
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
