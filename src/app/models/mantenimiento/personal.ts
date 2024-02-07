
export interface Personal{
  address : string
  birthday : string | null
  bloodType : string
  cellphone : string
  childrenNumber : number
  code : string
  ctsBank : string
  distrit : string
  documentNumber : string
  email : string
  emergencyPhone : string
  endDate : string | null
  firstName : string
  healthInsuranceRequestDto : ESSALUD[]
  id : number
  idBankAccountTypeCts : number
  idBankAccountTypeSalary : number
  idCivilStatus : number
  idCountry : number
  idCurrencyCts : number
  idCurrencySalary : number
  idDocumentType : number
  idJob : number
  idJobDepartment : number
  lastName : string
  numberAccountCts : string
  numberAccountSalary : string
  photoPath : string
  province : string
  salaryBank : string
  shortName : string
  startDate : string | null
  telephone : string
  workModality : string
}

export interface ESSALUD{
  nameHolder : string
  idFamilyBondType : number
  documentNumber : string
}

export interface TipoVinculo{
  id : number
  valor : string
}
