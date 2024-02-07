import { Pais } from "../combo"

export interface Abonado{
  id : string
  nombre : string
  codigo : string
  revelarNombre : boolean
  pais : Pais
  estado : string
  nroReferencia : string
  creditoConsultado : string
  indicaciones : string
  dtsAdicionales : string
}
