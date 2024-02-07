import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { ComboData } from 'app/models/combo';
import { DeudaBancariaT, MorosidadComercialT, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { PersonSBS } from 'app/models/informes/persona/sbs-riesgo';
import { ComboService } from 'app/services/combo.service';
import { PersonSbsService } from 'app/services/informes/persona/person-sbs.service';
import Swal from 'sweetalert2';
import { PMorosidadComercialComponent } from './p-morosidad-comercial/p-morosidad-comercial.component';
import { PDetalleProveedorComponent } from './p-detalle-proveedor/p-detalle-proveedor.component';
import { PDeudaBancariaComponent } from './p-deuda-bancaria/p-deuda-bancaria.component';

@Component({
  selector: 'app-p-sbs-riesgo',
  templateUrl: './p-sbs-riesgo.component.html',
  styleUrls: ['./p-sbs-riesgo.component.scss']
})
export class PSbsRiesgoComponent implements OnInit{
  id = 0
  idPerson = 0
  aditionalCommentaryRiskCenter = ""
  aditionalCommentaryRiskCenterEng = ""
  debtRecordedDate = ""
  debtRecordedDateD : Date | null = null
  exchangeRate = 0
  bankingCommentary = ""
  bankingCommentaryEng = ""
  referentOrAnalyst = ""
  date = ""
  dateD : Date | null = null
  litigationsCommentary = ""
  litigationsCommentaryEng = ""
  creditHistoryCommentary = ""
  creditHistoryCommentaryEng = ""
  sbsCommentary = ""
  sbsCommentaryEng = ""
  guaranteesOfferedNc = 0
  guaranteesOfferedFc = 0

  totalesMN = 0
  totalesME = 0
  totalesMD = 0

  listaOpcionalCommentary : ComboData[] = []
  modeloNuevo : PersonSBS[] = []
  modeloModificado : PersonSBS[] = []

  dataSourceProveedor: MatTableDataSource<ProveedorT>
  dataSourceMorosidadComercial: MatTableDataSource<MorosidadComercialT>
  dataSourceDeudaBancaria: MatTableDataSource<DeudaBancariaT>
  columnsToDisplayProveedor = ['proveedor', 'telefono', 'pais', 'credMaximo', 'plazos', 'cumplimiento', 'clientesDesde','articulos', 'atendio','accion'];
  columnsToDisplayMorosidadComercial = ['acreProv', 'tipoDocumento', 'fecha', 'montoMN', 'montoME', 'fechaPago', 'diasAtraso', 'accion'];
  columnsToDisplayDeudaBancaria = ['banco', 'calificacion', 'fecha', 'deudaMN', 'deudaME', 'memo', 'accion'];

  constructor(private dialog : MatDialog, private personSbsService : PersonSbsService, private activatedRoute : ActivatedRoute, private comboService : ComboService){
    this.dataSourceProveedor = new MatTableDataSource()
    this.dataSourceMorosidadComercial = new MatTableDataSource()
    this.dataSourceDeudaBancaria = new MatTableDataSource()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
    if(loader){
      loader.classList.remove('hide-loader');
    }
    this.comboService.getComentarioOpcionalSbs().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaOpcionalCommentary = response.data
        }
      }
    ).add(
      () => {
        if(this.idPerson !== 0){
          this.personSbsService.getPersonSBS(this.idPerson).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const personSbs = response.data
                console.log(response)
                if(personSbs){
                  this.id = personSbs.id
                  this.aditionalCommentaryRiskCenter = personSbs.aditionalCommentaryRiskCenter
                  this.exchangeRate = personSbs.exchangeRate
                  this.bankingCommentary = personSbs.bankingCommentary
                  this.referentOrAnalyst = personSbs.referentOrAnalyst
                  this.litigationsCommentary = personSbs.litigationsCommentary
                  this.creditHistoryCommentary = personSbs.creditHistoryCommentary
                  this.sbsCommentary = personSbs.sbsCommentary
                  this.guaranteesOfferedNc = personSbs.guaranteesOfferedNc
                  this.guaranteesOfferedFc = personSbs.guaranteesOfferedFc
                  if(personSbs.date !== null && personSbs.date !== ''){
                    const fecha = personSbs.date.split("/")
                    if(fecha.length > 0){
                      this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.date = personSbs.date
                    }else{
                      this.dateD = null
                    }
                  }
                  if(personSbs.debtRecordedDate !== null && personSbs.debtRecordedDate !== ''){
                    const fecha = personSbs.debtRecordedDate.split("/")
                    if(fecha.length > 0){
                      this.debtRecordedDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.debtRecordedDate = personSbs.debtRecordedDate
                    }else{
                      this.debtRecordedDateD = null
                    }
                  }
                  if(personSbs.traductions.length >= 3){
                    if(personSbs.traductions[0].value !== null){
                      this.creditHistoryCommentaryEng = personSbs.traductions[0].value
                    }
                    if(personSbs.traductions[1].value !== null){
                      this.aditionalCommentaryRiskCenterEng = personSbs.traductions[1].value
                    }
                    if(personSbs.traductions[2].value !== null){
                      this.bankingCommentaryEng = personSbs.traductions[2].value
                    }
                    if(personSbs.traductions[3].value !== null){
                      this.litigationsCommentaryEng = personSbs.traductions[3].value
                    }
                    if(personSbs.traductions[4].value !== null){
                      this.sbsCommentaryEng = personSbs.traductions[4].value
                    }
                  }
                }
              }
            }
          ).add(() => {
            this.armarModeloModificado()
            if(loader){
              loader.classList.add('hide-loader');
            }
          })
          this.personSbsService.getProviderByIdPerson(this.idPerson).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.dataSourceProveedor.data = response.data
              }
            }
          )
          this.personSbsService.getLatePaymentByIdPerson(this.idPerson).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                this.dataSourceMorosidadComercial.data = response.data
              }
            }
          )
          this.personSbsService.getBankDebtByIdPerson(this.idPerson).subscribe(
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
      idPerson : this.idPerson,
      aditionalCommentaryRiskCenter : this.aditionalCommentaryRiskCenter,
      debtRecordedDate : this.debtRecordedDate,
      exchangeRate : this.exchangeRate,
      bankingCommentary : this.bankingCommentary,
      referentOrAnalyst : this.referentOrAnalyst,
      date : this.date,
      litigationsCommentary : this.litigationsCommentary,
      creditHistoryCommentary : this.creditHistoryCommentary,
      sbsCommentary : this.sbsCommentary,
      guaranteesOfferedNc : this.guaranteesOfferedNc,
      guaranteesOfferedFc : this.guaranteesOfferedFc,
      traductions : [
        {
          key : 'L_SBS_ANTEC',
          value : this.creditHistoryCommentaryEng
        },
        {
          key : 'L_SBS_RISKCNT',
          value : this.aditionalCommentaryRiskCenterEng
        },
        {
          key : 'L_SBS_COMMENTBANK',
          value : this.bankingCommentaryEng
        },
        {
          key : 'L_SBS_LITIG',
          value : this.litigationsCommentaryEng
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      aditionalCommentaryRiskCenter : this.aditionalCommentaryRiskCenter,
      debtRecordedDate : this.debtRecordedDate,
      exchangeRate : this.exchangeRate,
      bankingCommentary : this.bankingCommentary,
      referentOrAnalyst : this.referentOrAnalyst,
      date : this.date,
      litigationsCommentary : this.litigationsCommentary,
      creditHistoryCommentary : this.creditHistoryCommentary,
      sbsCommentary : this.sbsCommentary,
      guaranteesOfferedNc : this.guaranteesOfferedNc,
      guaranteesOfferedFc : this.guaranteesOfferedFc,
      traductions : [
        {
          key : 'L_SBS_ANTEC',
          value : this.creditHistoryCommentaryEng
        },
        {
          key : 'L_SBS_RISKCNT',
          value : this.aditionalCommentaryRiskCenterEng
        },
        {
          key : 'L_SBS_COMMENTBANK',
          value : this.bankingCommentaryEng
        },
        {
          key : 'L_SBS_LITIG',
          value : this.litigationsCommentaryEng
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
    const dialogR1 = this.dialog.open(PDetalleProveedorComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idPerson : this.idPerson
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.personSbsService.getProviderByIdPerson(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceProveedor.data = response.data
          }
        }
      )
    });
  }
  editarProveedor(id : number) {
    const dialogR2 = this.dialog.open(PDetalleProveedorComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idPerson : this.idPerson
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.personSbsService.getProviderByIdPerson(this.idPerson).subscribe(
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
        this.personSbsService.deleteProvider(id).subscribe(
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
    const dialogR1 = this.dialog.open(PMorosidadComercialComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idPerson : this.idPerson
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.personSbsService.getLatePaymentByIdPerson(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceMorosidadComercial.data = response.data
          }
        }
      )
    });
  }
  editarMorosidadComercial(id : number) {
    const dialogR2 = this.dialog.open(PMorosidadComercialComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idPerson : this.idPerson
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.personSbsService.getLatePaymentByIdPerson(this.idPerson).subscribe(
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
        this.personSbsService.deleteLatePayment(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
              this.personSbsService.getLatePaymentByIdPerson(this.idPerson).subscribe(
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
    const dialogR1 = this.dialog.open(PDeudaBancariaComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0,
        idPerson : this.idPerson
        },
      });
    dialogR1.afterClosed().subscribe(() => {
      this.personSbsService.getBankDebtByIdPerson(this.idPerson).subscribe(
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
    const dialogR2 = this.dialog.open(PDeudaBancariaComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idPerson : this.idPerson
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.personSbsService.getBankDebtByIdPerson(this.idPerson).subscribe(
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
        this.personSbsService.deleteBankDebt(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
              this.personSbsService.getBankDebtByIdPerson(this.idPerson).subscribe(
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.personSbsService.addPersonSBS(this.modeloNuevo[0]).subscribe(
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
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.personSbsService.addPersonSBS(this.modeloModificado[0]).subscribe(
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
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }

  }
}
