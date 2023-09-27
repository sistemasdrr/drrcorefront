import { Injectable } from '@angular/core';
import { EmpresaPersona } from 'app/models/empresa-persona';

const empresasPersonas : EmpresaPersona[] = [
  {
    codigo : "1242112",
    tipo : "E",
    nombreBuscado : "INMOBILIARIA MONTES URALES",
    nombreSolicitado : "nombreSolicitado",
    continente : "AMERICA",
    pais : 2,
    ciudad : "arg",
    ruc : "202945467",
    fecha : "26/08/2004",
    situacion : "ACTIVA",
    direccion : "av. sads",
    correo : "inmobi@example.com",
    telefono : "912345678"
  },
  {
    codigo : "1275412",
    tipo : "P",
    nombreBuscado : "Luis Caceres",
    nombreSolicitado : "nombreSolicitado",
    continente : "AMERICA",
    pais : 11,
    ciudad : "LIMA",
    ruc : "102912347",
    fecha : "03/10/2018",
    situacion : "ACTIVA",
    direccion : "av. sads",
    correo : "inmobi@example.com",
    telefono : "912345678"
  },
  {
    codigo : "1276121",
    tipo : "P",
    nombreBuscado : "ALICORP",
    nombreSolicitado : "nombreSolicitado",
    continente : "AMERICA",
    pais : 11,
    ciudad : "LIMA",
    ruc : "202912347",
    fecha : "03/10/2012",
    situacion : "ACTIVA",
    direccion : "av. sads",
    correo : "inmobi@example.com",
    telefono : "912345678"
  },
]

@Injectable({
  providedIn: 'root'
})
export class EmpresaPersonaService {

  constructor() { }

  getEmpresasPersonas(){
    return empresasPersonas
  }
  getEmpresaPersonaByCodigo(codigo : string){
    return empresasPersonas.filter(x => x.codigo == codigo)
  }
}
