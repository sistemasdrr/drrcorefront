import { Traduction } from "../empresa/datos-empresa"

export interface PersonSBS{
  id : number
  idPerson : number
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
