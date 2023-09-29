import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'app/models/proveedor';
import { ProveedorService } from 'app/services/proveedor.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent {
  titulo : string = ''
  accion : string = ''
  //DATOS DEL FORM
  id : number = 0
  proveedor : string = ''
  pais : number = 0
  calificacion : string = ''
  fecha : string = '29/9/2023'
  telefono : string = ''
  atendio : string = ''
  moneda : number = 0
  montoMaximo : string = ''
  plazos : string = ''
  cumplimiento : string = ''
  clienteDesde : string = ''
  articulos : string = ''
  comentario : string = ''
  comentarioAdicional : string = ''

  constructor(
    public dialogRef: MatDialogRef<DetalleProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proveedorService : ProveedorService
    ){
      if(data.accion == "AGREGAR"){
        this.accion = data.accion
        this.titulo = "Agregar Proveedor"
        console.log(data)
        this.id = data.id
      }else if(data.accion == "EDITAR"){
        this.accion = data.accion
        this.titulo = "Editar Proveedor"
        this.id = data.id
        let prov : Proveedor = this.proveedorService.getProveedorById(data.id)
        console.log(prov)

        this.proveedor = prov.proveedor
        this.pais = prov.pais
        this.calificacion = prov.calificacion
        this.fecha = prov.fecha
        this.telefono = prov.telefono
        this.atendio = prov.atendio
        this.moneda = prov.moneda
        this.montoMaximo = prov.credMaximo
        this.plazos = prov.plazos
        this.cumplimiento = prov.cumplimiento
        this.clienteDesde = prov.clientesDesde
        this.articulos = prov.articulos
        this.comentario = prov.comentario
        this.comentarioAdicional = prov.comentarioAdicional
      }
    }

    agregar(){
      const obj : Proveedor = {
        id : 0,
        proveedor : this.proveedor,
        telefono : this.telefono,
        pais : this.pais,
        calificacion : this.calificacion,
        fecha : this.fecha,
        moneda : this.moneda,
        credMaximo : this.montoMaximo,
        credMaximoIng : this.montoMaximo,
        plazos : this.plazos,
        plazosIng : this.plazos,
        cumplimiento : this.cumplimiento,
        clientesDesde : this.clienteDesde,
        clientesDesdeIng : this.clienteDesde,
        articulos : this.articulos,
        articulosIng : this.articulos,
        atendio : this.atendio,
        comentario : this.comentario,
        comentarioIng : this.comentario,
        comentarioAdicional : this.comentarioAdicional
      }
      this.proveedorService.AddProveedor(obj)
      console.log("guardado")
    }
    editar(){
      const obj : Proveedor = {
        id : 0,
        proveedor : this.proveedor,
        telefono : this.telefono,
        pais : this.pais,
        calificacion : this.calificacion,
        fecha : this.fecha,
        moneda : this.moneda,
        credMaximo : this.montoMaximo,
        credMaximoIng : this.montoMaximo,
        plazos : this.plazos,
        plazosIng : this.plazos,
        cumplimiento : this.cumplimiento,
        clientesDesde : this.clienteDesde,
        clientesDesdeIng : this.clienteDesde,
        articulos : this.articulos,
        articulosIng : this.articulos,
        atendio : this.atendio,
        comentario : this.comentario,
        comentarioIng : this.comentario,
        comentarioAdicional : this.comentarioAdicional
      }
      this.proveedorService.UpdateProveedor(this.id, obj)
      console.log(obj)
    }


}
