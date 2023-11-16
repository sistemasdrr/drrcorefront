import { Pais } from "app/models/pais"

export interface DatosEmpresa{
  codigoInforme : string
  informeInvestigadoEl : string
  idioma : string
  tipoInstitucion : string
  yFundacion : number
  razonSocial : string
  nombreComercial : string
  nombreSolicitado : string
  fechaConstitucion : string
  personeriaJuridica : PersoneriaJuridica

  tipoRuc : string
  codigoRuc : string
  situacionRuc : SituacionRuc


  comentarioIdentificacion : string
  comentarioIdentificacionIng : string

  direccionCompleta : string
  duracion : string
  dptoEstado : string
  pais : Pais
  codigoTelefono : string
  numeroTelefono : string
  numeroCelular : string
  codPostal : string
  whatsappEmpresarial : string
  emailCorporativo : string
  paginaWeb : string

  riesgoCrediticio : string
  politicaPagos : string
  reputacion : string
  comentarioReputacion : string
  comentarioReputacionIng : string
  comentarioPrensa : string
  comentarioPrensaIng : string
}

export interface data {
  name: string;
}
export interface SituacionRuc {
  id : number
  description : string
}
export interface PersoneriaJuridica {
  id : number
  description : string
}
export interface Reputacion {
  id : number
  description : string
}
export interface Duracion {
  id : number
  description : string
}
