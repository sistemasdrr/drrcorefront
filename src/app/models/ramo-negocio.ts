export interface RamoNegocio{
  id : number
  nombre : string
  nombreIng : string
  enable : boolean
  actividades : Actividad[]
}

export interface Actividad{
  id : number
  nombre : string
  nombreIng : string
  enable : boolean
}
