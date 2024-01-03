import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/pais';
import { Observable, map, startWith } from 'rxjs';
import { HistoricoPedidosComponent } from 'app/views/informe/info-empresa/ie-detalle/e-datos-empresa/historico-pedidos/historico-pedidos.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ComboData, PoliticaPagos, Reputacion, RiesgoCrediticio } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'app/models/informes/persona/datos-generales';

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
  idProfession = 0
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
  private personaService : DatosGeneralesService,private activatedRoute: ActivatedRoute) {
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
                if(persona){
                  this.oldCode = persona.oldCode
                  this.fullname = persona.fullname
                  this.language = persona.language
                  this.nationality = persona.nationality
                  this.birthDate = persona.birthDate
                  this.birthPlace = persona.birthPlace
                  this.idDocumentType = persona.idDocumentType
                  this.codeDocumentType = persona.codeDocumentType
                  this.taxTypeName = persona.taxTypeName
                  this.taxTypeCode = persona.taxTypeCode
                  this.idLegalRegisterSituation = persona.idLegalRegisterSituation
                  this.address = persona.address
                  this.cp = persona.cp
                  this.city = persona.city
                  this.otherDirecctions = persona.otherDirecctions
                  this.tradeName = persona.tradeName
                  this.idCountry = persona.idCountry
                  this.codePhone = persona.codePhone
                  this.numberPhone = persona.numberPhone
                  this.idCivilStatus = persona.idCivilStatus
                  this.relationshipWith = persona.relationshipWith
                  this.relationshipDocumentType = persona.relationshipDocumentType
                  this.relationshipCodeDocument = persona.relationshipCodeDocument
                  this.fatherName = persona.fatherName
                  this.motherName = persona.motherName
                  this.email = persona.email
                  this.cellphone = persona.cellphone
                  this.idProfession = persona.idProfession
                  this.professionEng
                  this.clubMember = persona.clubMember
                  this.insurance = persona.insurance
                  this.newsCommentary = persona.newsCommentary
                  this.newsCommentaryEng
                  this.printNewsCommentary = persona.printNewsCommentary
                  this.privateCommentary = persona.privateCommentary
                  this.reputationCommentary = persona.reputationCommentary
                  this.reputationCommentaryEng
                  this.idCreditRisk = persona.idCreditRisk
                  this.idPaymentPolicy = persona.idPaymentPolicy
                  this.idReputation = persona.idReputation
                  this.idPersonSituation = persona.idPersonSituation
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
              this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
              this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
              this.riesgoCrediticioSeleccionado = this.calificacionCrediticia.filter(x => x.id === this.idCreditRisk)[0]
              this.politicaPagoSeleccionada = this.politicaPagos.filter(x => x.id === this.idPaymentPolicy)[0]
              this.reputacionSeleccionada = this.reputaciones.filter(x => x.id === this.idReputation)[0]
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
      idProfession : this.idProfession,
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
      idProfession : this.idProfession,
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
  guardar(){
    this.armarModeloModificado()
    console.log(this.modeloModificado[0])
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
            // this.profession = data.comentario_es;
            // this.profesionEng = data.comentario_en;
          break
        }
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
    // dialogRef.afterClosed().subscribe((data) => {
    //   if (data) {
    //     console.log(data)
    //     switch(input){
    //       case 'duracion':
    //         this.operationDuration = data.comentario_es
    //         this.operationDurationEng = data.comentario_en
    //       break
    //       case 'registradaEn':
    //         this.registerPlace = data.comentario_es
    //         this.registerPlaceEng = data.comentario_en
    //       break
    //       case 'registrosPublicos':
    //       this.publicRegister = data.comentario_es
    //       this.publicRegisterEng = data.comentario_en
    //       break
    //       case 'fechaAumento':
    //       this.increaceDateCapital = data.comentario_es
    //       this.increaceDateCapitalEng = data.comentario_en
    //       break
    //       case 'actualTC':
    //       this.currentExchangeRate = data.comentario_es
    //       this.currentExchangeRateEng = data.comentario_en
    //       break
    //     }
    //   }
    // });
  }

  //GAUGE
  gaugeRiesgoCrediticio = 0

  colorRiesgoCrediticio : string = "white"
  colorPoliticaPagos : string = "white"

  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
}
