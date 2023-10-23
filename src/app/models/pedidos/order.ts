import { Abonado } from "./abonado"
import { Attachment } from "../attachment"

export interface Order {
  id: string
  cupon: string
  informe: string
  tipoInforme: string
  tipoTramite : string
  calidad: string
  fechaIngreso: string
  fechaVencimiento: string
  fechaVencimientoReal: string
  fechaDescarga: string
  estado: string
  comment : string
  attachments : Attachment[]

  abonado : Abonado
  creditoConsultado: number
  numOrden: number
  revelarNombre: string
  numeroReferencia: number
  indicacionesAbonado: string
  nombreReal : string
  nombreSolicitado : string
  continente : string
  pais : string
  ciudad : string
  regTributario : string
  direccion : string
  telefono : string
  correo : string
  fax : string
  precioInforme: number
  fechaInforme: string

}
