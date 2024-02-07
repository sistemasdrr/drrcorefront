import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { ComboData } from 'app/models/combo';
import { Proveedor } from 'app/models/informes/empresa/sbs-riesgo';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent implements OnInit {
  titulo: string = ''
  accion: string = ''

  //DATOS DEL FORM
  id = 0
  idCompany = 0
  idPerson = 0
  name = ""
  idCountry = 0
  qualification = ""
  qualificationEng = ""
  date = ""
  dateD: Date | null = null
  telephone = ""
  attendedBy = ""
  idCurrency = 0
  maximumAmount = ""
  maximumAmountEng = ""
  timeLimit = ""
  timeLimitEng = ""
  compliance = ""
  complianceEng = ""
  clientSince = ""
  clientSinceEng = ""
  productsTheySell = ""
  productsTheySellEng = ""
  additionalCommentary = ""
  additionalCommentaryEng = ""
  referentCommentary = ""

  modelo: Proveedor[] = []

  msgPais = ""
  colorMsgPais = ""
  controlPaises = new FormControl<string | Pais>('')
  filterPais: Observable<Pais[]>
  paises: Pais[] = []
  monedas : ComboData[] = []
  paisSeleccionado: Pais = {
    id: 0,
    valor: '',
    bandera: ''
  }
  iconoSeleccionado = ""
  constructor(private comboService : ComboService, public dialogRef: MatDialogRef<DetalleProveedorComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private sbsService : SbsRiesgoService
  ) {

    this.filterPais = new Observable<Pais[]>()
    if (data.accion == "AGREGAR") {
      this.accion = data.accion
      this.titulo = "Agregar Proveedor"
      console.log(data)
      this.id = data.id
      this.idCompany = data.idCompany
    } else if (data.accion == "EDITAR") {
      this.accion = data.accion
      this.titulo = "Editar Proveedor"
      this.id = data.id
      this.idCompany = data.idCompany
    }
  }
  ngOnInit(): void {
    this.comboService.getPaises().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = response.data
        }
      }
    ).add(
      () => {
        this.comboService.getTipoMoneda().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.monedas = response.data
            }
          }
        ).add(
          () => {
            if(this.id !== 0){
              this.sbsService.getProviderById(this.id).subscribe(
                (response) => {
                  if(response.isSuccess === true && response.isWarning === false){
                    const proveedor = response.data
                    console.log(response)
                    if(proveedor){
                      this.name = proveedor.name
                      this.idCountry = proveedor.idCountry
                      this.qualification = proveedor.qualification
                      this.qualificationEng = proveedor.qualificationEng
                      this.telephone = proveedor.telephone
                      this.attendedBy = proveedor.attendedBy
                      this.idCurrency = proveedor.idCurrency
                      this.maximumAmount = proveedor.maximumAmount
                      this.maximumAmountEng = proveedor.maximumAmountEng
                      this.timeLimit = proveedor.timeLimit
                      this.timeLimitEng = proveedor.timeLimitEng
                      this.compliance = proveedor.compliance
                      this.complianceEng = proveedor.complianceEng
                      this.clientSince = proveedor.clientSince
                      this.clientSinceEng = proveedor.clientSinceEng
                      this.productsTheySell = proveedor.productsTheySell
                      this.productsTheySellEng = proveedor.productsTheySellEng
                      this.additionalCommentary = proveedor.additionalCommentary
                      this.additionalCommentaryEng = proveedor.additionalCommentaryEng
                      this.referentCommentary = proveedor.referentCommentary
                      if(proveedor.date !== null && proveedor.date !== ''){
                        const fecha = proveedor.date.split("/")
                        if(fecha.length > 0){
                          this.date = proveedor.date
                          this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                        }else{
                          this.date = ""
                          this.dateD = null
                        }
                      }
                    }
                  }
                }
              ).add(
                () => {
                  if(this.idCountry !== 0){
                    this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
                  }
                }
              )
            }
          }
        )
      }
    )
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  armarModelo() {
    this.modelo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idPerson : this.idPerson,
      name : this.name,
      idCountry : this.idCountry,
      qualification : this.qualification,
      date : this.date,
      telephone : this.telephone,
      attendedBy : this.attendedBy,
      idCurrency : this.idCurrency,
      maximumAmount : this.maximumAmount,
      maximumAmountEng : this.maximumAmountEng,
      timeLimit : this.timeLimit,
      timeLimitEng : this.timeLimitEng,
      compliance : this.compliance,
      complianceEng : this.complianceEng,
      clientSince : this.clientSince,
      clientSinceEng : this.clientSinceEng,
      productsTheySell : this.productsTheySell,
      productsTheySellEng : this.productsTheySellEng,
      additionalCommentary : this.additionalCommentary,
      additionalCommentaryEng : this.additionalCommentaryEng,
      referentCommentary : this.referentCommentary,
      qualificationEng : this.qualificationEng
    }
  }
  cambiarCumplimiento(cumplimiento : string){
    console.log(cumplimiento)
    if(cumplimiento === ''){
      this.complianceEng = ''
    }else if(cumplimiento === 'Lento Eventual'){
      this.complianceEng = 'Slow Eventual'
    }else if(cumplimiento === 'Lento Siempre'){
      this.complianceEng = 'Lento Siempre'
    }else if(cumplimiento === 'Moroso'){
      this.complianceEng = 'Defaulter'
    }else if(cumplimiento === 'Puntual'){
      this.complianceEng = 'Punctual'
    }else if(cumplimiento === 'Sin Experiencia'){
      this.complianceEng = 'Without experience'
    }
  }
  agregarTraduccion(titulo: string, subtitulo: string, comentario_es: string, comentario_en: string, input: string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      disableClose: true,
      data: {
        titulo: titulo,
        subtitulo: subtitulo,
        tipo: 'input',
        comentario_es: comentario_es,
        comentario_en: comentario_en,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data) {
        switch (input) {
          case 'montoMaximo':
            this.maximumAmount = data.comentario_es;
            this.maximumAmountEng = data.comentario_en;
            break
          case 'plazos':
            this.timeLimit = data.comentario_es;
            this.timeLimitEng = data.comentario_en;
            break
          case 'clienteDesde':
            this.clientSince = data.comentario_es;
            this.clientSinceEng = data.comentario_en;
            break
          case 'articulos':
            this.productsTheySell = data.comentario_es;
            this.productsTheySellEng = data.comentario_en;
            break
        }
      }
    });
  }
  agregarComentario(titulo: string, subtitulo: string, comentario_es: string, comentario_en: string, input: string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      disableClose: true,
      data: {
        titulo: titulo,
        subtitulo: subtitulo,
        tipo: 'textarea',
        comentario_es: comentario_es,
        comentario_en: comentario_en,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        switch (input) {
          case 'comentarioAdicional':
            this.additionalCommentary = data.comentario_es;
            this.additionalCommentaryEng = data.comentario_en;
            break
        }
      }
    });
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  cambioPais(pais: Pais) {
    if (pais !== null) {
      if (typeof pais === 'string' || pais === null || this.paisSeleccionado.id === 0) {
        this.msgPais = "Seleccione una opción."
        this.colorMsgPais = "red"
        this.iconoSeleccionado = ""
        this.idCountry = 0
      } else {
        this.msgPais = "Opción Seleccionada"
        this.colorMsgPais = "green"
        this.iconoSeleccionado = pais.bandera
        this.idCountry = pais.id
      }
    } else {
      this.idCountry = 0
      console.log(this.idCountry)
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
    }
  }
  guardar() {
    this.armarModelo()
    console.log(this.modelo[0])
    if(this.id === 0){
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          this.sbsService.addProvider(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se agregó correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.dialogRef.close()
                })
              }
            }
          )
        }
      })
    }else{
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          this.sbsService.addProvider(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se modificó correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.dialogRef.close()
                })
              }
            }
          )
        }
      })
    }
  }

  volver() {
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardaran",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto: true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }


}
