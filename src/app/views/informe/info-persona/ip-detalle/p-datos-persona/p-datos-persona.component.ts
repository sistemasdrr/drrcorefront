import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/combo';
import { Observable, map, startWith } from 'rxjs';
import { HistoricoPedidosComponent } from 'app/views/informe/info-empresa/ie-detalle/e-datos-empresa/historico-pedidos/historico-pedidos.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ComboData, PoliticaPagos, Reputacion, RiesgoCrediticio } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'app/models/informes/persona/datos-generales';
import Swal from 'sweetalert2';
import { SeleccionarCalidadComponent } from 'app/views/informe/info-empresa/ie-detalle/e-datos-empresa/seleccionar-calidad/seleccionar-calidad.component';

@Component({
  selector: 'app-p-datos-persona',
  templateUrl: './p-datos-persona.component.html',
  styleUrls: ['./p-datos-persona.component.scss']
})
export class PDatosPersonaComponent implements OnInit{

  //LISTAS

  reputaciones: Reputacion[] = []
  situacionPersona : ComboData[] = []
  tipoDocumento : ComboData[] = []
  estadoCivil : ComboData[] = []
  profesion : ComboData[] = []

  controlSituacionRUC = new FormControl<string | ComboData>('');
  filterSituacionRuc: Observable<ComboData[]>
  situacionRuc: ComboData[] = []

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>

  politicaPagos: PoliticaPagos[] = []
  calificacionCrediticia: RiesgoCrediticio[] = []

  personeriaJuridicaInforme: ComboData = {
    id: 0,
    valor: ''
  }
  situacionRucInforme: ComboData = {
    id: 0,
    valor: ''
  }
  paisSeleccionado: Pais = {
    id: 0,
    valor: '',
    bandera: ''
  }

  //DATOS DE LA PERSONA

  id = 0
  oldCode = ""
  fullname = ""
  lastSearched = ""
  lastSearchedD : Date | null = null
  language = ""
  nationality = ""
  nationalityEng = ""
  birthDate = ""
  birthDateD : Date | null = null
  birthPlace = ""
  birthPlaceEng = ""
  idDocumentType = 0
  codeDocumentType = ""
  taxTypeName = ""
  taxTypeCode = ""
  idLegalRegisterSituation = 0
  address = ""
  cp = ""
  city = ""
  otherDirecctions = ""
  tradeName = ""
  idCountry = 0
  codePhone = ""
  numberPhone = ""
  idCivilStatus = 0
  relationshipWith = ""
  relationshipWithEng = ""
  relationshipDocumentType = 0
  relationshipCodeDocument = ""
  fatherName = ""
  motherName = ""
  email = ""
  cellphone = ""
  profession = ""
  professionEng = ""
  clubMember = ""
  insurance = ""
  newsCommentary = ""
  newsCommentaryEng = ""
  printNewsCommentary = true
  privateCommentary = ""
  reputationCommentary = ""
  reputationCommentaryEng = ""
  idCreditRisk = 0
  riesgoCrediticioSeleccionado: RiesgoCrediticio = {
    id: 0,
    abreviation: '',
    color: '',
    identifier: '',
    rate: 0,
    valor: ''
  }
  idPaymentPolicy = 0
  politicaPagoSeleccionada: PoliticaPagos = {
    id: 0,
    color: '',
    valor: ''
  }
  idReputation = 0
  reputacionSeleccionada: Reputacion = {
    id: 0,
    color: '',
    valor: ''
  }
  idPersonSituation = 0
  quality = ""

  //MSG

  colorMsgPersonaJuridica = ""
  msgPais = ""
  colorMsgPais = ""
  msgSituacionRuc = ""
  colorMsgSituacionRuc = ""

