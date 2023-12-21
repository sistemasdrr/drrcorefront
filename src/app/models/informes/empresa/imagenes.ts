import { Traduction } from "./datos-empresa"

export interface CompanyImages{
  id : number
  idCompany : number
  imgDesc1 : string
  path1 : string
  imgDesc2 : string
  path2 : string
  imgDesc3 : string
  path3 : string
  imgDesc4 : string
  path4 : string
  traductions : Traduction[]
}
