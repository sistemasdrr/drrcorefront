import { Injectable } from '@angular/core';
import { Abonado } from 'app/models/pedidos/abonado';

const listaAbonado : Abonado[] = [
  {
    id : "1",
    nombre : "Abonado 1 Abonado Abonado",
    codigo : "12345",
    revelarNombre : true,
    pais : {
      id: 0,
      valor: '',
      bandera: '',
      regtrib: '',
      codCel: '',
    },
    estado : "INACTIVO",
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
      id: 0,
      valor: '',
      bandera: '',
      regtrib: '',
      codCel: '',
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
