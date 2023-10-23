import { Pais } from "app/models/pais"
import { PersoneriaJuridica, SituacionRuc } from "app/views/informe/info-empresa/ie-detalle/e-datos-empresa/datos-empresa.component"

export interface DatosEmpresa{
  codigoInforme : string
  informeInvestigadoEl : string
  idioma : string
  tipoInstitucion : string
  yFundacion : number
  razonSocial : string
  nombreComercial : string
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
