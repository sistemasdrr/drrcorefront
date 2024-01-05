import { Traduction } from "../empresa/datos-empresa"

export interface HistorialP{
  id : number
  idPerson : number
  historyCommentary : string
  traductions : Traduction[]
}
