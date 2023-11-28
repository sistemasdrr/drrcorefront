export interface Agente{
  id : number
  code : string
  name : string
  startDate : string
  address : string
  email : string
  telephone : string
  fax : string
  inCharge : string
  language : string
  idCountry : number
  observations : string
  status : boolean
  specialCase : boolean
  agenteAbonado : boolean
}

export interface AgenteT{
  id : number
  code : string
  name : string
  address : string
  email : string
  telephone : string
  country : string
  flagCountry : string
  status : boolean
}
export interface PrecioAgente{
  id : number
  idAgente : number
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

}
export interface PrecioAgenteT{
  id : number
  date : string
  country : string
  flagCountry : string
  priceT1 : string
  priceT2 : string
  priceT3 : string
  pricePN : string
  priceBD : string
  priceRP : string
  priceCR : string
  currency : string

}
