import { Traduction } from "./datos-empresa"

export interface RamoNegocios{
  codigoInforme : string

  sectorPrincipal : string
  ramoNegocio : string
  actividadEspecifica : string

  importan : string
  paisesImportan : string
  paisesImportanIng : string
  exportan : string
  paisesExportan : string
  paisesExportanIng : string
  ventaContado : string
  ventaContadoIng : string
  ventaCredito : string
  ventaCreditoIng : string
  territorioVentas : string
  territorioVentasIng : string
  ventaExterior : string
  ventaExteriorIng : string
  comprasNacionales : string
  comprasNacionalesIng : string
  comprasExterior : string
  comprasExteriorIng : string

  numTrabajadores : string
  titularidad : string
  areaTotal : string
  areaTotalIng : string
  domicilioAnterior : string
  otrosLocales : string
  otrosLocalesIng : string
  detalleActividad : string
  detalleActividadIng : string
  comentarioNegocio : string
  comentarioNegocioIng : string
  comentarioNegocioTabulado : string
}


export interface CompanyBranch{
  id : number
  idCompany : number
  idBranchSector : number
  idBusinessBranch : number
  import : boolean
  export : boolean
  cashSalePercentage : number
  cashSaleComentary : string
  creditSalePercentage : number
  creditSaleComentary : string
  territorySalePercentage : number
  territorySaleComentary : string
  abroadSalePercentage : number
  abroadSaleComentary : string
  nationalPurchasesPercentage : number
  nationalPurchasesComentary : string
  internationalPurchasesPercentage : number
  internationalPurchasesComentary : string
  workerNumber : number
  idLandOwnership : number
  totalArea : string
  previousAddress : string
  otherLocations : string
  activityDetailCommentary : string
  aditionalCommentary : string
  tabCommentary : string
  countriesExport : string
  countriesImport : string
  specificActivities : string
  traductions : Traduction[]
}

export interface ImportAndExport{
  id : number
  idCompany : number
  type : string
  year : number
  amount : string
  observation : string
  observationEng : string
}

export interface WorkerHistory{
  id : number
  idCompany : number
  numberWorker : number
  numberYear : number
}
