export interface ProveedorT{
  id : number
  idCompany : number
  name : string
  telephone : string
  country : string
  flagCountry : string
  maximumAmount : string
  timeLimit : string
  compliance : string
  date : string
  productsTheySell : string
  attendedBy : string
  enable : boolean
}
export interface Proveedor{
  id : number
  idCompany : number
  name : string
  idCountry : number
  qualification : string
  date : string
  telephone : string
  attendedBy : string
}
