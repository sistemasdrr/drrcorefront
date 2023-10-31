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

  codigoInforme : string | null = ''
  datosEmpresa : DatosEmpresa[] = []

  constructor(
    private dialog : MatDialog,
    private PaisService : PaisService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService : DatosEmpresaService
  ){
    this.filterReputacion = new Observable<Reputacion[]>()
    this.filterSituacionRuc = new Observable<SituacionRuc[]>()
    this.filterPersoneriaJuridica = new Observable<PersoneriaJuridica[]>()
    this.filterPais = new Observable<Pais[]>()
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }

  ngOnInit(){
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
      this.datosEmpresa = this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+'')
      const fecha1 = this.datosEmpresa[0].informeInvestigadoEl.split("/");
      if(fecha1){
        this.fechaInformeInvestigadoDate = new Date(parseInt(fecha1[2]), parseInt(fecha1[1])-1,parseInt(fecha1[0]))
      }
      const fecha2 = this.datosEmpresa[0].fechaConstitucion.split("/");
      if(fecha2){
        this.fechaConstitucionInformeDate = new Date(parseInt(fecha2[2]), parseInt(fecha2[1])-1,parseInt(fecha2[0]))
      }

      this.personeriaJuridicaInforme = this.datosEmpresa[0].personeriaJuridica
      this.situacionRucInforme = this.datosEmpresa[0].situacionRuc

      this.selectRiesgoCrediticio( this.datosEmpresa[0].riesgoCrediticio)
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

  ngOnDestroy(): void {
    console.log('Se destruyo el componente')
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
            this.datosEmpresa[0].comentarioIdentificacion = data.comentario_es;
            this.datosEmpresa[0].comentarioIdentificacionIng = data.comentario_en;
          break
          case 'comentarioReputacion':
            this.datosEmpresa[0].comentarioReputacion = data.comentario_es;
            this.datosEmpresa[0].comentarioReputacionIng = data.comentario_en;
          break
          case 'comentarioPrensa':
            this.datosEmpresa[0].comentarioPrensa = data.comentario_es;
            this.datosEmpresa[0].comentarioPrensaIng = data.comentario_en;
          break
        }
      }
    });
  }

  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.datosEmpresa[0].informeInvestigadoEl = this.formatDate(selectedDate);
    }
  }
  selectFechaConstitucion(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.datosEmpresa[0].fechaConstitucion = this.formatDate(selectedDate);
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

  selectIdioma(idioma : string){
    this.datosEmpresa[0].idioma = idioma
  }
  selectInstitucionInforme(institucionInforme : string){
    this.datosEmpresa[0].tipoInstitucion = institucionInforme
  }
  selectPersoneriaJuridica(personeriaJuridica : PersoneriaJuridica){
    console.log(personeriaJuridica)
    this.personeriaJuridicaInforme = personeriaJuridica
    this.datosEmpresa[0].personeriaJuridica = this.datosEmpresaService.getPersoneriaJuridica().filter(x => x.description == personeriaJuridica.description)[0]
  }
  selectSituacionRuc(situacionRuc : SituacionRuc){
    this.situacionRucInforme = situacionRuc
    this.datosEmpresa[0].situacionRuc = this.datosEmpresaService.getSituacionRuc().filter(x => x.description == situacionRuc.description)[0]
  }
  selectRiesgoCrediticio(riesgoCrediticio : string){
    this.datosEmpresa[0].riesgoCrediticio = riesgoCrediticio
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
    this.datosEmpresa[0].politicaPagos = politicaPagos
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
    this.datosEmpresa[0].reputacion = selectedReputacion
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
      this.datosEmpresa[0].pais = paisSeleccionadoObj;
      this.iconoSeleccionado = paisSeleccionadoObj.icono;
    }
  }
  cambiarIcono(objPais : any){
    this.iconoSeleccionado = objPais.icono
  }
  //DATOS DE EMPRESA
  fechaInformeInvestigadoDate : Date = new Date()

  fechaConstitucionInformeDate : Date = new Date()



  guardar(){
    this.datosEmpresa[0].situacionRuc = this.situacionRucInforme
    this.datosEmpresa[0].personeriaJuridica = this.personeriaJuridicaInforme
    console.log(this.datosEmpresa[0])
    this.datosEmpresaService.updateDatosEmpresa(this.datosEmpresa[0])
  }
  salir(){
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
  }

  //GAUGE
  gaugeRiesgoCrediticio = 0

  colorRiesgoCrediticio : string = "white"
  colorPoliticaPagos : string = "white"

  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
}
