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
import { DatosEmpresa, PersoneriaJuridica, Reputacion, SituacionRuc } from 'app/models/informes/empresa/datos-empresa';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit, OnDestroy{

  controlReputacion = new FormControl<string | Reputacion>('');
  controlSituacionRUC = new FormControl<string | SituacionRuc>('');
  controlPersoneriaJuridica = new FormControl<string | PersoneriaJuridica>('');
  controlPaises = new FormControl<string | Pais>('')
  paises : Pais[] = []
  filterPais : Observable<Pais[]>
  reputaciones : Reputacion[] = [
  ]
  filterReputacion: Observable<Reputacion[]>
  situacionRuc : SituacionRuc[] = []
  filterSituacionRuc: Observable<SituacionRuc[]>
  personeriaJuridica : PersoneriaJuridica[] = []
  filterPersoneriaJuridica : Observable<PersoneriaJuridica[]>
  politicaPagos : string[] = []
  calificacionCrediticia : string[] = []

  datosEmpresa : DatosEmpresa[] = []

  //DATOS DE EMPRESA
  codigoInforme : string | null = ''
  fechaInformeInvestigadoDate : Date = new Date()
  informeInvestigadoEl : string = ""
  idiomaInforme : string = ""
  tipoInstitucionInforme : string = ""
  yFundacionInforme : string = ""
  razonSocialInforme : string = ""
  nombreComercialInforme : string = ""
  fechaConstitucionInformeDate : Date = new Date()
  fechaConstitucionInforme : string = ""
  tipoRucInforme : string = ""
  codigoRucInforme : string = ""
  comentarioIdentificacionInforme : string = ""
  comentarioIdentificacionIngInforme : string = ""
  direccionCompletaInforme : string = ""
  duracionInforme : string = ""
  dptoEstadoInforme : string = ""
  codigoTelefonoInforme : string = ""
  numeroTelefonoInforme : string = ""
  numeroCelularInforme : string = ""
  codPostalInforme : string = ""
  whatsappEmpresarialInforme : string = ""
  emailCorporativoInforme : string = ""
  paginaWebInforme : string = ""
  riesgoCrediticioInforme : string = ""
  politicaPagosInforme : string = ""
  reputacionInforme : string = ""
  comentarioReputacionInforme : string = ""
  comentarioReputacionIngInforme : string = ""
  comentarioPrensaInforme : string = ""
  comentarioPrensaIngInforme : string = ""

  //TITULOS
  tituloComentarioIdentificacion : string = 'Comentario de Identificación'
  tituloComentarioReputacion : string = 'Comentario de Reputación'
  tituloComentarioPrensa : string = 'Comentario de Prensa'
  constructor(
    private dialog : MatDialog,
    private PaisService : PaisService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService : DatosEmpresaService,
  ){
    this.filterReputacion = new Observable<Reputacion[]>()
    this.filterSituacionRuc = new Observable<SituacionRuc[]>()
    this.filterPersoneriaJuridica = new Observable<PersoneriaJuridica[]>()
    this.filterPais = new Observable<Pais[]>()
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }
  compararModelosF: any
  ngOnInit(){

    const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    if (tabDatosEmpresa) {
        tabDatosEmpresa.classList.remove('tab-cambios')
    }

    this.paises = this.PaisService.getPaises()
    this.reputaciones = this.datosEmpresaService.getReputacion()
    this.situacionRuc = this.datosEmpresaService.getSituacionRuc()
    this.personeriaJuridica = this.datosEmpresaService.getPersoneriaJuridica()
    this.politicaPagos = this.datosEmpresaService.getPoliticaPagos()
    this.calificacionCrediticia = this.datosEmpresaService.getCalificacionCrediticia()

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
    this.filterReputacion = this.controlReputacion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description
        return name ? this._filterReputacion(name as string) : this.reputaciones.slice()
      }),
    )
    this.filterPersoneriaJuridica = this.controlPersoneriaJuridica.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description
        return name ? this._filterPersoneriaJuridica(name as string) : this.personeriaJuridica.slice()
      }),
    )
    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
    if(this.codigoInforme !== 'nuevo'){
      const datosEmpresa = this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+'')
      console.log(datosEmpresa)
      this.informeInvestigadoEl = datosEmpresa[0].informeInvestigadoEl
      const fecha1 = this.informeInvestigadoEl.split("/");
      if(fecha1){
        this.fechaInformeInvestigadoDate = new Date(parseInt(fecha1[2]), parseInt(fecha1[1])-1,parseInt(fecha1[0]))
      }
      this.idiomaInforme = datosEmpresa[0].idioma
      this.tipoInstitucionInforme = datosEmpresa[0].tipoInstitucion
      this.yFundacionInforme = datosEmpresa[0].yFundacion+''
      this.razonSocialInforme = datosEmpresa[0].razonSocial
      this.nombreComercialInforme = datosEmpresa[0].nombreComercial
      this.fechaConstitucionInforme = datosEmpresa[0].fechaConstitucion
      const fecha2 = this.fechaConstitucionInforme.split("/");
      if(fecha2){
        this.fechaConstitucionInformeDate = new Date(parseInt(fecha2[2]), parseInt(fecha2[1])-1,parseInt(fecha2[0]))
      }
      this.tipoRucInforme = datosEmpresa[0].tipoRuc
      this.codigoRucInforme = datosEmpresa[0].codigoRuc
      this.comentarioIdentificacionInforme = datosEmpresa[0].comentarioIdentificacion
      this.comentarioIdentificacionIngInforme = datosEmpresa[0].comentarioIdentificacionIng
      this.direccionCompletaInforme = datosEmpresa[0].direccionCompleta
      this.duracionInforme = datosEmpresa[0].duracion
      this.dptoEstadoInforme = datosEmpresa[0].dptoEstado
      this.paisInforme = datosEmpresa[0].pais
      this.codigoTelefonoInforme = datosEmpresa[0].codigoTelefono
      this.numeroTelefonoInforme = datosEmpresa[0].numeroTelefono
      this.numeroCelularInforme = datosEmpresa[0].numeroCelular
      this.codPostalInforme = datosEmpresa[0].codPostal
      this.whatsappEmpresarialInforme = datosEmpresa[0].whatsappEmpresarial
      this.emailCorporativoInforme = datosEmpresa[0].emailCorporativo
      this.paginaWebInforme = datosEmpresa[0].paginaWeb
      this.riesgoCrediticioInforme = datosEmpresa[0].riesgoCrediticio
      this.politicaPagosInforme = datosEmpresa[0].politicaPagos
      this.reputacionInforme = datosEmpresa[0].reputacion
      this.comentarioReputacionInforme = datosEmpresa[0].comentarioReputacion
      this.comentarioReputacionIngInforme = datosEmpresa[0].comentarioReputacionIng
      this.comentarioPrensaInforme = datosEmpresa[0].comentarioPrensa
      this.comentarioPrensaIngInforme = datosEmpresa[0].comentarioPrensaIng
      this.personeriaJuridicaInforme = datosEmpresa[0].personeriaJuridica
      this.situacionRucInforme = datosEmpresa[0].situacionRuc
      this.selectRiesgoCrediticio( this.riesgoCrediticioInforme)
    }else{
      console.log('informe no encontrado')
    }

    if(this.idiomaInforme != '' && this.tipoInstitucionInforme != '' && this.yFundacionInforme != '' && this.razonSocialInforme != '' &&
      this.nombreComercialInforme != '' && this.tipoRucInforme != '' && this.codigoRucInforme != '' && this.comentarioIdentificacionInforme != '' &&
      this.comentarioIdentificacionIngInforme != '' && this.direccionCompletaInforme != '' && this.duracionInforme != '' && this.dptoEstadoInforme != '' &&
      this.codigoTelefonoInforme != '' && this.numeroTelefonoInforme != '' && this.numeroCelularInforme != '' && this.codPostalInforme != '' &&
      this.whatsappEmpresarialInforme != '' && this.emailCorporativoInforme != '' && this.paginaWebInforme != '' ){
        const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
        if (tabDatosEmpresa) {
            tabDatosEmpresa.classList.add('tab-con-datos')
        }
      }

    this.compararModelosF = setInterval(() => {
      this.compararModelos();
    }, 5000);


  }

  compararModelos(){
    this.armarModelo()
    if(JSON.stringify(this.datosEmpresa) !== JSON.stringify(this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+''))){
      const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
      if (tabDatosEmpresa) {
          tabDatosEmpresa.classList.add('tab-cambios')
      }
    }else{
      const tabDatosEmpresa = document.getElementById('tab-datos-empresa') as HTMLElement | null;
      if (tabDatosEmpresa) {
          tabDatosEmpresa.classList.remove('tab-cambios')
      }
    }
  }

  personeriaJuridicaInforme :  PersoneriaJuridica = {
    id : 0,
    description : ''
  }
  situacionRucInforme :  SituacionRuc = {
    id : 0,
    description : ''
  }
  paisInforme : Pais = {
    id : 0,
    nombre : '',
    nombreAcort : '',
    nombreMayus : '',
    icono : ''
  }

  ngOnDestroy(): void {
    console.log('Se destruyo el componente')
    clearInterval(this.compararModelosF);
  }
  armarModelo(){
    this.datosEmpresa[0] = {
      codigoInforme : this.codigoInforme+'',
      informeInvestigadoEl : this.informeInvestigadoEl,
      idioma : this.idiomaInforme,
      tipoInstitucion : this.tipoInstitucionInforme,
      yFundacion : parseInt(this.yFundacionInforme),
      razonSocial : this.razonSocialInforme,
      nombreComercial : this.nombreComercialInforme,
      fechaConstitucion : this.fechaConstitucionInforme,
      personeriaJuridica : this.personeriaJuridicaInforme,

      tipoRuc : this.tipoRucInforme,
      codigoRuc : this.codigoRucInforme,
      situacionRuc : this.situacionRucInforme,

      comentarioIdentificacion : this.comentarioIdentificacionInforme,
      comentarioIdentificacionIng : this.comentarioIdentificacionIngInforme,

      direccionCompleta : this.direccionCompletaInforme,
      duracion : this.duracionInforme,
      dptoEstado : this.dptoEstadoInforme,
      pais : this.paisInforme,
      codigoTelefono : this.codigoTelefonoInforme,
      numeroTelefono : this.numeroTelefonoInforme,
      numeroCelular : this.numeroCelularInforme,
      codPostal : this.codPostalInforme,
      whatsappEmpresarial : this.whatsappEmpresarialInforme,
      emailCorporativo : this.emailCorporativoInforme,
      paginaWeb : this.paginaWebInforme,

      riesgoCrediticio : this.riesgoCrediticioInforme,
      politicaPagos : this.politicaPagosInforme,
      reputacion : this.reputacionInforme,
      comentarioReputacion : this.comentarioReputacionInforme,
      comentarioReputacionIng : this.comentarioReputacionIngInforme,
      comentarioPrensa : this.comentarioPrensaInforme,
      comentarioPrensaIng :this.comentarioPrensaIngInforme,
    }
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.nombre.toLowerCase().includes(filterValue));
  }
  private _filterReputacion(description: string): Reputacion[] {
    const filterValue = description.toLowerCase();
    return this.reputaciones.filter(reputacion => reputacion.description.toLowerCase().includes(filterValue));
  }
  private _filterSituacionRuc(description: string): SituacionRuc[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.description.toLowerCase().includes(filterValue));
  }
  private _filterPersoneriaJuridica(description: string): PersoneriaJuridica[] {
    const filterValue = description.toLowerCase();
    return this.personeriaJuridica.filter(personeriaJuridica => personeriaJuridica.description.toLowerCase().includes(filterValue));
  }
  displayPais(pais : Pais): string {
    return pais && pais.nombre ? pais.nombre : '';
  }
  displayReputacion(reputacion : Reputacion): string {
    return reputacion && reputacion.description ? reputacion.description : '';
  }
  displaySituacionRuc(situacionRuc : SituacionRuc): string {
    return situacionRuc && situacionRuc.description ? situacionRuc.description : '';
  }
  displayPersoneriaJuridica(personeriaJuridica : PersoneriaJuridica): string {
    return personeriaJuridica && personeriaJuridica.description ? personeriaJuridica.description : '';
  }

  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo : titulo,
      subtitulo : subtitulo,
      tipo : 'textarea',
      comentario_es : comentario_es,
      comentario_en : comentario_en,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        switch(input){
          case 'comentarioIdentificacion':
            this.comentarioIdentificacionInforme = data.comentario_es;
            this.comentarioIdentificacionIngInforme = data.comentario_en;
          break
          case 'comentarioReputacion':
            this.comentarioReputacionInforme = data.comentario_es;
            this.comentarioReputacionIngInforme = data.comentario_en;
          break
          case 'comentarioPrensa':
            this.comentarioPrensaInforme = data.comentario_es;
            this.comentarioPrensaIngInforme = data.comentario_en;
          break
        }
      }
    });
  }
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.informeInvestigadoEl = this.formatDate(selectedDate);
    }
  }
  selectFechaConstitucion(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaConstitucionInforme = this.formatDate(selectedDate);
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
  selectIdioma(idioma : string){
    this.idiomaInforme = idioma
  }
  selectInstitucionInforme(institucionInforme : string){
    this.tipoInstitucionInforme = institucionInforme
  }
  selectPersoneriaJuridica(personeriaJuridica : PersoneriaJuridica){
    this.personeriaJuridicaInforme = personeriaJuridica
    this.personeriaJuridicaInforme = this.datosEmpresaService.getPersoneriaJuridica().filter(x => x.description == personeriaJuridica.description)[0]
  }
  selectSituacionRuc(situacionRuc : SituacionRuc){
    this.situacionRucInforme = situacionRuc
    this.datosEmpresa[0].situacionRuc = this.datosEmpresaService.getSituacionRuc().filter(x => x.description == situacionRuc.description)[0]
  }
  selectRiesgoCrediticio(riesgoCrediticio : string){
    this.riesgoCrediticioInforme = riesgoCrediticio
    if(riesgoCrediticio == ""){
      this.gaugeRiesgoCrediticio = 0
      this.colorRiesgoCrediticio = "white"
      this.calificacionRiesgoCrediticio = ""
      this.descripcionRiesgoCrediticio = ""
    }else if(riesgoCrediticio.includes("A+ :")){
      this.gaugeRiesgoCrediticio = 600
      this.colorRiesgoCrediticio = "green"
      this.calificacionRiesgoCrediticio = "A+"
      this.descripcionRiesgoCrediticio = "Sin Riesgo"
    }else if(riesgoCrediticio.includes("A- :")){
      this.gaugeRiesgoCrediticio = 500
      this.colorRiesgoCrediticio = "#64f584"
      this.descripcionRiesgoCrediticio = "Riesgo Mínimo"
      this.calificacionRiesgoCrediticio = "A-"
    }else if(riesgoCrediticio.includes("B :")){
      this.gaugeRiesgoCrediticio = 400
      this.colorRiesgoCrediticio = "yellow"
      this.descripcionRiesgoCrediticio = "Riesgo Moderado"
      this.calificacionRiesgoCrediticio = "B"
    }else if(riesgoCrediticio.includes("C :")){
      this.gaugeRiesgoCrediticio = 300
      this.colorRiesgoCrediticio = "orange"
      this.descripcionRiesgoCrediticio = "Riesgo Alto"
      this.calificacionRiesgoCrediticio = "C"
    }else if(riesgoCrediticio.includes("D :")){
      this.gaugeRiesgoCrediticio = 200
      this.colorRiesgoCrediticio = "red"
      this.descripcionRiesgoCrediticio = "Riesgo Muy Alto"
      this.calificacionRiesgoCrediticio = "D"
    }else if(riesgoCrediticio.includes("E :")){
      this.gaugeRiesgoCrediticio = 100
      this.colorRiesgoCrediticio = "black"
      this.descripcionRiesgoCrediticio = "Riesgo Muy Alto"
      this.calificacionRiesgoCrediticio = "E"
    }else if(riesgoCrediticio.includes("NN :")){
      this.gaugeRiesgoCrediticio = 0
      this.colorRiesgoCrediticio = "gray"
      this.descripcionRiesgoCrediticio = "Riesgo Indeterminado"
      this.calificacionRiesgoCrediticio = "NN"
    }
  }
  selectPoliticaPagos(politicaPagos : string){
    this.politicaPagosInforme = politicaPagos
    if(politicaPagos == ""){
      this.colorPoliticaPagos = "white"
    }else if(politicaPagos.includes("1")){
      this.colorPoliticaPagos = "green"
    }else if(politicaPagos.includes("2")){
      this.colorPoliticaPagos = "green"
    }else if(politicaPagos.includes("3")){
      this.colorPoliticaPagos = "orange"
    }else if(politicaPagos.includes("4")){
      this.colorPoliticaPagos = "red"
    }else if(politicaPagos.includes("5")){
      this.colorPoliticaPagos = "black"
    }else if(politicaPagos.includes("6")){
      this.colorPoliticaPagos = "skyblue"
    }else if(politicaPagos.includes("7")){
      this.colorPoliticaPagos = "gray"
    }
  }
  selectReputacion(event: MatSelectChange) {
    const selectedReputacion = event.value;
    this.reputacionInforme = selectedReputacion
    if(selectedReputacion.id == 0){
      this.colorReputacion = "white"
    }else if(selectedReputacion.id > 0 && selectedReputacion.id <= 4){
      this.colorReputacion = "green"
    }else if(selectedReputacion.id > 4){
      this.colorReputacion = "red"
    }
  }
  iconoSeleccionado: string = ""
  actualizarSeleccionPais(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisInforme = paisSeleccionadoObj;
      this.iconoSeleccionado = paisSeleccionadoObj.icono;
    }
  }
  cambiarIcono(objPais : any){
    this.iconoSeleccionado = objPais.icono
  }
  guardar(){
    this.armarModelo()
    this.datosEmpresaService.updateDatosEmpresa(this.datosEmpresa[0])
  }
  salir(){
    this.armarModelo()
    console.log(this.datosEmpresa[0])
    console.log(this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+'')[0])
    if(JSON.stringify(this.datosEmpresa) !== JSON.stringify(this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+''))){
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
  colorRiesgoCrediticio : string = "white"
  colorPoliticaPagos : string = "white"
  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
}
