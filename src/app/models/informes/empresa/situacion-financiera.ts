import { Traduction } from "./datos-empresa"

export interface SituacionFinanciera{
  codigoInforme : string

  entrevistados : string
  cargos : string
  cargosIng : string
  gradoColaboracion : string

  comentarioEntrevista : string
  comentarioEntrevistaIng : string
  auditores : string

  situacionFinanciera : string
  principalesActivos : string
  principalesActivosIng : string
  comentarioInformeConBalance : string
  comentarioInformeSinBalance : string
  comentarioFinancieroElegido : string
  comentarioAnalista : string
  comentarioAnalistaIng : string
  riesgoCrediticio : string
}
export interface FinancialInformation{
  id : number
  idCompany : number
  interviewed : string
  workPosition : string
  idCollaborationDegree : number
  interviewCommentary : string
  auditors : string
  idFinancialSituacion : number
  reportCommentWithBalance : string
  reportCommentWithoutBalance : string
  financialCommentarySelected : string
  mainFixedAssets : string
  analystCommentary : string
  tabCommentary : string
  traductions : Traduction[]
}

export interface HistoricoVentas{
  id : number
  idCompany : number
  idCurrency : number
  date : Date
  amount : number
  exchangeRate : number
  equivalentToDollars : number
}
export interface HistoricoVentasT{
  id : number
  date : string
  currency : string
  amount : string
  exchangeRate : string
  equivalentToDollars : string
}
