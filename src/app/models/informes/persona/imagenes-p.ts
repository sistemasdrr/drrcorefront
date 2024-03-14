import { Traduction } from "../empresa/datos-empresa"

export interface PersonImages{
  id : number
  idPerson : number
  imgDesc1 : string
  path1 : string
  imgDesc2 : string
  path2 : string
  imgDesc3 : string
  path3 : string
  traductions : Traduction[]
}
export interface PersonPhoto{
  id : number
  idPerson : number
  numImg : number
  base64 : string
  description : string
  descriptionEng : string
  printImg : boolean

}
