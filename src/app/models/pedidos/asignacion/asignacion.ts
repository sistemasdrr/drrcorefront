import { Trabajador } from "./trabajador"

export interface Asignacion{
  id : number
  trabajador : Trabajador
  referencias : string
  observaciones : string
  fechaAsignacion : string
  fechaEntrega : string
  calidad : string
  precio : number
}
