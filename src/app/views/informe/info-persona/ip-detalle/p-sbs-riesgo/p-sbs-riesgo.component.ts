import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeudaBancaria } from 'app/models/informes/deuda-bancaria';
import { MorosidadComercial } from 'app/models/informes/morosidad-comercial';
import { Proveedor } from 'app/models/informes/proveedor';
import { DeudaBancariaService } from 'app/services/informes/deuda-bancaria.service';
import { MorosidadComercialService } from 'app/services/informes/morosidad-comercial.service';
import { ProveedorService } from 'app/services/informes/proveedor.service';
import { PDeudaBancariaComponent } from './p-deuda-bancaria/p-deuda-bancaria.component';
import { PMorosidadComercialComponent } from './p-morosidad-comercial/p-morosidad-comercial.component';
import { PDetalleProveedorComponent } from './p-detalle-proveedor/p-detalle-proveedor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-sbs-riesgo',
  templateUrl: './p-sbs-riesgo.component.html',
  styleUrls: ['./p-sbs-riesgo.component.scss']
})
export class PSbsRiesgoComponent {

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
    const dialogR1 = this.dialog.open(PDetalleProveedorComponent, {
      disableClose: true,
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
    const dialogR2 = this.dialog.open(PDetalleProveedorComponent, {
      disableClose: true,
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
    const dialogR1 = this.dialog.open(PMorosidadComercialComponent, {
      disableClose: true,
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
    const dialogR2 = this.dialog.open(PMorosidadComercialComponent, {
      disableClose: true,
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
    const dialogR1 = this.dialog.open(PDeudaBancariaComponent, {
      disableClose: true,
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
    const dialogR2 = this.dialog.open(PDeudaBancariaComponent, {
      disableClose: true,
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
