export interface SociosEmpresa{
  id : number
  idCompany : number
  idPerson : number
  mainExecutive : boolean
  profession : string
  participation : number
  startDate : string
}
export interface SociosEmpresaT{
  id : number
  idCompany : number
  idPerson : number
  name : string
  nationality : string
  birthDate : string
  identificationDocument : string
  mainExecutive : boolean
  profession : string
  participation : number
  startDate : string
}
export interface SociosPersonaT{
  id : number
  idCompany : number
  idPerson : number
  name : string
  country : string
  flagCountry : string
  taxTypeName : string
  taxTypeCode : string
  situation : string
  mainExecutive : boolean
  profession : string
  constitutionDate : string
}
export interface AccionistasEmpresa{
  id : number
  idCompany : number
  idCompanyShareHolder : number
  relation : string
  relationEng : string
  participation : number
  startDate : string
}
export interface AccionistasEmpresaT{
  id : number
  idCompany : number
  idCompanyShareHolder : number
  name : string
  country : string
  flagCountry : string
  taxTypeName : string
  taxtTypeCode : string
  relation : string
  participation : number
  startDate : string
}
