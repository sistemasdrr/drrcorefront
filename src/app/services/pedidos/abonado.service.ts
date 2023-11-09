import { Injectable } from '@angular/core';
import { Abonado } from 'app/models/pedidos/abonado';

const listaAbonado : Abonado[] = [
  {
    id : "1",
    nombre : "Abonado 1 Abonado Abonado",
    codigo : "12345",
    revelarNombre : true,
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    estado : "INACTIVO",
    nroReferencia : "1234546789",
    creditoConsultado : "1 000 000",
    indicaciones : "Aqui van las indicaciones",
    dtsAdicionales : "Datos adicionales"
  },
  {
    id : "2",
    nombre : "Abonado 2",
    codigo : "12346",
    revelarNombre : true,
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    estado : "ACTIVO",
    nroReferencia : "1234546789",
    creditoConsultado : "1 000 000",
    indicaciones : "Aqui van las indicaciones",
    dtsAdicionales : "Datos adicionales"
  },
  {
    id : "3",
    nombre : "Abonado 3",
    codigo : "12347",
    revelarNombre : true,
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    estado : "ACTIVO",
    nroReferencia : "1234546789",
    creditoConsultado : "1 000 000",
    indicaciones : "Aqui van las indicaciones",
    dtsAdicionales : "Datos adicionales"
  },
  {
    id : "4",
    nombre : "Abonado 4",
    codigo : "12348",
    revelarNombre : true,
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    estado : "ACTIVO",
    nroReferencia : "1234546789",
    creditoConsultado : "1 000 000",
    indicaciones : "Aqui van las indicaciones",
    dtsAdicionales : "Datos adicionales"
  },
  {
    id : "5",
    nombre : "Abonado 5",
    codigo : "12349",
    revelarNombre : false,
    pais : {
      id: 182,
      valor: "Perú",
      bandera: "pe"
    },
    estado : "ACTIVO",
    nroReferencia : "1234546789",
    creditoConsultado : "1 000 000",
    indicaciones : "Aqui van las indicaciones",
    dtsAdicionales : "Datos adicionales"
  },
]

@Injectable({
  providedIn: 'root'
})
export class AbonadoService {

  constructor() { }

  getAbonados(){
    return listaAbonado;
  }
  getAbonadoPorCodigo(codigo: string) {
    const abonadoEncontrado = listaAbonado.find(abonado => abonado.codigo === codigo);
    return abonadoEncontrado || null;
  }


}
