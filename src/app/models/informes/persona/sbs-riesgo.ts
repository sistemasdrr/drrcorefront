import { Traduction } from "../empresa/datos-empresa"

export interface PersonSBS{
  id : number
  idPerson : number
  aditionalCommentaryRiskCenter : string
  debtRecordedDate : string
  exchangeRate : number
  bankingCommentary : string
  referentOrAnalyst : string
  date : string
  litigationsCommentary : string
  creditHistoryCommentary : string
  sbsCommentary : string
  guaranteesOfferedNc : number
  guaranteesOfferedFc : number
  traductions : Traduction[]
}
