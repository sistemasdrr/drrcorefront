import { Pais } from "app/models/pais"

export interface Personal{
  id : number
  codigo : string
  nombres : string
  apellidos : string
  telefonoFijo : string
  telefonoEmergencia : string
  telefonoCelular : string
  tipoDocumento : number
  numDocumento : string
  direccion : string
  estadoCivil : number
  numeroHijos : string
  fechaNacimiento : string
  lugarNacimiento : string
  ciudadNacimiento : string
  paisNacimiento : Pais
  tipoSangre : string
  email : string
  fechaIngreso : string
  departamento : number
  cargo : number
  tipoContrato : string
  estado : boolean
  //CUENTA SUELDO
  CSBanco : string
  CSTipoCuenta : number
  CSNumCuenta : string
  CSMoneda : string
  //CUENTA CTS
  CCBanco : string
  CCTipoCuenta : number
  CCNumCuenta : string
  CCMoneda : string
  ESSALUD : ESSALUD[]
}

export interface ESSALUD{
  id : number
  nombre : string
  tipoVinculo : number
  documentoIdentidad : string
}
