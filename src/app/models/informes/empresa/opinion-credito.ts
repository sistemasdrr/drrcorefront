import { Traduction } from "./datos-empresa"

export interface OpinionCredito{
  id : number
  idCompany : number
  creditRequest : boolean
  consultedCredit : string
  suggestedCredit : string
  currentCommentary : string
  previousCommentary : string
  traductions : Traduction[]
}
