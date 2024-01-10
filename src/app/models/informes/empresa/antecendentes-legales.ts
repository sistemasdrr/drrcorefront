import { Traduction } from "./datos-empresa"

export interface Background{
  id : number
  idCompany : number
  constitutionDate : string
  startFunctionYear : string
  operationDuration : string
  registerPlace : string
  notaryRegister : string
  publicRegister : string
  currentPaidCapital : number
  currentPaidCapitalCurrency : number
  currentPaidCapitalComentary : string
  origin : string
  increaceDateCapital : string
  currency : number
  traded : boolean | null
  tradedBy : string
  currentExchangeRate : number
  lastQueryRrpp : string
  lastQueryRrppBy : string
  background : string
  history : string
  traductions : Traduction[]
}
export interface CompanyRelation{
  id : number
  idCompany : number
  idCompanyRelation : number
}
export interface CompanyRelationT{
  id : number
  idCompany : number
  idCompanyRelation : number
  name : string
  country : string
  flagCountry : string
  taxTypeName : string
  taxTypeCode : string
  constitutionDate : string
  situation : string
}
