import { Traduction } from "./datos-empresa"

export interface InformacionGeneral{
  id : number
  idCompany : number
  generalInfo : string
  traductions : Traduction[]
}
