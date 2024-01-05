import { Traduction } from "../empresa/datos-empresa"

export interface InfoGeneralP{
  id : number
  idPerson : number
  generalInformation : string
  traductions : Traduction[]
}
