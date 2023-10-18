import { BalanceInforme } from "./balance"
import { HistoricoVentas } from "./historico-ventas"

export interface Empresa{
  id : number
  //DATOS DE EMPRESA
  informeInvestigadoEl : string
  idioma : string
  tipoInstitucion : string
  anioFundacion : string
  razonSocial : string
  nombreComercial : string
  fechaConstitucion : string
  personeriaJuridica : string
  tipoRUC : string
  codRUC : string
  situacionRUC : string
  comentarioIdentificacion : string
  comentarioIdentificacionIng : string
  direccionCompleta : string
  duracion : string
  dptoEstado : string
  pais : string
  codTelefono : string
  numeroTelefono : string
  celular : string
  codPostal: string
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

  //ANTECEDENTES
  //fechaConstitucion : string
  //duracion : string
  registradaEn : string
  notaria : string
  registrosPublicos : string
  registrosPublicosIng : string
  capitalPagadoActual : string
  capitalPagadoActualIng : string
  origen : string
  fechaAumento : string
  fechaAumentoIng : string
  comentarioCapital : string
  comentarioCapitalIng : string
  cotizadoEnBolsa : string
  cotizadoEnBolsaPor : string
  actualTC : string
  actualTCIng : string
  monedaPais : string
  fechaUltimaConsultaRRPP : string
  fechaUltimaConsultaRRPPPor : string
  historiaAntecedentes : string
  historiaAntecedentesIng : string
  comentarioAntecedentes : string
  comentarioAntecedentesIng : string

  //RAMO DE NEGOCIO
  sectorPrincipal : string
  ramoNegocio : string
  actividadEspecifica : string
  checkImportan : string
  paisesImportan : string
  checkExportan : string
  paisesExportan : string
  ventaContadoForma : string
  creditoTerminos : string
  creditoTerminosIng : string
  territorioVentas: string
  territorioVentasIng: string
  ventasExterior : string
  ventasExteriorIng : string
  comprasNacionales : string
  comprasNacionalesIng : string
  delExterior : string
  delExteriorIng : string
  numTrabajadores : string
  titularidad : string
  areaTotal : string
  areaTotalIng : string
  otrosLocales : string
  otrosLocalesIng : string
  domicilioAnterior : string
  detalleActividadPrincipal : string
  detalleActividadPrincipalIng : string
  cometarioNegocio : string
  cometarioNegocioIng : string
  comentarioNegocioTabulado : string

  //INFORMACION FINANCIERA
  entrevistado : string
  cargo : string
  cargoIng : string
  gradoColaboracion : string
  historicoVentas : HistoricoVentas[]
  comentarioEntrevista : string
  auditores : string
  situacionFinanciera : string
  principalesActivos : string
  principalesActivosIng : string
  balance : BalanceInforme
  comentarioConBalance : string
  comentarioSinBalance : string
  comentarioFinancieroElegido : string
  comentarioFinancieroElegidoIng : string
  comentarioAnalista : string
  comentarioAnalistaIng : string
  //riesgoCrediticio : string

  //Balance General
  

}
