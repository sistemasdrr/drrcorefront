import { Traduction } from "../empresa/datos-empresa"

export interface PropiedadP{
  id : number
  idPerson : number
  propertiesCommentary : string
  traductions : Traduction[]
}
