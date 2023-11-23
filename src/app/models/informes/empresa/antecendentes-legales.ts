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


  // codigoInforme : string
  // fechaConstitucion : string
  // inicioActividades : string
  // duracion : string
  // duracionIng : string
  // registradaEn : string
  // registradaEnIng : string
  // notaria : string
  // registrosPublicos : string
  // registrosPublicosIng : string

  // monedaPais : string
  // monto : string
  // observacion : string
  // observacionIng : string

  // origen : string
  // fechaAumento : string
  // fechaAumentoIng : string

  // moneda : Moneda
  // cotizada : string
  // por : string
  // actualTC : string
  // actualTCIng : string
  // fechaUltimaConsultaRRPP : string
  // fechaUltimaConsultaPor : string

  // comentarioAntecedentesLegales : string
  // comentarioAntecedentesLegalesIng : string
  // comentarioHistoriaAntecedentes : string
  // comentarioHistoriaAntecedentesIng : string
}