  //MODELOS
  modeloNuevo : Persona[] = []
  modeloModificado : Persona[] = []

constructor(private dialog : MatDialog, private comboService : ComboService,
  private personaService : DatosGeneralesService,private activatedRoute: ActivatedRoute, private router : Router) {
  this.filterSituacionRuc = new Observable<ComboData[]>()
  this.filterPais = new Observable<Pais[]>()

  const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
    console.log(this.id)
}
  ngOnInit() {
    this.comboService.getPaises().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = response.data
        }
      }
    ).add(
      () => {
        this.comboService.getSituacionPersona().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.situacionPersona = response.data
            }
          }
        )
        this.comboService.getSituacionRUC().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.situacionRuc = response.data
            }
          }
        )
        this.comboService.getTipoDocumento().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.tipoDocumento = response.data
            }
          }
        )
        this.comboService.getEstadoCivil().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.estadoCivil = response.data
            }
          }
        )
        this.comboService.getProfesion().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.profesion = response.data
            }
          }
        )
        this.comboService.getRiesgoCrediticio().subscribe((response) => {
          if (response.isSuccess === true) {
            this.calificacionCrediticia = response.data
          }
        })
        this.comboService.getPoliticaPagos().subscribe((response) => {
          if (response.isSuccess === true) {
            this.politicaPagos = response.data
          }
        })
        this.comboService.getReputacion().subscribe((response) => {
          if (response.isSuccess === true) {
            this.reputaciones = response.data
          }
        })
        if(this.id > 0){
          this.personaService.getPersonaById(this.id).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const persona = response.data
                console.log(response.data)
                if(persona){
                  this.oldCode = persona.oldCode
                  this.fullname = persona.fullname
                  this.language = persona.language
                  this.nationality = persona.nationality
                  this.birthDate = persona.birthDate
                  this.birthPlace = persona.birthPlace
                  if(persona.idDocumentType !== null && persona.idDocumentType !== 0){
                    this.idDocumentType = persona.idDocumentType
                  }
                  this.codeDocumentType = persona.codeDocumentType
                  this.taxTypeName = persona.taxTypeName
                  this.taxTypeCode = persona.taxTypeCode
                  if(persona.idLegalRegisterSituation !== null && persona.idLegalRegisterSituation !== 0){
                    this.idLegalRegisterSituation = persona.idLegalRegisterSituation
                  }
                  this.address = persona.address
                  this.cp = persona.cp
                  this.city = persona.city
                  this.otherDirecctions = persona.otherDirecctions
                  this.tradeName = persona.tradeName
                  if(persona.idCountry !== null && persona.idCountry !== 0){
                    this.idCountry = persona.idCountry
                  }
                  this.codePhone = persona.codePhone
                  this.numberPhone = persona.numberPhone
                  if(persona.idCivilStatus !== null && persona.idCivilStatus !== 0){
                    this.idCivilStatus = persona.idCivilStatus
                  }
                  this.relationshipWith = persona.relationshipWith
                  this.relationshipDocumentType = persona.relationshipDocumentType
                  this.relationshipCodeDocument = persona.relationshipCodeDocument
                  this.fatherName = persona.fatherName
                  this.motherName = persona.motherName
                  this.email = persona.email
                  this.cellphone = persona.cellphone
                  this.profession = persona.profession
                  this.clubMember = persona.clubMember
                  this.insurance = persona.insurance
                  this.newsCommentary = persona.newsCommentary
                  this.printNewsCommentary = persona.printNewsCommentary
                  this.privateCommentary = persona.privateCommentary
                  this.reputationCommentary = persona.reputationCommentary
                  if(persona.idCreditRisk !== null && persona.idCreditRisk !== 0){
                    this.idCreditRisk = persona.idCreditRisk
                  }
                  if(persona.idPaymentPolicy !== null && persona.idPaymentPolicy !== 0){
                    this.idPaymentPolicy = persona.idPaymentPolicy
                  }
                  if(persona.idReputation !== null && persona.idReputation !== 0){
                    this.idReputation = persona.idReputation
                  }
                  if(persona.idPersonSituation !== null && persona.idPersonSituation !== 0){
                    this.idPersonSituation = persona.idPersonSituation
                  }
                  this.quality = persona.quality
                  if(persona.traductions !== null && persona.traductions.length > 0){
                    this.nationalityEng = persona.traductions[0].value
                    this.birthPlaceEng = persona.traductions[1].value
                    this.relationshipWithEng = persona.traductions[2].value
                    this.professionEng = persona.traductions[3].value
                    this.newsCommentaryEng = persona.traductions[4].value
                    this.reputationCommentaryEng = persona.traductions[5].value
                  }
                  if(persona.lastSearched !== null && persona.lastSearched !== ""){

                    this.lastSearched = persona.lastSearched
                    const fecha = persona.lastSearched.split("/")
                    if(fecha.length > 0){
                      this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                    }
                    console.log(this.lastSearchedD)
                  }
                  if(persona.birthDate !== null && persona.birthDate !== ""){
                    this.birthDate = persona.birthDate
                    const fecha = persona.birthDate.split("/")
                    if(fecha.length > 0){
                      this.birthDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                    }
                  }
                }
              }
            }
          ).add(
            () => {
              if(this.idLegalRegisterSituation !== 0){
                this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
              }
              if(this.idCountry !== 0 && this.idCountry !== null){
                this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
              }
              if(this.idCreditRisk !== 0 && this.idCreditRisk !== null){
                this.riesgoCrediticioSeleccionado = this.calificacionCrediticia.filter(x => x.id === this.idCreditRisk)[0]
                this.gaugeRiesgoCrediticio = this.riesgoCrediticioSeleccionado.rate
                this.descripcionRiesgoCrediticio = this.riesgoCrediticioSeleccionado.abreviation
                this.colorRiesgoCrediticio = this.riesgoCrediticioSeleccionado.color
                this.calificacionRiesgoCrediticio = this.riesgoCrediticioSeleccionado.identifier
              }
              if(this.idPaymentPolicy !== 0 && this.idPaymentPolicy !== null){
                this.politicaPagoSeleccionada = this.politicaPagos.filter(x => x.id === this.idPaymentPolicy)[0]
                this.colorPoliticaPagos = this.politicaPagoSeleccionada.color
              }
              if(this.idReputation !== 0 && this.idReputation !== null){
                this.reputacionSeleccionada = this.reputaciones.filter(x => x.id === this.idReputation)[0]
                this.colorReputacion = this.reputacionSeleccionada.color
              }
            }
          )
        }
      }
    )

    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }

  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      oldCode : this.oldCode,
      fullname : this.fullname,
      lastSearched : this.lastSearched,
      language : this.language,
      nationality : this.nationality,
      birthDate : this.birthDate,
      birthPlace : this.birthPlace,
      idDocumentType : this.idDocumentType,
      codeDocumentType : this.codeDocumentType,
      taxTypeName : this.taxTypeName,
      taxTypeCode : this.taxTypeCode,
      idLegalRegisterSituation : this.idLegalRegisterSituation,
      address : this.address,
      cp : this.cp,
      city : this.city,
      otherDirecctions : this.otherDirecctions,
      tradeName : this.tradeName,
      idCountry : this.idCountry,
      codePhone : this.codePhone,
      numberPhone : this.numberPhone,
      idCivilStatus : this.idCivilStatus,
      relationshipWith : this.relationshipWith,
      relationshipDocumentType : this.relationshipDocumentType,
      relationshipCodeDocument : this.relationshipCodeDocument,
      fatherName : this.fatherName,
      motherName : this.motherName,
      email : this.email,
      cellphone : this.cellphone,
      profession : this.profession,
      clubMember : this.clubMember,
      insurance : this.insurance,
      newsCommentary : this.newsCommentary,
      printNewsCommentary : this.printNewsCommentary,
      privateCommentary : this.privateCommentary,
      reputationCommentary : this.reputationCommentary,
      idCreditRisk : this.idCreditRisk,
      idPaymentPolicy : this.idPaymentPolicy,
      idReputation : this.idReputation,
      idPersonSituation : this.idPersonSituation,
      quality : this.quality,
      traductions : [
        {
          key : "S_P_NACIONALITY",
          value : this.nationalityEng
        },
        {
          key : "S_P_BIRTHDATE",
          value : this.birthPlaceEng
        },
        {
          key : "S_P_MARRIEDTO",
          value : this.relationshipWithEng
        },
        {
          key : "S_P_PROFESSION",
          value : this.professionEng
        },
        {
          key : "L_P_NEWSCOMM",
          value : this.newsCommentaryEng
        },
        {
          key : "L_P_REPUTATION",
          value : this.reputationCommentaryEng
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      oldCode : this.oldCode,
      fullname : this.fullname,
      lastSearched : this.lastSearched,
      language : this.language,
      nationality : this.nationality,
      birthDate : this.birthDate,
      birthPlace : this.birthPlace,
      idDocumentType : this.idDocumentType,
      codeDocumentType : this.codeDocumentType,
      taxTypeName : this.taxTypeName,
      taxTypeCode : this.taxTypeCode,
      idLegalRegisterSituation : this.idLegalRegisterSituation,
      address : this.address,
      cp : this.cp,
      city : this.city,
      otherDirecctions : this.otherDirecctions,
      tradeName : this.tradeName,
      idCountry : this.idCountry,
      codePhone : this.codePhone,
      numberPhone : this.numberPhone,
      idCivilStatus : this.idCivilStatus,
      relationshipWith : this.relationshipWith,
      relationshipDocumentType : this.relationshipDocumentType,
      relationshipCodeDocument : this.relationshipCodeDocument,
      fatherName : this.fatherName,
      motherName : this.motherName,
      email : this.email,
      cellphone : this.cellphone,
      profession : this.profession,
      clubMember : this.clubMember,
      insurance : this.insurance,
      newsCommentary : this.newsCommentary,
      printNewsCommentary : this.printNewsCommentary,
      privateCommentary : this.privateCommentary,
      reputationCommentary : this.reputationCommentary,
      idCreditRisk : this.idCreditRisk,
      idPaymentPolicy : this.idPaymentPolicy,
      idReputation : this.idReputation,
      idPersonSituation : this.idPersonSituation,
      quality : this.quality,
      traductions : [
        {
          key : "S_P_NACIONALITY",
          value : this.nationalityEng
        },
        {
          key : "S_P_BIRTHDATE",
          value : this.birthPlaceEng
        },
        {
          key : "S_P_MARRIEDTO",
          value : this.relationshipWithEng
        },
        {
          key : "S_P_PROFESSION",
          value : this.professionEng
        },
        {
          key : "L_P_NEWSCOMM",
          value : this.newsCommentaryEng
        },
        {
          key : "L_P_REPUTATION",
          value : this.reputationCommentaryEng
        },
      ]
    }
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filterSituacionRuc(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.valor.toLowerCase().includes(filterValue));
  }

  displaySituacionRuc(situacionRuc : ComboData): string {
    return situacionRuc && situacionRuc.valor ? situacionRuc.valor : '';
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.lastSearched = this.formatDate(selectedDate);
    }
  }
  selectFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.birthDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  historicoPedidos(){
    const dialog = this.dialog.open(HistoricoPedidosComponent,{
      data : {
        titulo : "Histórico de Pedidos"
      }
    })
  }

  //TITULOS

  tituloComentarioIdentificacion : string = 'Comentario de Identificación'
  tituloComentarioReputacion : string = 'Comentario de Reputación'
  tituloComentarioPrensa : string = 'Comentario de Prensa'

  selectRiesgoCrediticio(event: MatSelectChange) {
    this.riesgoCrediticioSeleccionado = event.value;
    this.idCreditRisk = event.value.id;

    this.gaugeRiesgoCrediticio = event.value.rate;
    this.descripcionRiesgoCrediticio = event.value.abreviation;
    this.colorRiesgoCrediticio = event.value.color;
    this.calificacionRiesgoCrediticio = event.value.identifier;
  }
  selectPoliticaPagos(event: MatSelectChange) {
    this.politicaPagoSeleccionada = event.value;
    this.idPaymentPolicy = event.value.id;
    this.colorPoliticaPagos = event.value.color;
    console.log(event.value)
  }
  selectReputacion(event: MatSelectChange) {
    this.reputacionSeleccionada = event.value;
    this.idReputation = event.value.id;
    this.colorReputacion = event.value.color;
  }
  cambioSituacionRuc(situacionRuc: ComboData) {
    if (typeof situacionRuc === 'string' || situacionRuc === null) {
      this.msgSituacionRuc = "Seleccione una opción."
      this.idLegalRegisterSituation = 0
      this.colorMsgSituacionRuc = "red"
    } else {
      this.msgSituacionRuc = "Opción Seleccionada."
      this.idLegalRegisterSituation = situacionRuc.id
      this.colorMsgSituacionRuc = "green"
    }
    console.log(this.idLegalRegisterSituation)
  }
  limpiarSeleccionSituacionRUC() {
    this.controlSituacionRUC.reset();
    this.idLegalRegisterSituation = 0
  }
  iconoSeleccionado: string = ""
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
        this.iconoSeleccionado =pais.bandera
        this.idCountry = pais.id
      }
    } else {
      this.idCountry = 0
      console.log(this.idCountry)
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
    }
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  selectIdioma(idioma: string) {
    this.language = idioma;
  }

  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
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
          case 'reputacion':
            this.reputationCommentary = data.comentario_es
            this.reputationCommentaryEng = data.comentario_en
            break
          case 'prensa':
            this.newsCommentary = data.comentario_es
            this.newsCommentaryEng = data.comentario_en
            break
        }
      }
    });
  }
  seleccionarCalidad() {
    const dialogRef = this.dialog.open(SeleccionarCalidadComponent, {
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.quality = data.calidad
      }
    });
  }
  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'nacionalidad':
            this.nationality = data.comentario_es;
            this.nationalityEng = data.comentario_en;
          break
          case 'nacimiento':
            this.birthPlace = data.comentario_es;
            this.birthPlaceEng = data.comentario_en;
          break
          case 'relacion':
            this.relationshipWith = data.comentario_es;
            this.relationshipWithEng = data.comentario_en;
          break
          case 'profesion':
            this.profession = data.comentario_es;
            this.professionEng = data.comentario_en;
          break

        }
      }
    });
  }
  //GAUGE
  gaugeRiesgoCrediticio = 0

  colorRiesgoCrediticio = "white"
  colorPoliticaPagos = "white"

  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
  guardar() {
    this.armarModeloModificado()
    if(this.id > 0){
      console.log(this.modeloModificado[0])
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.personaService.addPerson(this.modeloModificado[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Se guardaron los cambios correctamente',
              text: "",
              icon: 'success',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto: true
            })
            this.router.navigate(['informes/persona/detalle/'+this.id]);

            this.armarModeloNuevo();
          }else{
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: 'Comunicarse con Sistemas',
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          }
          if(loader){
            loader.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
      console.log(this.modeloModificado[0])
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {

          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          this.personaService.addPerson(this.modeloModificado[0]).subscribe((response) => {
            if(loader){
              loader.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Se agregó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              })
              this.armarModeloNuevo()
            }else{
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              }).then(() => {
              })
            }
            if(loader){
              loader.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema. Comunicarse con Sistemas',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          })
        }
      });
    }

  }
  salir(){
    this.armarModeloModificado();

    if(JSON.stringify(this.modeloNuevo) !== JSON.stringify(this.modeloModificado)){
      Swal.fire({
        title: '¿Está seguro de salir sin guardar los cambios?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['informes/persona/lista']);
        }
      });
    }else{
      this.router.navigate(['informes/persona/lista']);
    }
  }
}
