import { Pais } from "../pais"

export interface ReportesSolicitados {
  tipo : string
  cupon : string
  nombreSolicitado : string
  despacho : string
  abonado : string
  tramite : string
  pais : Pais
  balance : string
  calidad : string
  estado : string
}
