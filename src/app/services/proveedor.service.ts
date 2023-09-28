import { Injectable } from '@angular/core';
import { Proveedor } from 'app/models/proveedor';

const proveedor : Proveedor[] = [
  {
    id : 1,
    proveedor : "Proveedor 1",
    telefono : "9019856156",
    pais : 1,
    credMaximo : "100,000",
    credMaximoIng : "100,000",
    plazos : "90 Dias",
    plazosIng : "90 Days",
    cumplimiento : "PUNTUAL",
    clientesDesde : "2003",
    clientesDesdeIng : "2003",
    articulos : "Artefactos electronicos",
    articulosIng : "electrical artefacts",
    referencista : "JPFL",
    comentario : "comentario 1",
    comentarioIng : "comment 1",
    comentarioAdicional : "comentario adicional (no se imprime)"
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor() { }

  getAllProveedores(){
    return proveedor
  }
  getProveedorById(id : number){
    return proveedor.filter(x => x.id == id)[0]
  }
}
