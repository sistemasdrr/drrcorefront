export interface RamoNegocio{
  codigo : string
  nombre : string
  nombreIng : string
  enable : boolean
  actividades : Actividad[]
}

export interface Actividad{
  codigo : string
  nombre : string
  nombreIng : string
  enable : boolean
}
