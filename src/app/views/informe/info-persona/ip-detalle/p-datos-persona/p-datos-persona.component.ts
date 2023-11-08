import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import { HistoricoPedidosComponent } from 'app/views/informe/info-empresa/ie-detalle/e-datos-empresa/historico-pedidos/historico-pedidos.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';

export interface data {
  name: string;
}
export interface SituacionRuc {
  id : number
  description : string
}
export interface PersoneriaJuridica {
  id : number
  description : string
}
export interface Reputacion {
  id : number
  description : string
}


@Component({
  selector: 'app-p-datos-persona',
  templateUrl: './p-datos-persona.component.html',
  styleUrls: ['./p-datos-persona.component.scss']
})
export class PDatosPersonaComponent implements OnInit{
  calificacionCrediticia : string[] = [
    "",
    "A+: SIN RIESGO (Solventes, Situación Financiera Muy Buena)",
    "A-: RIESGO MINIMO (Solventes, Situación Financiera Satisfactoria)",
    "B: RIESGO MODERADO (Situación Financiera Levemente Extendida)",
    "C: RIESGO ALTO (Situación Extendida, Se recomienda Garantía Colateral)",
    "D: RIESGO MUY ALTO (Situación Financiera Pesada. Pérdidas)",
    "E: RIESGO MUY ALTO (Inoperativa o Liquidad o Quebrada)",
    "NN: RIESGO INDETERMINADO (Información Insuficiente o Inexistente)"
  ]
  politicaPagos : string[] = [
    "",
    "1. EXCELENTES PAGADORES (Pagan siempre a tiempo o antes)",
    "2. PUNTUALES (Pagan siempre a tiempo, varios años)",
    "3. IRREGULARES (Pagos puntuales y a veces demorados)",
    "4. MOROSOS (Demoras constantes, Incumplidos, Protestos)",
    "5. ND (No se pudo determinar Política de Pagos al momento. Nuevos)",
    "6. NC (No se le reporta Notas en Contra. Se presume buen cumplimiento)",
    "7. NN (Carece de información crediticia. No son conocidos por consultados)"
  ]

  controlReputacion = new FormControl<string | Reputacion>('');
  reputaciones : Reputacion[] = [
    {
      id : 0,
      description : ""
    },
    {
      id : 1,
      description : "NADA EN SU CONTRA FUE LOCALIZADO."
    },
    {
      id : 2,
      description : "Buena Solvencia Económica y Moral."
    },
    {
      id : 3,
      description : "Referidos como Buenos Contribuyentes (SUNAT)."
    },
    {
      id : 4,
      description : "Empresa de buen prestigio."
    },
    {
      id : 5,
      description : "Aparecen en Lista Clinton."
    },
    {
      id : 6,
      description : "Faltaron el Respeto a nuesto Analista. Mala conducta."
    },
    {
      id : 7,
      description : "No reportan a los verdaderos accionistas (OFFSHORE)"
    },
    {
      id : 8,
      description : "Registra Cta. Cte. Cerrada x girar cheques sin fondo."
    },
    {
      id : 9,
      description : "Empresa poco transparente. Cuidado."
    },
    {
      id : 10,
      description : "Reputación discutible (Publicaciones)"
    },
  ]
  filterReputacion: Observable<Reputacion[]>

  controlSituacionRUC = new FormControl<string | SituacionRuc>('');
  controlPersoneriaJuridica = new FormControl<string | PersoneriaJuridica>('');

  situacionRuc : SituacionRuc[] = [
    {
      id : 1,
      description : "Activa"
    },
    {
      id : 2,
      description : "Baja de Oficio"
    },
    {
      id : 3,
      description : "Baja Definitiva"
    },
    {
      id : 4,
      description : "Baja Provisional"
    },
    {
      id : 5,
      description : "Cambio de Razón Social"
    },
    {
      id : 6,
      description : "Declarada en Quiebra"
    },
    {
      id : 7,
      description : "Disuelta"
    },
    {
      id : 8,
      description : "En Liquidación"
    },
    {
      id : 9,
      description : "Fusionada"
    },
    {
      id : 10,
      description : "Inactiva"
    },
    {
      id : 11,
      description : "Informe de Prueba"
    },
    {
      id : 12,
      description : "Inmovilizada Judicialmente"
    },
    {
      id : 13,
      description : "No Localizada con ese Nombre"
    },
    {
      id : 14,
      description : "Solo para Lectura"
    },
    {
      id : 15,
      description : "Suspensión Definitiva"
    },
    {
      id : 16,
      description : "Suspensión Temporal"
    },
  ]
  filterSituacionRuc: Observable<SituacionRuc[]>

