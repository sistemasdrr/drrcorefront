export interface AbonadoT{
  id : number
  code : string
  name : string
  acronym : string
  address : string
  country : string
  flagCountry : string
  isoCountry : string
  enable : boolean
}
export interface Abonado{
  id : number
  code : string
  idContinent : number
  idCountry : number
  city : string
  startDate : string
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
  subscriberType : string //SC = SOLO CLIENTE - CA = CLIENTE / AGENTE
  idCurrency : number //SOLO DE 3 TIPOS: S = SOLES, D = DOLARES, E = EUROS
  facturationType : string //FM = FACT. MENSUAL, CC = CON CUPONES, OL = ONLINE
  normalPrice : boolean
}

export interface PrecioAbonado{
  id : number
  idAbonado : number
  date : string
  idContinent : number
  idCountry : number
  idCurrency : number
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
  priceT1 : string //precio / dias => 75 / 5
  priceT2 : string //precio / dias => 75 / 5
  priceT3 : string //precio / dias => 75 / 5
  priceB : string //precio => 75
}
