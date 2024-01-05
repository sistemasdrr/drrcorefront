import { Traduction } from "../empresa/datos-empresa"

export interface Domicilio{
  id : number
  idPerson : number
  ownHome : boolean | null
  value : string
  homeCommentary : string
  traductions : Traduction[]
}
