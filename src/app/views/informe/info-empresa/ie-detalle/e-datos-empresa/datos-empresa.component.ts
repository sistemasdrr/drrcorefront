import { Company } from './../../../../../models/informes/empresa/datos-empresa';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import { HistoricoPedidosComponent } from './historico-pedidos/historico-pedidos.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Duracion, Traduction } from 'app/models/informes/empresa/datos-empresa';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { SeleccionarCalidadComponent } from './seleccionar-calidad/seleccionar-calidad.component';
import { ComboService } from 'app/services/combo.service';
import { ComboData, PoliticaPagos, Reputacion, RiesgoCrediticio } from 'app/models/combo';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit, OnDestroy {

  controlReputacion = new FormControl<string | Reputacion>('');
  filterReputacion: Observable<Reputacion[]>
  reputaciones: Reputacion[] = []

  controlSituacionRUC = new FormControl<string | ComboData>('');
  filterSituacionRuc: Observable<ComboData[]>
  situacionRuc: ComboData[] = []

  controlPersoneriaJuridica = new FormControl<string | ComboData>('');
  filterPersoneriaJuridica: Observable<ComboData[]>
  personeriaJuridica: ComboData[] = []

  controlDuracion = new FormControl<string | string[]>('');
  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  duracion: string[] = ['', 'Indefinida']
  drcnInforme = ""
  filterDuracion: Observable<string[]>
  politicaPagos: PoliticaPagos[] = []
  calificacionCrediticia: RiesgoCrediticio[] = []

  datosEmpresaActual: Company[] = []
  datosEmpresaModificado: Company[] = []


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

  btnGuardar = false

  //DATOS DE EMPRESA
  id = 0
  oldCode = ""
  name = ""
  socialName = ""
  lastSearched = ""
  lastSearchedD: Date | null = null
  language = ""
  typeRegister = ""
  yearFundation = ""
  constitutionDate = ""
  constitutionDateD: Date | null = null
  quality = ""
  idLegalPersonType = 0
  taxTypeName = ""
  taxTypeCode = ""
  idLegalRegisterSituation = 0
  address = ""
  duration = ""
  durationEng = ""
  place = ""
  idCountry = 0
  subTelephone = ""
  tellphone = ""
  cellphone = ""
  telephone = ""
  postalCode = ""
  whatsappPhone = ""
  email = ""
  webPage = ""
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
  lastUpdaterUser = 0
  reputationComentary = ""
  reputationComentaryEng = ""
  newsComentary = ""
  newsComentaryEng = ""
  identificacionCommentary = ""
  identificacionCommentaryEng = ""
  Traductions: Traduction[] = []

  msgPersoneriaJuridica = ""
  colorMsgPersonaJuridica = ""
  msgPais = ""
  colorMsgPais = ""
  msgSituacionRuc = ""
  colorMsgSituacionRuc = ""
  //TITULOS
  tituloDuracionInforme = 'Duración del Informe'
  tituloComentarioIdentificacion = 'Comentario de Identificación'
  tituloComentarioReputacion = 'Comentario de Reputación'
  tituloComentarioPrensa = 'Comentario de Prensa'

  loading = false

  constructor(
    private dialog: MatDialog,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService: DatosEmpresaService,
    private comboService: ComboService
  ) {
    this.filterReputacion = new Observable<Reputacion[]>()
    this.filterSituacionRuc = new Observable<ComboData[]>()
    this.filterPersoneriaJuridica = new Observable<ComboData[]>()
    this.filterDuracion = new Observable<string[]>()
    this.filterPais = new Observable<Pais[]>()
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.params.subscribe(params => {
      const relacionar = params['relacionar'];
      const idCompany = params['idCompany'];
      console.log('relacionar:', relacionar);
      console.log('idCompany:', idCompany);
    });
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
    console.log(this.id)
  }
  compararModelosF: any
  ngOnInit() {
    const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    if (tabDatosEmpresa) {
      tabDatosEmpresa.classList.remove('tab-cambios')
    }

    this.getComboPersonaJuridica();

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
    this.filterReputacion = this.controlReputacion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterReputacion(name as string) : this.reputaciones.slice()
      }),
    )
    this.filterPersoneriaJuridica = this.controlPersoneriaJuridica.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPersoneriaJuridica(name as string) : this.personeriaJuridica.slice()
      }),
    )
    this.filterDuracion = this.controlDuracion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value
        return name ? this._filterDuracion(name as string) : this.duracion.slice()
      }),
    )

    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
  }

  getComboPersonaJuridica(){
     this.comboService.getPersoneriaJuridica().subscribe((response) => {
      if (response.isSuccess === true) {
        this.personeriaJuridica = response.data
      }
    }).add(() =>{
      this.getComboPaises()
    })
  }
  getComboPaises(){
    this.paisService.getPaises().subscribe((response) => {
      if (response.isSuccess == true) {
        this.paises = response.data;
      }
    }).add(() =>{
      this.getComboReputacion()
    })
  }
  getComboReputacion(){
    this.comboService.getReputacion().subscribe((response) => {
      if (response.isSuccess === true) {
        this.reputaciones = response.data
      }
    }).add(() =>{
      this.getComboSituacionRuc();
    })
  }
  getComboSituacionRuc(){
    this.comboService.getSituacionRUC().subscribe((response) => {
      if (response.isSuccess === true) {
        this.situacionRuc = response.data
      }
    }).add(() =>{
      this.getComboPoliticaPagos();
    })
  }
  getComboPoliticaPagos(){
    this.comboService.getPoliticaPagos().subscribe((response) => {
      if (response.isSuccess === true) {
        this.politicaPagos = response.data
      }
    }).add(() =>{
      this.getComboRiesgoCrediticio();
    })
  }
  getComboRiesgoCrediticio(){
    this.comboService.getRiesgoCrediticio().subscribe((response) => {
      if (response.isSuccess === true) {
        this.calificacionCrediticia = response.data
      }
    }).add(() =>{
      this.getCompanyByID()
    })
  }
  getCompanyByID(){
    if (this.id > 0) {
      this.datosEmpresaService.getDatosEmpresaPorId(this.id).subscribe(
        (response) => {
          if (response.isSuccess === true && response.isWarning === false) {
            console.log(response.data)
            const DatosEmpresa = response.data
            this.oldCode = DatosEmpresa.oldCode
            this.name = DatosEmpresa.name
            this.socialName = DatosEmpresa.socialName
            this.lastSearched = DatosEmpresa.lastSearched
            if(DatosEmpresa.lastSearched !== '' && DatosEmpresa.lastSearched !== null){
              const fecha1 = this.lastSearched.split("/");
              if (fecha1) {
                this.lastSearchedD = new Date(parseInt(fecha1[2]), parseInt(fecha1[0]) - 1, parseInt(fecha1[1]))
              }
            }else{
              this.lastSearchedD = null
            }
            this.language = DatosEmpresa.language
            this.typeRegister = DatosEmpresa.typeRegister
            this.yearFundation = DatosEmpresa.yearFundation
            this.constitutionDate = DatosEmpresa.constitutionDate
            if(DatosEmpresa.constitutionDate !== '' && DatosEmpresa.constitutionDate !== null){
              const fecha2 = this.constitutionDate.split("/");
              if (fecha2) {
                this.constitutionDateD = new Date(parseInt(fecha2[2]), parseInt(fecha2[0]) - 1, parseInt(fecha2[1]))
              }
            }else{
              this.constitutionDateD = null
            }
            this.quality = DatosEmpresa.quality
            if(DatosEmpresa.idLegalPersonType > 0 && DatosEmpresa.idLegalPersonType !== null){
              this.idLegalPersonType = DatosEmpresa.idLegalPersonType
              this.personeriaJuridicaInforme = this.personeriaJuridica.filter(x => x.id === this.idLegalPersonType)[0]
            }else{
              this.limpiarSeleccionPersoneriaJuridica()
            }
            this.taxTypeName = DatosEmpresa.taxTypeName
            this.taxTypeCode = DatosEmpresa.taxTypeCode
            if(DatosEmpresa.idLegalRegisterSituation > 0 && DatosEmpresa.idLegalRegisterSituation !== null){
              this.idLegalRegisterSituation = DatosEmpresa.idLegalRegisterSituation
              this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
            }else{
              this.limpiarSeleccionSituacionRUC()
            }
            this.address = DatosEmpresa.address
            this.duration = DatosEmpresa.duration
            this.place = DatosEmpresa.place
            if(DatosEmpresa.idCountry > 0 && DatosEmpresa.idCountry !== null){
              this.idCountry = DatosEmpresa.idCountry
              this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
            }else{
              this.limpiarSeleccionPais()
            }
            this.subTelephone = DatosEmpresa.subTelephone
            this.tellphone = DatosEmpresa.tellphone
            this.cellphone = DatosEmpresa.cellphone
            this.telephone = DatosEmpresa.telephone
            this.postalCode = DatosEmpresa.postalCode
            this.whatsappPhone = DatosEmpresa.whatsappPhone
            this.email = DatosEmpresa.email
            this.webPage = DatosEmpresa.webPage
            if(DatosEmpresa.idCreditRisk > 0 && DatosEmpresa.idCreditRisk !== null){
              this.idCreditRisk = DatosEmpresa.idCreditRisk
              this.riesgoCrediticioSeleccionado = this.calificacionCrediticia.filter(x => x.id === this.idCreditRisk)[0]
            }else{
              this.idCreditRisk = 0
            }
            this.gaugeRiesgoCrediticio = this.riesgoCrediticioSeleccionado.rate
            this.descripcionRiesgoCrediticio = this.riesgoCrediticioSeleccionado.abreviation
            this.colorRiesgoCrediticio = this.riesgoCrediticioSeleccionado.color
            this.calificacionRiesgoCrediticio = this.riesgoCrediticioSeleccionado.identifier
            if(DatosEmpresa.idPaymentPolicy > 0 && DatosEmpresa.idPaymentPolicy !== null){
              this.idPaymentPolicy = DatosEmpresa.idPaymentPolicy
              this.politicaPagoSeleccionada = this.politicaPagos.filter(x => x.id === this.idPaymentPolicy)[0]
            }else{
              this.idPaymentPolicy = 0
            }
            if(DatosEmpresa.idReputation > 0 && DatosEmpresa.idReputation !== null){
              this.idReputation = DatosEmpresa.idReputation
              this.reputacionSeleccionada = this.reputaciones.filter(x => x.id === this.idReputation)[0]
            }else{
              this.idReputation = 0
            }
            this.lastUpdaterUser = 0
            this.reputationComentary = DatosEmpresa.reputationComentary
            if(DatosEmpresa.traductions.length > 0){
              if(DatosEmpresa.traductions[0].value !== null && DatosEmpresa.traductions[0].value !== ''){
                this.identificacionCommentaryEng = DatosEmpresa.traductions[0].value
              }
              if(DatosEmpresa.traductions[1].value !== null && DatosEmpresa.traductions[1].value !== ''){
                this.durationEng = DatosEmpresa.traductions[1].value
              }
              if(DatosEmpresa.traductions[2].value !== null && DatosEmpresa.traductions[2].value !== ''){
                this.reputationComentaryEng = DatosEmpresa.traductions[2].value
              }
              if(DatosEmpresa.traductions[3].value !== null && DatosEmpresa.traductions[3].value !== ''){
                this.newsComentaryEng = DatosEmpresa.traductions[3].value
              }
            }
          this.newsComentary = DatosEmpresa.newsComentary
          this.identificacionCommentary = DatosEmpresa.identificacionCommentary
        }
      }).add(() => {
        this.armarModeloActual()
        this.tabDatosEmpresa()
        this.compararModelosF = setInterval(() => {
          this.compararModelos();
        }, 2000);
      })
    }
  }
  tabDatosEmpresa() {
    if (this.language != '' || this.typeRegister != '' || this.yearFundation != '' || this.name != '' ||
      this.socialName != '' || this.taxTypeName != '' || this.taxTypeCode != '' || this.identificacionCommentary != '' ||
      this.identificacionCommentaryEng != '' || this.address != '' || this.duration != '' || this.place != '' ||
      this.subTelephone != '' || this.telephone != '' || this.cellphone != '' || this.postalCode != '' ||
      this.whatsappPhone != '' || this.email != '' || this.webPage != '') {
      const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
      if (tabDatosEmpresa) {
        tabDatosEmpresa.classList.add('tab-con-datos')
      }
    }
  }
  compararModelos(): void {
    this.armarModeloModificado();
    const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    if (JSON.stringify(this.datosEmpresaActual) !== JSON.stringify(this.datosEmpresaModificado)) {
      if (tabDatosEmpresa) {
        tabDatosEmpresa.classList.add('tab-cambios');
        this.btnGuardar = true
      }
    } else {
      if (tabDatosEmpresa) {
        tabDatosEmpresa.classList.remove('tab-cambios');
        this.btnGuardar = false;
      }
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.compararModelosF);
    const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    if (tabDatosEmpresa) {
      tabDatosEmpresa.classList.remove('tab-cambios')
    }
  }
  armarModeloActual() {
    this.datosEmpresaActual[0] = {
      id: this.id,
      oldCode: this.oldCode,
      name: this.name,
      socialName: this.socialName,
      lastSearched: this.lastSearched,
      language: this.language,
      typeRegister: this.typeRegister,
      yearFundation: this.yearFundation,
      constitutionDate: this.constitutionDate,
      quality: this.quality,
      idLegalPersonType: this.idLegalPersonType,
      taxTypeName: this.taxTypeName,
      taxTypeCode: this.taxTypeCode,
      idLegalRegisterSituation: this.idLegalRegisterSituation,
      address: this.address,
      duration: this.duration,
      place: this.place,
      idCountry: this.idCountry,
      subTelephone: this.subTelephone,
      tellphone: this.tellphone,
      cellphone: this.cellphone,
      telephone: this.telephone,
      postalCode: this.postalCode,
      whatsappPhone: this.whatsappPhone,
      email: this.email,
      webPage: this.webPage,
      idCreditRisk: this.idCreditRisk,
      idPaymentPolicy: this.idPaymentPolicy,
      idReputation: this.idReputation,
      lastUpdaterUser: 0,
      reputationComentary: this.reputationComentary,
      newsComentary: this.newsComentary,
      identificacionCommentary: this.identificacionCommentary,
      enable : true,
      traductions: [
        {
          key : 'L_E_COMIDE',
          value : this.identificacionCommentaryEng
        },
        {
          key : 'S_E_DURATION',
          value : this.durationEng
        },
        {
          key : 'L_E_REPUTATION',
          value : this.reputationComentaryEng
        },
        {
          key : 'L_E_NEW',
          value : this.newsComentaryEng
        },
      ]
    }
  }
  armarModeloModificado() {
    this.datosEmpresaModificado[0] = {
      id: this.id,
      oldCode: this.oldCode,
      name: this.name,
      socialName: this.socialName,
      lastSearched: this.lastSearched,
      language: this.language,
      typeRegister: this.typeRegister,
      yearFundation: this.yearFundation,
      constitutionDate: this.constitutionDate,
      quality: this.quality,
      idLegalPersonType: this.idLegalPersonType,
      taxTypeName: this.taxTypeName,
      taxTypeCode: this.taxTypeCode,
      idLegalRegisterSituation: this.idLegalRegisterSituation,
      address: this.address,
      duration: this.duration,
      place: this.place,
      idCountry: this.idCountry,
      subTelephone: this.subTelephone,
      tellphone: this.tellphone,
      cellphone: this.cellphone,
      telephone: this.telephone,
      postalCode: this.postalCode,
      whatsappPhone: this.whatsappPhone,
      email: this.email,
      webPage: this.webPage,
      idCreditRisk: this.idCreditRisk,
      idPaymentPolicy: this.idPaymentPolicy,
      idReputation: this.idReputation,
      lastUpdaterUser: 0,
      reputationComentary: this.reputationComentary,
      newsComentary: this.newsComentary,
      identificacionCommentary: this.identificacionCommentary,
      enable : true,
      traductions: [
        {
          key : 'L_E_COMIDE',
          value : this.identificacionCommentaryEng
        },
        {
          key : 'S_E_DURATION',
          value : this.durationEng
        },
        {
          key : 'L_E_REPUTATION',
          value : this.reputationComentaryEng
        },
        {
          key : 'L_E_NEW',
          value : this.newsComentaryEng
        },
      ]
    }
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filterReputacion(description: string): Reputacion[] {
    const filterValue = description.toLowerCase();
    return this.reputaciones.filter(reputacion => reputacion.valor.toLowerCase().includes(filterValue));
  }
  private _filterSituacionRuc(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.valor.toLowerCase().includes(filterValue));
  }
  private _filterPersoneriaJuridica(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.personeriaJuridica.filter(personeriaJuridica => personeriaJuridica.valor.toLowerCase().includes(filterValue));
  }
  private _filterDuracion(description: string): string[] {
    const filterValue = description.toLowerCase();
    return this.duracion.filter(duracion => duracion.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  displayReputacion(reputacion: Reputacion): string {
    return reputacion && reputacion.valor ? reputacion.valor : '';
  }
  displaySituacionRuc(situacionRuc: ComboData): string {
    return situacionRuc && situacionRuc.valor ? situacionRuc.valor : '';
  }
  displayPersoneriaJuridica(personeriaJuridica: ComboData): string {
    return personeriaJuridica && personeriaJuridica.valor ? personeriaJuridica.valor : '';
  }
  displayDuracion(duracion: Duracion): string {
    return duracion && duracion.description ? duracion.description : '';
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
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
  limpiarSeleccionReputacion() {
    this.controlReputacion.reset();
  }
  limpiarSeleccionSituacionRUC() {
    this.controlSituacionRUC.reset();
    this.idLegalRegisterSituation = 0
  }
  cambioSituacionRuc(situacionRuc: ComboData) {
    if (typeof situacionRuc === 'string' || situacionRuc === null || this.idLegalRegisterSituation === 0) {
      this.msgSituacionRuc = "Seleccione una opción."
      this.idLegalRegisterSituation = 0
      this.colorMsgSituacionRuc = "red"
    } else {
      this.msgSituacionRuc = "Opción Seleccionada."
      this.idLegalRegisterSituation = situacionRuc.id
      this.colorMsgSituacionRuc = "green"
    }
  }
  limpiarSeleccionPersoneriaJuridica() {
    this.controlPersoneriaJuridica.reset();
    this.idLegalPersonType = 0
  }
  cambioPersoneriaJuridica(personeriaJuridica: ComboData) {
    if (typeof personeriaJuridica === 'string' || personeriaJuridica === null) {
      this.msgPersoneriaJuridica = "Seleccione alguna opción."
      this.idLegalPersonType = 0
      this.colorMsgPersonaJuridica = "red"
    } else {
      this.msgPersoneriaJuridica = "Opción Seleccionada"
      this.idLegalPersonType = personeriaJuridica.id
      this.colorMsgPersonaJuridica = "green"
    }
  }
  limpiarSeleccionDuracion() {
    this.controlDuracion.reset();
  }


  agregarComentario(titulo: string, subtitulo: string, comentario_es: string, comentario_en: string, input: string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
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
          case 'comentarioIdentificacion':
            this.identificacionCommentary = data.comentario_es;
            this.identificacionCommentaryEng = data.comentario_en;
            break
          case 'comentarioReputacion':
            this.reputationComentary = data.comentario_es;
            this.reputationComentaryEng = data.comentario_en;
            break
          case 'comentarioPrensa':
            this.newsComentary = data.comentario_es;
            this.newsComentaryEng = data.comentario_en;
            break
        }
      }
    });
  }
  agregarTraduccion(titulo: string, subtitulo: string, comentario_es: string, comentario_en: string, input: string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo: titulo,
        subtitulo: subtitulo,
        tipo: 'input',
        comentario_es: comentario_es,
        comentario_en: comentario_en,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        switch (input) {
          case 'duracionInforme':
            this.duration = data.comentario_es;
            this.durationEng = data.comentario_en;
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
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    this.lastSearchedD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.lastSearched = this.formatDate(selectedDate);
    }
  }
  selectFechaConstitucion(event: MatDatepickerInputEvent<Date>) {
    this.constitutionDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.constitutionDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  historicoPedidos() {
    const dialog = this.dialog.open(HistoricoPedidosComponent, {
      data: {
        titulo: "Histórico de Pedidos"
      }
    });
  }
  selectIdioma(idioma: string) {
    this.language = idioma;
  }
  selectInstitucionInforme(institucionInforme: string) {
    this.typeRegister = institucionInforme;
  }
  selectPersoneriaJuridica(personeriaJuridica: ComboData) {
    this.personeriaJuridicaInforme = personeriaJuridica;
    this.personeriaJuridicaInforme = this.personeriaJuridica.filter(x => x.valor == personeriaJuridica.valor)[0];
  }
  selectSituacionRuc(situacionRuc: ComboData) {
    this.idLegalRegisterSituation = situacionRuc.id;
  }
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
  }
  selectReputacion(event: MatSelectChange) {
    this.reputacionSeleccionada = event.value;
    this.idReputation = event.value.id;
    this.colorReputacion = event.value.color;
  }
  iconoSeleccionado: string = ""
  actualizarSeleccionPais(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisSeleccionado = paisSeleccionadoObj;
      this.iconoSeleccionado = paisSeleccionadoObj.bandera;
    }
  }
  guardar() {
    this.armarModeloModificado()
    if(this.id > 0){
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.datosEmpresaService.AddDatosEmpresa(this.datosEmpresaModificado[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
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
            const busqueda = JSON.parse(localStorage.getItem('busquedaEmpresas')+'');
            busqueda.razonSocial = this.name;
            busqueda.idPais = this.idCountry;
            localStorage.setItem('busquedaEmpresas', JSON.stringify(busqueda));
            this.router.navigate(['informes/empresa/detalle/'+this.id]);

            this.armarModeloActual();
          }else{
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
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
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
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

          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          this.datosEmpresaService.AddDatosEmpresa(this.datosEmpresaModificado[0]).subscribe((response) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
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
              const busqueda = JSON.parse(localStorage.getItem('busquedaEmpresas')+'');
              busqueda.razonSocial = this.name;
              busqueda.idPais = this.idCountry;
              localStorage.setItem('busquedaEmpresas', JSON.stringify(busqueda));

              this.router.navigate(['informes/empresa/detalle/'+response.data]);
              this.armarModeloActual()
            }else{
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
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
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
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
  salir() {
    this.armarModeloModificado();

    if(JSON.stringify(this.datosEmpresaActual) !== JSON.stringify(this.datosEmpresaModificado)){
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
          this.router.navigate(['informes/empresa/lista']);
        }
      });
    }else{
      this.router.navigate(['informes/empresa/lista']);
    }
  }
  //GAUGE
  gaugeRiesgoCrediticio = 0
  colorRiesgoCrediticio: string = "white"
  colorPoliticaPagos: string = "white"
  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
}
