import { Traduction } from "./datos-empresa"

export interface CompanySbs{
  id : number
  idCompany : number
  idOpcionalCommentarySbs : number
  aditionalCommentaryRiskCenter : string
  debtRecordedDate : string
  exchangeRate : number
  bankingCommentary : string
  endorsementsObservations : string
  referentOrAnalyst : string
  date : string
  litigationsCommentary : string
  creditHistoryCommentary : string
  guaranteesOfferedNc : number
  guaranteesOfferedFc : number
  traductions : Traduction[]
}

export interface ProveedorT{
  id : number
  idCompany : number
  idPerson : number
  name : string
  telephone : string
  country : string
  flagCountry : string
  maximumAmount : string
  timeLimit : string
  compliance : string
  date : string
  productsTheySell : string
  attendedBy : string
  enable : boolean
}
export interface Proveedor{
  id : number
  idCompany : number
  idPerson : number
  name : string
  idCountry : number
  qualification : string
  date : string
  telephone : string
  attendedBy : string
  idCurrency : number
  maximumAmount : string
  maximumAmountEng : string
  timeLimit : string
  timeLimitEng : string
  compliance : string
  clientSince : string
  clientSinceEng : string
  productsTheySell : string
  productsTheySellEng : string
  additionalCommentary : string
  additionalCommentaryEng : string
  referentCommentary : string
  qualificationEng : string
}

export interface MorosidadComercialT{
  id : number
  idCompany : number
  idPerson : number
  creditorOrSupplier : string
  documentType : string
  date : string
  amountNc : number
  amountFc : number
  pendingPaymentDate : string
  daysLate : number
  enable : boolean

}
export interface MorosidadComercial{
  id : number
  idCompany : number
  idPerson : number
  creditorOrSupplier : string
  documentType : string
  documentTypeEng : string
  date : string
  amountNc : number
  amountFc : number
  pendingPaymentDate : string
  daysLate : number
}

export interface DeudaBancariaT{
  id : number
  idCompany : number
  idPerson : number
  bankName : string
  qualification : string
  debtDate : string
  debtNc : number
  debtFc : number
  memo : string
  memoEng : string
}
export interface DeudaBancaria{
  id : number
  idCompany : number
  idPerson : number
  bankName : string
  qualification : string
  debtDate : string
  debtNc : number
  debtFc : number
  memo : string
  memoEng : string
}
export interface Avales{
  id : number
  idCompany : number
  endorsementName : string
  ruc : string
  amountUs : number
  amountNc : number
  date : string
  receivingEntity : string
}
