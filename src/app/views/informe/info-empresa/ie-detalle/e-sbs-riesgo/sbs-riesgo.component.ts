import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MorosidadComercialComponent } from './morosidad-comercial/morosidad-comercial.component';
import { DeudaBancariaComponent } from './deuda-bancaria/deuda-bancaria.component';
import { DeudaBancariaT, MorosidadComercialT, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';

@Component({
  selector: 'app-sbs-riesgo',
  templateUrl: './sbs-riesgo.component.html',
  styleUrls: ['./sbs-riesgo.component.scss']
})
export class SbsRiesgoComponent implements OnInit{

  id = 0
  idCompany = 0
  idOpcionalCommentarySbs = 0
  aditionalCommentaryRiskCenter = ""
  debtRecordedDate = ""
  exchangeRate = 0
  bankingCommentary = ""
  endorsementsObservations = ""
  referentOrAnalyst = ""
  date = ""
  dateD : Date | null = null
  litigationsCommentary = ""
  creditHistoryCommentary = ""

  listaOpcionalCommentary : ComboData[] = []

  dataSourceProveedor: MatTableDataSource<ProveedorT>
  dataSourceMorosidadComercial: MatTableDataSource<MorosidadComercialT>
  dataSourceDeudaBancaria: MatTableDataSource<DeudaBancariaT>
  columnsToDisplayProveedor = ['proveedor', 'telefono', 'pais', 'credMaximo', 'plazos', 'cumplimiento', 'clientesDesde','articulos', 'atendio','accion'];
  columnsToDisplayMorosidadComercial = ['acreProv', 'tipoDocumento', 'fecha', 'montoMN', 'montoME', 'fechaPago', 'diasAtraso', 'accion'];
  columnsToDisplayDeudaBancaria = ['banco', 'calificacion', 'fecha', 'deudaMN', 'deudaME', 'memo', 'accion'];

  constructor(private dialog : MatDialog,private sbsService : SbsRiesgoService, private activatedRoute : ActivatedRoute, private comboService : ComboService){
    this.dataSourceProveedor = new MatTableDataSource()
    this.dataSourceMorosidadComercial = new MatTableDataSource()
    this.dataSourceDeudaBancaria = new MatTableDataSource()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    this.comboService.getComentarioOpcionalSbs().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaOpcionalCommentary = response.data
        }
      }
    )
    this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourceProveedor.data = response.data
        }
      }
    )
    this.sbsService.getLatePaymentByIdCompany(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourceMorosidadComercial.data = response.data
        }
      }
    )
    this.sbsService.getBankDebtByIdCompany(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourceDeudaBancaria.data = response.data
        }
      }
    )
  }

  //TABLA PROVEEDOR
  agregarProveedor() {
    const dialogR1 = this.dialog.open(DetalleProveedorComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idCompany : this.idCompany
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceProveedor.data = response.data
          }
        }
      )
    });
  }
  editarProveedor(id : number) {
    const dialogR2 = this.dialog.open(DetalleProveedorComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceProveedor.data = response.data
          }
        }
      )
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
        this.sbsService.deleteProvider(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
            }
          }
        )
      }
    })
  }

  //TABLA MOROSIDAD COMERCIAL
  agregarMorosidadComercial() {
    const dialogR1 = this.dialog.open(MorosidadComercialComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idCompany : this.idCompany
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.sbsService.getLatePaymentByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceMorosidadComercial.data = response.data
          }
        }
      )
    });
  }
  editarMorosidadComercial(id : number) {
    const dialogR2 = this.dialog.open(MorosidadComercialComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.sbsService.getLatePaymentByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceMorosidadComercial.data = response.data
          }
        }
      )
    });
  }

  //TABLA SBS
  agregarDeudaBancaria() {
    const dialogR1 = this.dialog.open(DeudaBancariaComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idCompany : this.idCompany
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.sbsService.getBankDebtByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceDeudaBancaria.data = response.data
          }
        }
      )
    });
  }
  editarDeudaBancaria(id : number) {
    const dialogR2 = this.dialog.open(DeudaBancariaComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.sbsService.getBankDebtByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceDeudaBancaria.data = response.data
          }
        }
      )
    });
  }
}
