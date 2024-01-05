import { Traduction } from "../empresa/datos-empresa"

export interface TrabajoA{
  id : number
  idPerson : number
  idCompany : number
  currentJob : string
  startDate : string
  endDate : string
  monthlyIncome : string
  annualIncome : string
  jobDetails : string
  traductions : Traduction[]
}

export interface TrabajoG{
  id : number
  idPerson : number
  idCompany : number

  name : string
  address : string
  taxTypeName : string
  taxTypeCode : string
  subTelephone : string
  telephone : string

  currentJob : string
  startDate : string
  endDate : string
  monthlyIncome : string
  annualIncome : string
  jobDetails : string
  traductions : Traduction[]
}
