import { Injectable } from '@angular/core';
import { EmpresaRelacionada } from 'app/models/informes/empresa-relacionada';



@Injectable({
  providedIn: 'root'
})
export class EmpresaRelacionadaService {

  empresaRelacionada : EmpresaRelacionada[] = [
    {
      id : 1,
      razonSocial : "3M COLOMBIA",
      pais : "COLOMBIA",
      situacion : "AC",
      fechaEstablecimiento : "09/03/1961",
      registroTributario : "8600026933",
      estado : "estado 1"
    },
    {
      id : 2,
      razonSocial : "3M COLOMBIA",
      pais : "COLOMBIA",
      situacion : "AC",
      fechaEstablecimiento : "09/03/1961",
      registroTributario : "8600026933",
      estado : "estado 2"
    },
    {
      id : 3,
      razonSocial : "3M COLOMBIA",
      pais : "COLOMBIA",
      situacion : "AC",
      fechaEstablecimiento : "09/03/1961",
      registroTributario : "8600026933",
      estado : "estado 3"
    },
  ]

  constructor() { }

  GetAllEmpresaRelacionada(){
    return this.empresaRelacionada
  }
  GetEmpresaRelacionadaById(id : number){
    return this.empresaRelacionada.filter(x => x.id == id)[0]
  }
  AddEmpresaRelacionada(obj : EmpresaRelacionada){
    let idMax : number = 0
    for (let i = 0; i < this.empresaRelacionada.length; i++) {
      const elemento = this.empresaRelacionada[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.empresaRelacionada.push(obj)
  }
  UpdateEmpresaRelacionada(obj : EmpresaRelacionada){
    const index = this.empresaRelacionada.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.empresaRelacionada[index] = obj;
    }  }
  DeleteHistoricoPedidos(id : number){
    this.empresaRelacionada = this.empresaRelacionada.filter(x => x.id !== id)
  }
}
