import { Traduction } from "../empresa/datos-empresa"

export interface ActividadesP{
  id : number
  idPerson : number
  activitiesCommentary : string
  traductions : Traduction[]
}
