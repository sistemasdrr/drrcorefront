import { Traduction } from "../empresa/datos-empresa"

export interface Persona
{
  id : number
  oldCode : string
  fullname : string
  lastSearched : string
  language : string
  nationality : string
  birthDate : string
  birthPlace : string
  idDocumentType : number
  codeDocumentType : string
  taxTypeName : string
  taxTypeCode : string
  idLegalRegisterSituation : number
  address : string
  cp : string
  city : string
  otherDirecctions : string
  tradeName : string
  idCountry : number
  codePhone : string
  numberPhone : string
  idCivilStatus : number
  relationshipWith : string
  relationshipDocumentType : number
  relationshipCodeDocument : string
  fatherName : string
  motherName : string
  email : string
  cellphone : string
  profession : string
  clubMember : string
  insurance : string
  newsCommentary : string
  printNewsCommentary : boolean
  privateCommentary : string
  reputationCommentary : string
  idCreditRisk : number
  idPaymentPolicy : number
  idReputation : number
  idPersonSituation : number
  quality : string
  traductions : Traduction[]
}

export interface TPersona
{
  id : number
  oldCode : string
  fullname : string
  lastSearched : string
  language : string
  birthDate : string
  documentType : string
  codeDocumentType : string
  address : string
  country : string
  flagCountry : string
  email : string
  cellphone : string
  profession : string
  creditRisk : string
  onWeb : boolean
  enable : boolean
  quality : string
}
