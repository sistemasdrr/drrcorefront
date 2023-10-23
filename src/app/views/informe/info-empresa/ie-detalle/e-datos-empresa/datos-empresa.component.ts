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
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';

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
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit, OnDestroy{
  calificacionCrediticia : string[] = [
    "",
    "A+ : SIN RIESGO (Solventes, Situación Financiera Muy Buena)",
    "A- : RIESGO MINIMO (Solventes, Situación Financiera Satisfactoria)",
    "B : RIESGO MODERADO (Situación Financiera Levemente Extendida)",
    "C : RIESGO ALTO (Situación Extendida. Se recomienda garantía colateral)",
    "D : RIESGO MUY ALTO (Situación Financiera Pesada. Pérdidas)",
    "E : RIESGO MUY ALTO (Inoperativa o Liquidad o Quebrada)",
    "NN : RIESGO INDETERMINADO (Información Insuficiente o Inexistente)"
  ]
  politicaPagos : string[] = [
    "",
    "1. EXCELENTES PAGADORES (Pagan siempre a tiempo o antes)",
    "2. PUNTUALES (Pagos siempre a tiempo. Varios años)",
    "3. IRREGULARES (Pagos puntuales y a veces demorados)",
    "4. MOROSOS (Demoras constantes, Incumplidos, Protestos)",
    "5. ND (No se pudo determinar Política de Pagos al momento. Nuevos)",
    "6. NC (No se le reporta Notas en Contra. Se presume buen cumplimiento)",
    "7. NN (Carece de información crediticia. No son conocidos por consultados)"
  ]

  controlReputacion = new FormControl<string | Reputacion>('');

  controlSituacionRUC = new FormControl<string | SituacionRuc>('');
  controlPersoneriaJuridica = new FormControl<string | PersoneriaJuridica>('');
  controlPaises = new FormControl<string | Pais>('')

  paises : Pais[] = []
  filterPais : Observable<Pais[]>

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

  codigoInforme : string | null = ''
  private datosEmpresa : DatosEmpresa[] = []


  constructor(
    private dialog : MatDialog,
    private PaisService : PaisService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService : DatosEmpresaService
  ) {
    console.log('se abrio datos de empresa')

    this.filterReputacion = new Observable<Reputacion[]>()
    this.filterSituacionRuc = new Observable<SituacionRuc[]>()
    this.filterPersoneriaJuridica = new Observable<PersoneriaJuridica[]>()
    this.filterPais = new Observable<Pais[]>()
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }
  ngOnInit() {
    this.paises = this.PaisService.getPaises()

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

        this.fechaInformeInvestigado = this.datosEmpresa[0].informeInvestigadoEl
        const fecha1 = this.fechaInformeInvestigado.split("/");
        if(fecha1){
          this.fechaInformeInvestigadoDate = new Date(parseInt(fecha1[2]), parseInt(fecha1[1])-1,parseInt(fecha1[0]))
        }
        this.idiomaInforme = this.datosEmpresa[0].idioma
        this.tipoInstitucionInforme = this.datosEmpresa[0].tipoInstitucion
        this.anioFundacionInforme = this.datosEmpresa[0].yFundacion + ''
        this.razonSocialInforme = this.datosEmpresa[0].razonSocial
        this.nombreComercialInforme = this.datosEmpresa[0].nombreComercial
        this.fechaConstitucionInforme = this.datosEmpresa[0].fechaConstitucion
        const fecha2 = this.fechaConstitucionInforme.split("/");
        if(fecha2){
          this.fechaConstitucionInformeDate = new Date(parseInt(fecha2[2]), parseInt(fecha2[1])-1,parseInt(fecha2[0]))
        }
        this.personeriaJuridicaInforme = this.datosEmpresa[0].personeriaJuridica
        this.tipoRegistroTributarioInforme = this.datosEmpresa[0].tipoRuc
        this.codigoRegistroTributarioInforme = this.datosEmpresa[0].codigoRuc
        this.situacionRucInforme = this.datosEmpresa[0].situacionRuc
        this.direccionCompletaInforme = this.datosEmpresa[0].direccionCompleta
        this.duracion = this.datosEmpresa[0].duracion
        this.dptoEstadoInforme = this.datosEmpresa[0].dptoEstado
        this.paisInforme = this.datosEmpresa[0].pais
        this.codigoTelefonoFijoInforme = this.datosEmpresa[0].codigoTelefono
        this.telefonoFijoInforme = this.datosEmpresa[0].numeroTelefono
        this.celularInforme = this.datosEmpresa[0].numeroCelular
        this.codPostalInforme = this.datosEmpresa[0].codPostal
        this.whatsappInforme = this.datosEmpresa[0].whatsappEmpresarial
        this.emailInforme = this.datosEmpresa[0].emailCorporativo
        this.paginaWebInforme = this.datosEmpresa[0].paginaWeb
        this.riesgoCrediticioInforme = this.datosEmpresa[0].riesgoCrediticio
        this.selectRiesgoCrediticio(this.riesgoCrediticioInforme)
        this.politicaPagosInforme = this.datosEmpresa[0].politicaPagos
        this.reputacionInforme = this.datosEmpresa[0].reputacion
        this.comentarioIdentificacion = this.datosEmpresa[0].comentarioIdentificacion
        this.comentarioIdentificacionIng = this.datosEmpresa[0].comentarioIdentificacionIng
        this.comentarioReputacionInforme = this.datosEmpresa[0].comentarioReputacion
        this.comentarioReputacionIngInforme = this.datosEmpresa[0].comentarioReputacionIng
        this.comentarioPrensaInforme = this.datosEmpresa[0].comentarioPrensa
        this.comentarioPrensaIngInforme = this.datosEmpresa[0].comentarioPrensaIng
      }
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
          this.comentarioIdentificacion = data.comentario_es;
          this.comentarioIdentificacionIng = data.comentario_en;
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
      this.fechaInformeInvestigado = this.formatDate(selectedDate);
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

  //TITULOS

  tituloComentarioIdentificacion : string = 'Comentario de Identificación'
  tituloComentarioReputacion : string = 'Comentario de Reputación'
  tituloComentarioPrensa : string = 'Comentario de Prensa'

  selectIdioma(idioma : string){
    this.idiomaInforme = idioma
  }
  selectInstitucionInforme(intitucionInforme : string){
    this.tipoInstitucionInforme = intitucionInforme
  }
  selectPersoneriaJuridica(personeriaJuridica : string){
    this.personeriaJuridicaInforme = personeriaJuridica
  }
  selectSituacionRuc(situacionRuc : string){
    this.situacionRucInforme = situacionRuc
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
      this.paisInforme = paisSeleccionadoObj.id+'';
      this.iconoSeleccionado = paisSeleccionadoObj.icono;
    }
  }
  cambiarIcono(objPais : any){
    this.iconoSeleccionado = objPais.icono
  }
  //DATOS DE EMPRESA
  fechaInformeInvestigado : string = ""
  fechaInformeInvestigadoDate : Date = new Date()

  idiomaInforme : string = ""
  tipoInstitucionInforme : string = ""
  anioFundacionInforme : string = ""
  razonSocialInforme : string = ""
  nombreComercialInforme : string = ""
  fechaConstitucionInforme : string = ""
  fechaConstitucionInformeDate : Date = new Date()

  personeriaJuridicaInforme : string | PersoneriaJuridica = ""
  tipoRegistroTributarioInforme : string = ""
  codigoRegistroTributarioInforme : string = ""
  situacionRucInforme : string | SituacionRuc = ""
  direccionCompletaInforme : string = ""
  duracion : string = ""
  dptoEstadoInforme : string = ""
  paisInforme : string | Pais = ""
  codigoTelefonoFijoInforme : string = ""
  telefonoFijoInforme : string = ""
  celularInforme : string = ""
  codPostalInforme : string = ""
  whatsappInforme : string = ""
  emailInforme : string = ""
  paginaWebInforme : string = ""
  riesgoCrediticioInforme : string = ""
  politicaPagosInforme : string = ""
  reputacionInforme : string = ""
  comentarioIdentificacion : string = ""
  comentarioIdentificacionIng : string = ""
  comentarioReputacionInforme : string = ""
  comentarioReputacionIngInforme : string = ""
  comentarioPrensaInforme : string = ""
  comentarioPrensaIngInforme : string = ""

  guardar(){
    console.log(this.fechaInformeInvestigado)
    console.log(this.idiomaInforme)
    console.log(this.tipoInstitucionInforme)
    console.log(this.anioFundacionInforme)
    console.log(this.razonSocialInforme)
    console.log(this.nombreComercialInforme)
    console.log(this.fechaConstitucionInforme)
    console.log(this.personeriaJuridicaInforme)
    console.log(this.tipoRegistroTributarioInforme)
    console.log(this.codigoRegistroTributarioInforme)
    console.log(this.situacionRucInforme)
    console.log(this.direccionCompletaInforme)
    console.log(this.duracion)
    console.log(this.dptoEstadoInforme)
    console.log(this.paisInforme)
    console.log(this.codigoTelefonoFijoInforme)
    console.log(this.telefonoFijoInforme)
    console.log(this.celularInforme)
    console.log(this.codPostalInforme)
    console.log(this.whatsappInforme)
    console.log(this.emailInforme)
    console.log(this.paginaWebInforme)
    console.log(this.riesgoCrediticioInforme)
    console.log(this.politicaPagosInforme)
    console.log(this.reputacionInforme)
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
