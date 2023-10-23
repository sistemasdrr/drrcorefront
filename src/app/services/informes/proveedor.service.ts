import { Injectable } from '@angular/core';
import { Proveedor } from 'app/models/informes/proveedor';



@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  proveedor : Proveedor[] = [
    {
      id : 1,
      proveedor : "Proveedor 1",
      telefono : "9019856156",
      pais : 1,
      calificacion : "calificacion",
      fecha : "30/09/2023",
      moneda : 1,
      credMaximo : "100,000",
      credMaximoIng : "100,000",
      plazos : "90 Dias",
      plazosIng : "90 Days",
      cumplimiento : "PUNTUAL",
      clientesDesde : "2003",
      clientesDesdeIng : "2003",
      articulos : "Artefactos electronicos",
      articulosIng : "electrical artefacts",
      atendio : "JPFL",
      comentario : "comentario 1",
      comentarioIng : "comment 1",
      comentarioAdicional : "comentario adicional (no se imprime)"
    },
    {
      id : 2,
      proveedor : "Proveedor 1",
      telefono : "9019856156",
      pais : 1,
      calificacion : "calificacion",
      fecha : "29/09/2023",
      moneda : 2,
      credMaximo : "100,000",
      credMaximoIng : "100,000",
      plazos : "90 Dias",
      plazosIng : "90 Days",
      cumplimiento : "PUNTUAL",
      clientesDesde : "2003",
      clientesDesdeIng : "2003",
      articulos : "Artefactos electronicos",
      articulosIng : "electrical artefacts",
      atendio : "JPFL",
      comentario : "comentario 1",
      comentarioIng : "comment 1",
      comentarioAdicional : "comentario adicional (no se imprime)"
    },

  ]
  constructor() { }

  getAllProveedores(){
    return this.proveedor
  }
  getProveedorById(id : number){
    return this.proveedor.filter(x => x.id == id)[0]
  }
  AddProveedor(obj : Proveedor){
    let idMax : number = 0
    for (let i = 0; i < this.proveedor.length; i++) {
      const elemento = this.proveedor[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.proveedor.push(obj)
  }
  UpdateProveedor(obj: Proveedor) {
    const index = this.proveedor.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.proveedor[index] = obj;
    }
  }

  DeleteProveedor(id : number){
    this.proveedor = this.proveedor.filter(x => x.id !== id)
  }
}
