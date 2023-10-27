export interface Personal{
  id : number
  codigo : string
  nombres : string
  apellidos : string
  telefonoFijo : string
  telefonoEmergencia : string
  telefonoCelular : string
  tipoDocumento : string
  numDocumento : string
  direccion : string
  estadoCivil : string
  numeroHijos : string
  fechaNacimiento : string
  lugarNacimiento1 : string
  lugarNacimiento2 : string
  lugarNacimiento3 : string
  tipoSangre : string
  email : string
  fechaIngreso : string
  cargo : string
  tipoContrato : string
  estado : boolean
  //CUENTA SUELDO
  CSBanco : string
  CSTipoCuenta : string
  CSNumCuenta : string
  CSMoneda : string
  //CUENTA CTS
  CCBanco : string
  CCTipoCuenta : string
  CCNumCuenta : string
  CCMoneda : string
  ESSALUD : ESSALUD[]
}

export interface ESSALUD{
  id : number
  nombre : string
  tipoVinculo : string
  documentoIdentidad : string
}
