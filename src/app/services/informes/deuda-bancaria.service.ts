import { DeudaBancaria } from '../../models/informes/deuda-bancaria';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DeudaBancariaService {
  deudaBancaria: DeudaBancaria[] = [
    {
      id: 1,
      banco: "BCP",
      calificacion: "A",
      deudaMN: "deuda MN",
      deudaME: "deuda ME",
      memo: "memo 1",
      memoIng: "memo ing"
    },
    {
      id: 2,
      banco: "INTERBANK",
      calificacion: "B",
      deudaMN: "deuda MN",
      deudaME: "deuda ME",
      memo: "memo 2",
      memoIng: "memo ing"
    }
  ]
  constructor() {

  }

  getAllDeudaBancaria() {
    return this.deudaBancaria
  }
  getDeudaBancariaById(id: number) {
    return this.deudaBancaria.filter(x => x.id == id)[0]
  }
  AddDeudaBancaria(obj: DeudaBancaria) {
    let idMax: number = 0
    for (let i = 0; i < this.deudaBancaria.length; i++) {
      const elemento = this.deudaBancaria[i]
      if (idMax < elemento.id) {
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.deudaBancaria.push(obj)
  }
  UpdateDeudaBancaria( obj: DeudaBancaria) {
    this.deudaBancaria.filter(x => x.id == obj.id)[0] = obj
  }
  DeleteDeudaBancaria(id: number) {
    this.deudaBancaria = this.deudaBancaria.filter(x => x.id !== id)
  }
}
