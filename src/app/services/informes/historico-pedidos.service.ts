import { Injectable } from '@angular/core';
import { HistoricoPedidos } from 'app/models/informes/historico-pedidos';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPedidosService {
  historicoPedidos : HistoricoPedidos[] = [
    {
      id : 1,
      abonado : "abonado 1",
      cupVirtual : "123456",
      fecPedido : "4/10/2023",
      fecDespacho : "9/10/2023",
      tipInforme : "RV",
      reputacion : "A",
      agente : "AGENTE 1",
      supervisor : "SUPERVISOR 1",
      digitador : "DIGITADOR 1",
      traductora : "TRADUCTORA 1",
      idioma : "ESPAÑOL",
      solicitado : "ALICORP SAC"
    },
    {
      id : 2,
      abonado : "abonado 2",
      cupVirtual : "123457",
      fecPedido : "8/10/2023",
      fecDespacho : "13/10/2023",
      tipInforme : "RV",
      reputacion : "A",
      agente : "AGENTE 2",
      supervisor : "SUPERVISOR 2",
      digitador : "DIGITADOR 2",
      traductora : "TRADUCTORA 2",
      idioma : "ESPAÑOL",
      solicitado : "ALICORP SAC"
    },
  ]
  constructor() { }

  GetAllHistoricoPedidos(){
    return this.historicoPedidos
  }
  GetHistoricoPedidosById(id : number){
    return this.historicoPedidos.filter(x => x.id == id)[0]
  }
  AddHistoricoPedidos(obj : HistoricoPedidos){
    let idMax : number = 0
    for (let i = 0; i < this.historicoPedidos.length; i++) {
      const elemento = this.historicoPedidos[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.historicoPedidos.push(obj)
  }
  UpdateHistoricoPedidos(obj : HistoricoPedidos){
    const index = this.historicoPedidos.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.historicoPedidos[index] = obj;
    }  }
  DeleteHistoricoPedidos(id : number){
    this.historicoPedidos = this.historicoPedidos.filter(x => x.id !== id)
  }
}
