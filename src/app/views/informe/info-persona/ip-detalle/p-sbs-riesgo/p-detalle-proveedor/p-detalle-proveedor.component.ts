import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'app/models/informes/proveedor';
import { ProveedorService } from 'app/services/informes/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-detalle-proveedor',
  templateUrl: './p-detalle-proveedor.component.html',
  styleUrls: ['./p-detalle-proveedor.component.scss']
})
export class PDetalleProveedorComponent {
  titulo : string = ''
  accion : string = ''
  //DATOS DEL FORM
  id = 0
  proveedor = ''
  pais = 0
  calificacion = ''
  fecha = '29/9/2023'
  telefono = ''
  atendio = ''
  moneda = 0
  montoMaximo = ''
  montoMaximoIng = ''
  plazos = ''
  plazosIng = ''
  cumplimiento = ''
  clienteDesde = ''
  clienteDesdeIng = ''
  articulos = ''
  articulosIng = ''
  comentarioAdicional = ''
  comentarioAdicionalIng = ''
  comentario = ''

  constructor(
    public dialogRef: MatDialogRef<PDetalleProveedorComponent>,
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
        const prov : Proveedor = this.proveedorService.getProveedorById(data.id)

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
        comentarioAdicional : this.comentarioAdicional,
        comentarioAdicionalIng : this.comentarioAdicionalIng,
        comentario : this.comentario,
      }
      this.proveedorService.AddProveedor(obj)
      Swal.fire({
        title :'¡Registrado!',
        text : 'El registro se guardo correctamente.',
        icon : 'success',
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.dialogRef.close()
        }
      })
    }
    editar(){
      Swal.fire({
        title: '¿Está seguro de editar este registro?',
        text: "",
        icon: 'info',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          const obj : Proveedor = {
            id : this.id,
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
            comentarioAdicional : this.comentarioAdicional,
            comentarioAdicionalIng : this.comentarioAdicionalIng,
            comentario : this.comentario,
          }
          this.proveedorService.UpdateProveedor(obj)
          Swal.fire({
            title :'¡Actualizado!',
            text : 'El registro se edito correctamente.',
            icon : 'success',
            width: '20rem',
            heightAuto : true
          }).then((result) => {
            if (result.value) {
              this.dialogRef.close()
            }
          })
        }
      })
    }

    volver(){
      Swal.fire({
        title: '¿Está seguro de salir?',
        text: "Los datos ingresados no se guardaran",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.dialogRef.close()
        }
      })
    }


}
