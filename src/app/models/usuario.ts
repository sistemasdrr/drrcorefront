export interface Process{
  id : number
  name : string
  menu : string
  orderItem : number
  enable : boolean
}
export interface User{
  id : number
  idEmployee : number
  userLogin : string
  password : string
  enable : boolean
  emailPassword : string
}
export interface UserPermission{
  gerencia : UserProcess[]
  produccion : UserProcess[]
  administracion : UserProcess[]
  facturacion : UserProcess[]
}
export interface UserProcess{
  id : number
  idProcess : number
  idUser : number
  name : string
  path : string
  icon : string
  enable : boolean
  subLevel : UserProcess[]
}
