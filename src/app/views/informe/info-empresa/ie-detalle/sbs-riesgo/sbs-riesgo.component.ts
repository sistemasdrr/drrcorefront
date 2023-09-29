import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from 'app/models/proveedor';
import { ProveedorService } from 'app/services/proveedor.service';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sbs-riesgo',
  templateUrl: './sbs-riesgo.component.html',
  styleUrls: ['./sbs-riesgo.component.scss']
})
export class SbsRiesgoComponent {
  dataSource: MatTableDataSource<Proveedor>;
  columnsToDisplay = ['id', 'proveedor', 'telefono', 'pais', 'credMaximo', 'plazos', 'cumplimiento', 'clienteDesde','articulos', 'referencista','accion'];

  constructor(
    private proveedorService : ProveedorService,
    private dialog : MatDialog
    ){
    this.dataSource = new MatTableDataSource(this.proveedorService.getAllProveedores())
  }

  //TABLA PROVEEDOR
  agregarProveedor() {
    const dialogR1 = this.dialog.open(DetalleProveedorComponent, {
    data: {
      accion : 'AGREGAR',
      id : 0
      },
    });
    dialogR1.afterClosed().subscribe((codAbonado) => {
      this.refresh()
    });
  }
  editarProveedor(id : number) {
    const dialogR2 = this.dialog.open(DetalleProveedorComponent, {
    data: {
      accion : 'EDITAR',
      id : id
    },
  });
  dialogR2.afterClosed().subscribe((codAbonado) => {
    this.refresh()
  });
  }
  eliminarProveedor(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
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
        this.proveedorService.DeleteProveedor(id)
        this.refresh()

        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        })
      }
    })
  }






  refresh(){
    this.dataSource = new MatTableDataSource(this.proveedorService.getAllProveedores())
    console.log(this.dataSource.data)
  }
}
