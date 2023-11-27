export interface AbonadoT{
  id : number
  code : string
  name : string
  acronym : string
  address : string
  country : string
  flagCountry : string
  enable : boolean
}
export interface Abonado{
  id : number
  code : string
  idContinent : number
  idCountry : number
  city : string
  incomeDate : string
  name : string
  acronym : string
  address : string
  language : string
  telephone : string
  fax : string
  email : string
  webPage : string
  principalContact : string
  idRubro : number
  taxRegistration : string
  sendReportToName : string
  sendReportToTelephone : string
  sendReportToEmail : string
  sendInvoiceToName : string
  sendInvoiceToTelephone : string
  sendInvoiceToEmail : string
  additionalContactName : string
  additionalContactTelephone : string
  additionalContactEmail : string
  observations : string
  indications : string
  maximumCredit : boolean
  revealName : boolean
  abonadoType : string //SC = SOLO CLIENTE - CA = CLIENTE / AGENTE
  currency : string //SOLO DE 3 TIPOS: S = SOLES, D = DOLARES, E = EUROS
  facturationType : string //FM = FACT. MENSUAL, CC = CON CUPONES, OL = ONLINE
  normalPrice : boolean
}

export interface PrecioAbonado{
  id : number
  date : string
  idContinent : number
  idCountry : number
  country : string
  flagCountry : string
  idCurrency : number
  currency : string
  priceT1 : number
  dayT1: number
  priceT2 : number
  dayT2: number
  priceT3 : number
  dayT3: number
  priceB : number
}
export interface PrecioAbonadoT{
  id : number
  date : string
  country : string
  flagCountry : string
  currency : string
  priceT1 : string
  priceT2 : string
  priceT3 : string
  priceB : string
}
