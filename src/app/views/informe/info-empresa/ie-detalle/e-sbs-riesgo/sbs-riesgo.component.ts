import { DeudaBancariaService } from '../../../../../services/informes/deuda-bancaria.service';
import { MorosidadComercialService } from '../../../../../services/informes/morosidad-comercial.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from 'app/models/informes/proveedor';
import { ProveedorService } from 'app/services/informes/proveedor.service';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MorosidadComercial } from 'app/models/informes/morosidad-comercial';
import { MorosidadComercialComponent } from './morosidad-comercial/morosidad-comercial.component';
import { DeudaBancaria } from 'app/models/informes/deuda-bancaria';
import { DeudaBancariaComponent } from './deuda-bancaria/deuda-bancaria.component';

@Component({
  selector: 'app-sbs-riesgo',
  templateUrl: './sbs-riesgo.component.html',
  styleUrls: ['./sbs-riesgo.component.scss']
})
export class SbsRiesgoComponent {
  dataSourceProveedor: MatTableDataSource<Proveedor>
  dataSourceMorosidadComercial: MatTableDataSource<MorosidadComercial>
  dataSourceDeudaBancaria: MatTableDataSource<DeudaBancaria>
  columnsToDisplayProveedor = ['id', 'proveedor', 'telefono', 'pais', 'credMaximo', 'plazos', 'cumplimiento', 'clientesDesde','articulos', 'atendio','accion'];
  columnsToDisplayMorosidadComercial = ['id', 'acreProv', 'tipoDocumento', 'fecha', 'montoMN', 'montoME', 'fechaPago', 'diasAtraso', 'accion'];
  columnsToDisplayDeudaBancaria = ['id', 'banco', 'calificacion', 'deudaMN', 'deudaME', 'memo', 'accion'];

  constructor(
    private proveedorService : ProveedorService,
    private morosidadComercialService : MorosidadComercialService,
    private deudaBancariaService : DeudaBancariaService,
    private dialog : MatDialog
    ){
    this.dataSourceProveedor = new MatTableDataSource(this.proveedorService.getAllProveedores())
    this.dataSourceMorosidadComercial = new MatTableDataSource(this.morosidadComercialService.GetAllMorosidadComercial())
    this.dataSourceDeudaBancaria = new MatTableDataSource(this.deudaBancariaService.getAllDeudaBancaria())
  }

  //TABLA PROVEEDOR
  agregarProveedor() {
    const dialogR1 = this.dialog.open(DetalleProveedorComponent, {
    data: {
      accion : 'AGREGAR',
      id : 0
      },
    });
    dialogR1.afterClosed().subscribe(() => {
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
  dialogR2.afterClosed().subscribe(() => {
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
    this.dataSourceProveedor = new MatTableDataSource(this.proveedorService.getAllProveedores())
    this.dataSourceMorosidadComercial = new MatTableDataSource(this.morosidadComercialService.GetAllMorosidadComercial())
    console.log(this.dataSourceProveedor.data)
  }

  //TABLA MOROSIDAD COMERCIAL
  agregarMorosidadComercial() {
    const dialogR1 = this.dialog.open(MorosidadComercialComponent, {
    data: {
      accion : 'AGREGAR',
      id : 0
      },
    });
    dialogR1.afterClosed().subscribe(() => {
      this.refresh()
    });
  }
  editarMorosidadComercial(id : number) {
    const dialogR2 = this.dialog.open(MorosidadComercialComponent, {
    data: {
      accion : 'EDITAR',
      id : id
    },
  });
  dialogR2.afterClosed().subscribe(() => {
    this.refresh()
    });
  }

  //TABLA SBS
  agregarDeudaBancaria() {
    const dialogR1 = this.dialog.open(DeudaBancariaComponent, {
    data: {
      accion : 'AGREGAR',
      id : 0
      },
    });
    dialogR1.afterClosed().subscribe(() => {
      this.refresh()
    });
  }
  editarDeudaBancaria(id : number) {
    const dialogR2 = this.dialog.open(DeudaBancariaComponent, {
    data: {
      accion : 'EDITAR',
      id : id
    },
  });
  dialogR2.afterClosed().subscribe(() => {
    this.refresh()
    });
  }
}
