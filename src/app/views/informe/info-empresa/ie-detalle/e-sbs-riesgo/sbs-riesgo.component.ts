import { CompanySbs } from './../../../../../models/informes/empresa/sbs-riesgo';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MorosidadComercialComponent } from './morosidad-comercial/morosidad-comercial.component';
import { DeudaBancariaComponent } from './deuda-bancaria/deuda-bancaria.component';
import { Avales, DeudaBancariaT, MorosidadComercialT, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';
import { AvalesComponent } from './avales/avales.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

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
  aditionalCommentaryRiskCenterEng = ""
  debtRecordedDate = ""
  debtRecordedDateD : Date | null = null
  exchangeRate = 0
  bankingCommentary = ""
  bankingCommentaryEng = ""
  endorsementsObservations = ""
  endorsementsObservationsEng = ""
  referentOrAnalyst = ""
  date = ""
  dateD : Date | null = null
  litigationsCommentary = ""
  litigationsCommentaryEng = ""
  creditHistoryCommentary = ""
  creditHistoryCommentaryEng = ""
  guaranteesOfferedNc = 0
  guaranteesOfferedFc = 0

  totalesMN = 0
  totalesME = 0
  totalesMD = 0

  listaOpcionalCommentary : ComboData[] = []
  modeloNuevo : CompanySbs[] = []
  modeloModificado : CompanySbs[] = []

  dataSourceProveedor: MatTableDataSource<ProveedorT>
  dataSourceMorosidadComercial: MatTableDataSource<MorosidadComercialT>
  dataSourceDeudaBancaria: MatTableDataSource<DeudaBancariaT>
  dataSourceAvales: MatTableDataSource<Avales>
  columnsToDisplayProveedor = ['proveedor', 'telefono', 'pais', 'credMaximo', 'plazos', 'cumplimiento', 'clientesDesde','articulos', 'atendio','accion'];
  columnsToDisplayMorosidadComercial = ['acreProv', 'tipoDocumento', 'fecha', 'montoMN', 'montoME', 'fechaPago', 'diasAtraso', 'accion'];
  columnsToDisplayDeudaBancaria = ['banco', 'calificacion', 'fecha', 'deudaMN', 'deudaME', 'memo', 'accion'];
  columnsToDisplayAval = ['avalista', 'ruc', 'montoME', 'montoMN', 'fecha', 'entidad', 'accion'];

  constructor(private dialog : MatDialog,private sbsService : SbsRiesgoService, private activatedRoute : ActivatedRoute, private comboService : ComboService){
    this.dataSourceProveedor = new MatTableDataSource()
    this.dataSourceMorosidadComercial = new MatTableDataSource()
    this.dataSourceDeudaBancaria = new MatTableDataSource()
    this.dataSourceAvales = new MatTableDataSource()
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
    ).add(
      () => {
        if(this.idCompany !== 0){
          this.sbsService.getCompanySbsById(this.idCompany).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const companySbs = response.data
                console.log(response)
                if(companySbs){
                  this.id = companySbs.id
                  this.idOpcionalCommentarySbs = companySbs.idOpcionalCommentarySbs
                  this.aditionalCommentaryRiskCenter = companySbs.aditionalCommentaryRiskCenter
                  this.exchangeRate = companySbs.exchangeRate
                  this.bankingCommentary = companySbs.bankingCommentary
                  this.endorsementsObservations = companySbs.endorsementsObservations
                  this.referentOrAnalyst = companySbs.referentOrAnalyst
                  this.litigationsCommentary = companySbs.litigationsCommentary
                  this.creditHistoryCommentary = companySbs.creditHistoryCommentary
                  this.guaranteesOfferedNc = companySbs.guaranteesOfferedNc
                  this.guaranteesOfferedFc = companySbs.guaranteesOfferedFc
                  if(companySbs.date !== null && companySbs.date !== ''){
                    const fecha = companySbs.date.split("/")
                    if(fecha.length > 0){
                      this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.date = companySbs.date
                    }else{
                      this.dateD = null
                    }
                  }
                  if(companySbs.debtRecordedDate !== null && companySbs.debtRecordedDate !== ''){
                    const fecha = companySbs.debtRecordedDate.split("/")
                    if(fecha.length > 0){
                      this.debtRecordedDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.debtRecordedDate = companySbs.debtRecordedDate
                    }else{
                      this.debtRecordedDateD = null
                    }
                  }
                  if(companySbs.traductions.length >= 3){
                    if(companySbs.traductions[0].value !== null){
                      this.aditionalCommentaryRiskCenterEng = companySbs.traductions[0].value
                    }
                    if(companySbs.traductions[1].value !== null){
                      this.bankingCommentaryEng = companySbs.traductions[1].value
                    }
                    if(companySbs.traductions[2].value !== null){
                      this.endorsementsObservationsEng = companySbs.traductions[2].value
                    }
                    if(companySbs.traductions[3].value !== null){
                      this.litigationsCommentaryEng = companySbs.traductions[3].value
                    }
                    if(companySbs.traductions[4].value !== null){
                      this.creditHistoryCommentaryEng = companySbs.traductions[4].value
                    }
                  }
                }
              }
            }
          ).add(() => {
            this.armarModeloModificado()
          })
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
          this.sbsService.getEndorsementByIdCompany(this.idCompany).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.dataSourceAvales.data = response.data
              }
            }
          )
          this.sbsService.getBankDebtByIdCompany(this.idCompany).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.dataSourceDeudaBancaria.data = response.data
                this.totalesMN = 0
                this.totalesME = 0
                response.data.forEach(deudaBancaria => {
                  this.totalesMN += deudaBancaria.debtNc
                  this.totalesME += deudaBancaria.debtFc
                });
                if(this.exchangeRate !== 0 && this.exchangeRate !== null){
                  this.totalesMD = parseFloat((this.totalesMN / this.exchangeRate).toFixed(2))
                }

              }
            }
          )
        }
      }
    )
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idOpcionalCommentarySbs : this.idOpcionalCommentarySbs,
      aditionalCommentaryRiskCenter : this.aditionalCommentaryRiskCenter,
      debtRecordedDate : this.debtRecordedDate,
      exchangeRate : this.exchangeRate,
      bankingCommentary : this.bankingCommentary,
      endorsementsObservations : this.endorsementsObservations,
      referentOrAnalyst : this.referentOrAnalyst,
      date : this.date,
      litigationsCommentary : this.litigationsCommentary,
      creditHistoryCommentary : this.creditHistoryCommentary,
      guaranteesOfferedNc : this.guaranteesOfferedNc,
      guaranteesOfferedFc : this.guaranteesOfferedFc,
      traductions : [
        {
          key : 'L_S_COMENTARY',
          value : this.aditionalCommentaryRiskCenterEng
        },
        {
          key : 'L_S_BANCARIOS',
          value : this.bankingCommentaryEng
        },
        {
          key : 'L_S_AVALES',
          value : this.endorsementsObservationsEng
        },
        {
          key : 'L_S_LITIG',
          value : this.litigationsCommentaryEng
        },
        {
          key : 'L_S_CREDHIS',
          value : this.creditHistoryCommentaryEng
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idOpcionalCommentarySbs : this.idOpcionalCommentarySbs,
      aditionalCommentaryRiskCenter : this.aditionalCommentaryRiskCenter,
      debtRecordedDate : this.debtRecordedDate,
      exchangeRate : this.exchangeRate,
      bankingCommentary : this.bankingCommentary,
      endorsementsObservations : this.endorsementsObservations,
      referentOrAnalyst : this.referentOrAnalyst,
      date : this.date,
      litigationsCommentary : this.litigationsCommentary,
      creditHistoryCommentary : this.creditHistoryCommentary,
      guaranteesOfferedNc : this.guaranteesOfferedNc,
      guaranteesOfferedFc : this.guaranteesOfferedFc,
      traductions : [
        {
          key : 'L_S_COMENTARY',
          value : this.aditionalCommentaryRiskCenterEng
        },
        {
          key : 'L_S_BANCARIOS',
          value : this.bankingCommentaryEng
        },
        {
          key : 'L_S_AVALES',
          value : this.endorsementsObservationsEng
        },
        {
          key : 'L_S_LITIG',
          value : this.litigationsCommentaryEng
        },
        {
          key : 'L_S_CREDHIS',
          value : this.creditHistoryCommentaryEng
        },
      ]
    }
  }

  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'textarea',
        comentario_es : comentario_es,
        comentario_en : comentario_en
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'comentarioAdicional':
            this.aditionalCommentaryRiskCenter = data.comentario_es
            this.aditionalCommentaryRiskCenterEng = data.comentario_en
          break
          case 'comentarioBancario':
            this.bankingCommentary = data.comentario_es
            this.bankingCommentaryEng = data.comentario_en
          break
        }
      }
    });
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
  eliminarMorosidadComercial(id : number){
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
        this.sbsService.deleteLatePayment(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
              this.sbsService.getLatePaymentByIdCompany(this.idCompany).subscribe(
                (response) => {
                  if(response.isSuccess === true && response.isWarning === false){
                    this.dataSourceMorosidadComercial.data = response.data
                  }
                }
              )
            }
          }
        )
      }
    })
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
            this.totalesMN = 0
            this.totalesME = 0
            response.data.forEach(deudaBancaria => {
              this.totalesMN += deudaBancaria.debtNc
              this.totalesME += deudaBancaria.debtFc
            });
            if(this.exchangeRate !== 0 && this.exchangeRate !== null){
              this.totalesMD = parseFloat((this.totalesMN / this.exchangeRate).toFixed(2))
            }
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
            this.totalesMN = 0
            this.totalesME = 0
            response.data.forEach(deudaBancaria => {
              this.totalesMN += deudaBancaria.debtNc
              this.totalesME += deudaBancaria.debtFc
            });
            if(this.exchangeRate !== 0 && this.exchangeRate !== null){
              this.totalesMD = parseFloat((this.totalesMN / this.exchangeRate).toFixed(2))
            }
          }
        }
      )
    });
  }
  eliminarDeudaBancaria(id : number){
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
        this.sbsService.deleteBankDebt(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
              this.sbsService.getBankDebtByIdCompany(this.idCompany).subscribe(
                (response) => {
                  if(response.isSuccess === true && response.isWarning === false){
                    this.dataSourceDeudaBancaria.data = response.data
                    this.totalesMN = 0
                    this.totalesME = 0
                    response.data.forEach(deudaBancaria => {
                      this.totalesMN += deudaBancaria.debtNc
                      this.totalesME += deudaBancaria.debtFc
                    });
                    if(this.exchangeRate !== 0 && this.exchangeRate !== null){
                      this.totalesMD = parseFloat((this.totalesMN / this.exchangeRate).toFixed(2))
                    }
                  }
                }
              )
            }
          }
        )
      }
    })
  }
  //AVALES
  agregarAval() {
    const dialogR1 = this.dialog.open(AvalesComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idCompany : this.idCompany
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.sbsService.getEndorsementByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceAvales.data = response.data
          }
        }
      )
    });
  }
  editarAval(id : number) {
    const dialogR2 = this.dialog.open(AvalesComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.sbsService.getEndorsementByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceAvales.data = response.data
          }
        }
      )
    });
  }
  eliminarAval(id : number){
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
        this.sbsService.deleteEndorsement(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
              this.sbsService.getEndorsementByIdCompany(this.idCompany).subscribe(
                (response) => {
                  if(response.isSuccess === true && response.isWarning === false){
                    this.dataSourceAvales.data = response.data
                  }
                }
              )
            }
          }
        )
      }
    })
  }

  tasaCambio(){
    if(this.exchangeRate !== 0 && this.exchangeRate !== null){
      this.totalesMD = parseFloat((this.totalesMN / this.exchangeRate).toFixed(2))
    }
  }

  selectFecha1(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  selectFecha2(event: MatDatepickerInputEvent<Date>) {
    this.debtRecordedDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.debtRecordedDate = this.formatDate(selectedDate);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  guardar(){
    if(this.id === 0){
      this.armarModeloNuevo()
      console.log(this.modeloNuevo[0])
      Swal.fire({
        title: '¿Está seguro de guardar este registro?',
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
          this.sbsService.addCompanySbs(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          )
        }
      });
    }else{
      this.armarModeloModificado()
      console.log(this.modeloModificado[0])
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
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
          this.sbsService.addCompanySbs(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          )
        }
      });
    }

  }
}
