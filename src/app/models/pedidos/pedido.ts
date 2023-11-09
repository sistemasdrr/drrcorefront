import { Adjunto } from "../adjunto"
import { Asignacion } from "./asignacion/asignacion"

export interface Pedido {
  id: number
  cupon: string
  informeEP : string
  idioma : string
  codigoInforme: string
  estadoPedido : string
  tipoInforme: number
  tipoTramite : number
  calidad: string
  fechaIngreso: string
  fechaVencimiento: string
  fechaVencimientoReal: string
  fechaDescarga: string

  //ABONADO
  idAbonado : string
  nombre : string
  codigo : string
  revelarNombre : boolean
  pais : number
  codigoPais : string,
  estado : string
  nroReferencia : string
  creditoConsultado : string
  indicaciones : string
  dtsAdicionales : string

  //DATOS EMPRESA
  nombreRealEmpresa : string
  nombreSolicitadoEmpresa : string
  tipoRT : string
  codigoRT : string
  continenteEmpresa : number
  paisEmpresa : number
  ciudadEmpresa : string
  direccionEmpresa : string
  correoEmpresa : string
  telefonoEmpresa : string

  //DATOS PERSONA



  precioInforme: number
  //ASIGNACIONES
  asignacion : Asignacion[]
  adjuntos : Adjunto[]
}
