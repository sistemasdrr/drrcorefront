export interface BalanceInforme {
  id : number
  idInforme : number
  balanceGeneral : Balance[],
  balanceSituacional : Balance[]
}
export interface Balance
{
  id : number
  num : number
  nombreBalance : string
  fechaBalance : string
  tipoBalance : string
  tipoBalanceIng : string
  tiempoBalance : string
  tiempoBalanceIng : string
  //CABECERA
  tipoMoneda : string
  tipoCambioDolar : number
  ventas : number
  utilidadesNetas : number
  //ACTIVO
  cajaBanco : number
  porCobrar : number
  inventario : number
  otrosActivosCorrientes: number
  activoCorriente : number
  fijo : number
  otrosActivosNoCorrientes : number
  activoNoCorriente : number
  totalActivo : number
  //PASIVO
  bancoProv : number
  otrosPasivosCorrientes : number
  pasivoCorriente : number
  largoPlazo : number
  otrosPasivosNoCorrientes : number
  totalPasivo : number
  //PATRIMONIO
  capital : number
  reservas : number
  utilidades : number
  otros : number
  totalPatrimonio : number
  totalPasivoPatrimonio : number
  //RATIOS
  indiceLiquidez : number
  ratioEndeudamiento : number
  ratioRentabilidad : number
  capitalTrabajo : number
}