  personeriaJuridica : PersoneriaJuridica[] = [
    {
      id : 1,
      description : "Sociedad de Hecho"
    },
    {
      id : 2,
      description : "Sociedad de Producción Rural"
    },
    {
      id : 3,
      description : "Sociedad de Producción Rural de Resp. Ltda. de Cap. Variable"
    },
    {
      id : 4,
      description : "Sociedad de Producción Rural de Resp. Ilimitada"
    },
    {
      id : 5,
      description : "Sociedad de Producción Rural de Resp. Limitada"
    },
    {
      id : 6,
      description : "Sociedad de Responsabilidad Limitada"
    },
    {
      id : 7,
      description : "Sociedad de Responsabilidad Limitada de Cap. Variable"
    },
    {
      id : 8,
      description : "Sociedad de Responsabilidad Limitada Microindustrial"
    },
    {
      id : 9,
      description : "Sociedad del Estado"
    },
  ]
  filterPersoneriaJuridica : Observable<PersoneriaJuridica[]>

constructor(
  private dialog : MatDialog,
  private paisService : PaisService,
) {
  this.filterReputacion = new Observable<Reputacion[]>()
  this.filterSituacionRuc = new Observable<SituacionRuc[]>()
  this.filterPersoneriaJuridica = new Observable<PersoneriaJuridica[]>()
  this.paisService.getPaises().subscribe(data => {
    this.paises = data;
  });
}
  ngOnInit() {
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
  displayReputacion(reputacion : Reputacion): string {
    return reputacion && reputacion.description ? reputacion.description : '';
  }
  displaySituacionRuc(situacionRuc : SituacionRuc): string {
    return situacionRuc && situacionRuc.description ? situacionRuc.description : '';
  }
  displayPersoneriaJuridica(personeriaJuridica : PersoneriaJuridica): string {
    return personeriaJuridica && personeriaJuridica.description ? personeriaJuridica.description : '';
  }



  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo : titulo,
      subtitulo : subtitulo,
      comentario_es : comentario_es,
      comentario_en : comentario_en,
      },
    });
  }

  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaInformeInvestigado = this.formatDate(selectedDate);
    }
  }
  selectFechaConstitucion(event: MatDatepickerInputEvent<Date>) {

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
    this.idiomaInforme = idioma
  }
  selectInstitucionInforme(intitucionInforme : string){
    this.tipoIntitucionInforme = intitucionInforme
  }
  selectPersoneriaJuridica(personeriaJuridica : string){
  }
  selectSituacionRuc(situacionRuc : string){
  }
  selectRiesgoCrediticio(riesgoCrediticio : string){
    this.riesgoCrediticioInforme = riesgoCrediticio
    console.log(riesgoCrediticio)

    if(riesgoCrediticio == ""){
      this.gaugeRiesgoCrediticio = 0
      this.colorRiesgoCrediticio = "white"
      this.calificacionRiesgoCrediticio = ""
      this.descripcionRiesgoCrediticio = ""
    }else if(riesgoCrediticio.includes("A+:")){
      this.gaugeRiesgoCrediticio = 600
      this.colorRiesgoCrediticio = "green"
      this.calificacionRiesgoCrediticio = "A+"
      this.descripcionRiesgoCrediticio = "Sin Riesgo"
    }else if(riesgoCrediticio.includes("A-:")){
      this.gaugeRiesgoCrediticio = 500
      this.colorRiesgoCrediticio = "#64f584"
      this.descripcionRiesgoCrediticio = "Riesgo Mínimo"
      this.calificacionRiesgoCrediticio = "A-"
    }else if(riesgoCrediticio.includes("B:")){
      this.gaugeRiesgoCrediticio = 400
      this.colorRiesgoCrediticio = "yellow"
      this.descripcionRiesgoCrediticio = "Riesgo Moderado"
      this.calificacionRiesgoCrediticio = "B"
    }else if(riesgoCrediticio.includes("C:")){
      this.gaugeRiesgoCrediticio = 300
      this.colorRiesgoCrediticio = "orange"
      this.descripcionRiesgoCrediticio = "Riesgo Alto"
      this.calificacionRiesgoCrediticio = "C"
    }else if(riesgoCrediticio.includes("D:")){
      this.gaugeRiesgoCrediticio = 200
      this.colorRiesgoCrediticio = "red"
      this.descripcionRiesgoCrediticio = "Riesgo Muy Alto"
      this.calificacionRiesgoCrediticio = "D"
    }else if(riesgoCrediticio.includes("E:")){
      this.gaugeRiesgoCrediticio = 100
      this.colorRiesgoCrediticio = "black"
      this.descripcionRiesgoCrediticio = "Riesgo Muy Alto"
      this.calificacionRiesgoCrediticio = "E"
    }else if(riesgoCrediticio.includes("NN:")){
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
      this.booleanExplicarDatosMalaReputacion = false
    }else if(selectedReputacion.id > 0 && selectedReputacion.id <= 4){
      this.colorReputacion = "green"
      this.booleanExplicarDatosMalaReputacion = false
    }else if(selectedReputacion.id > 4){
      this.colorReputacion = "red"
      this.booleanExplicarDatosMalaReputacion = true
    }
  }


  paises : Pais[] = []

  iconoSeleccionado: string = ""
  actualizarSeleccionPais(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisInforme = paisSeleccionadoObj.id;
      this.iconoSeleccionado = paisSeleccionadoObj.bandera;
    }
  }
  //DATOS DE EMPRESA
  fechaInformeInvestigado : string = ""
  idiomaInforme : string = ""
  tipoIntitucionInforme : string = ""
  fechaInforme : string = ""
  apellidosNombresInforme : string = ""
  nacionalidadInforme : string = ""
  nacionalidadIngInforme : string = ""
  nacidoElInforme : string = ""
  nacidoElIngInforme : string = ""
  nacidoEnInforme : string = ""
  tipoDocumentoInforme : string = ""
  codigoDocumentoInforme : string = ""
  registroTributarioInforme : string = ""
  situacionInforme : string = ""

  direccionCompletaInforme : string = ""
  CPInforme : string = ""
  DptoEstadoInforme : string = ""
  otrasDireccionesInforme : string = ""
  nombreComercialInforme : string = ""
  paisInforme : number = 0
  codigoTelefonoInforme : string = ""
  telefonoInforme : string = ""

  estadoCivilInforme : string = ""
  relacionCivilConInforme : string = ""
  relacionCivilConIngInforme : string = ""
  dniInforme : string = ""
  nombrePadreInforme : string = ""
  nombreMadreInforme : string = ""
  emailInforme : string = ""
  celularInforme : string = ""
  profesionInforme : string = ""
  profesionIngInforme : string = ""
  socioClubInforme : string = ""
  segurosInforme : string = ""

  riesgoCrediticioInforme : string = ""
  politicaPagosInforme : string = ""
  reputacionInforme : string = ""
  explicarDatosMalaReputacion : string = ""
  booleanExplicarDatosMalaReputacion : boolean = false
  comentarioReputacionInforme : string = ""

  comentarioReputacionIngInforme : string = ""
  comentarioPrensaInforme : string = ""
  comentarioPrensaIngInforme : string = ""

  guardar(){
    console.log(this.fechaInformeInvestigado)
    console.log(this.idiomaInforme)
    console.log(this.tipoIntitucionInforme)
    console.log(this.direccionCompletaInforme)
  }

  //GAUGE
  gaugeRiesgoCrediticio = 0

  colorRiesgoCrediticio : string = "white"
  colorPoliticaPagos : string = "white"

  calificacionRiesgoCrediticio = ""
  descripcionRiesgoCrediticio = ""
  colorReputacion = "white"
}
