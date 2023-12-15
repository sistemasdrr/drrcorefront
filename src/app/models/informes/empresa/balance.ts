export interface Balance{
  id : number
  idCompany : number
  date : string
  balanceType : string
  duration : string
  idCurrency : number
  exchangeRate : number
  sales : number
  utilities : number
  totalAssets : number
  totalCurrentAssets: number
  aCashBoxBank: number
  aToCollect: number
  aInventory: number
  aOtherCurrentAssets: number
  totalNonCurrentAssets: number
  aFixed: number
  aOtherNonCurrentAssets: number
  totalLliabilities: number
  totalCurrentLiabilities: number
  lCashBoxBank: number
  lOtherCurrentLiabilities: number
  totalNonCurrentLiabilities: number
  lLongTerm: number
  lOtherNonCurrentLiabilities: number
  totalPatrimony: number
  pCapital: number
  pStockPile: number
  pOther: number
  totalLiabilitiesPatrimony: number
  liquidityRatio: number
  debtRatio: number
  pUtilities: number
  profitabilityRatio: number
  workingCapital: number
}
