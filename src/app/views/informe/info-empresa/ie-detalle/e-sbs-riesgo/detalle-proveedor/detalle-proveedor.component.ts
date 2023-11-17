import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Proveedor } from 'app/models/informes/proveedor';
import { ProveedorService } from 'app/services/informes/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent {
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
    public dialogRef: MatDialogRef<DetalleProveedorComponent>,
    private dialog : MatDialog,
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
        this.montoMaximoIng = prov.credMaximoIng
        this.plazos = prov.plazos
        this.plazosIng = prov.plazosIng
        this.cumplimiento = prov.cumplimiento
        this.clienteDesde = prov.clientesDesde
        this.clienteDesdeIng = prov.clientesDesdeIng
        this.articulos = prov.articulos
        this.articulosIng = prov.articulosIng
        this.comentario = prov.comentario
        this.comentarioAdicional = prov.comentarioAdicional
        this.comentarioAdicionalIng = prov.comentarioAdicionalIng
      }
    }

    agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
      const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        console.log(data)
        if (data) {
          switch(input){
            case 'montoMaximo':
              this.montoMaximo = data.comentario_es;
              this.montoMaximoIng = data.comentario_en;
            break
            case 'plazos':
              this.plazos = data.comentario_es;
              this.plazosIng = data.comentario_en;
            break
            case 'clienteDesde':
              this.clienteDesde = data.comentario_es;
              this.clienteDesdeIng = data.comentario_en;
            break
            case 'articulos':
              this.articulos = data.comentario_es;
              this.articulosIng = data.comentario_en;
            break
          }
        }
      });
    }
    agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
      const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'textarea',
        comentario_es : comentario_es,
        comentario_en : comentario_en,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          switch(input){
            case 'comentarioAdicional':
              this.comentarioAdicional = data.comentario_es;
              this.comentarioAdicionalIng = data.comentario_en;
            break
          }
        }
      });
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
        credMaximoIng : this.montoMaximoIng,
        plazos : this.plazos,
        plazosIng : this.plazosIng,
        cumplimiento : this.cumplimiento,
        clientesDesde : this.clienteDesde,
        clientesDesdeIng : this.clienteDesdeIng,
        articulos : this.articulos,
        articulosIng : this.articulosIng,
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
            credMaximoIng : this.montoMaximoIng,
            plazos : this.plazos,
            plazosIng : this.plazosIng,
            cumplimiento : this.cumplimiento,
            clientesDesde : this.clienteDesde,
            clientesDesdeIng : this.clienteDesdeIng,
            articulos : this.articulos,
            articulosIng : this.articulosIng,
            atendio : this.atendio,
            comentarioAdicional : this.comentarioAdicional,
            comentarioAdicionalIng : this.comentarioAdicionalIng,
            comentario : this.comentario,
          }
          this.proveedorService.UpdateProveedor(obj)
          console.log(obj)
          Swal.fire({
            title :'¡Actualizado!',
            text : 'El registro se edito correctamente.',
            icon : 'success',
            width: '20rem',
            heightAuto : true
          }).then(() => {
            this.dialogRef.close()
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
