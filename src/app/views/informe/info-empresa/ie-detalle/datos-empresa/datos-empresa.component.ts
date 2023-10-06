import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import { HistoricoPedidosComponent } from './historico-pedidos/historico-pedidos.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface data {
  name: string;
}


@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit{

  situacionRUC : string[] = [
    "Activa", "Baja de Oficio", "Baja Definitiva","Baja Provisional",
    "Cambio de Razón Social","Declarada en Quiebra","Disuelta",
    "En Liquidación","Fusionada","Inactiva","Informe de Prueba",
    "Inmovilizada Judicialmente","No Localizada con ese Nombre",
    "Solo para Lectura","Suspensión Definitiva","Suspensión Temporal"
  ]
  personeriaJuridica : string[] = [
    "Sociedad de Hecho","Sociedad de Producción Rural","Sociedad de Producción Rural de Resp. Ltda. de Cap. Variable",
    "Sociedad de Producción Rural de Resp. Ilimitada","Sociedad de Producción Rural de Resp. Limitada",
    "Sociedad de Responsabilidad Limitada","Sociedad de Responsabilidad Limitada de Cap. Variable",
    "Sociedad de Responsabilidad Limitada Microindustrial","Sociedad del Estado"
  ]
  calificacionCrediticia : string[] = [
    "A+: SIN RIESGO (Solventes, Situación Financiera Muy Buena)",
    "A-: RIESGO MINIMO (Solventes, Situación Financiera Satisfactoria)",
    "B: RIESGO MODERADO (Situación Financiera Levemente Extendida)",
    "C: RIESGO ALTO (Situación Extendida, Se recomienda Garantía Colateral)",
    "D: RIESGO MUY ALTO (Situación Financiera Pesada. Pérdidas)",
    "E: RIESGO MUY ALTO (Inoperativa o Liquidad o Quebrada)",
    "NN: RIESGO INDETERMINADO (Información Insuficiente o Inexistente)"
  ]
  politicaPagos : string[] = [
    "1. EXCELENTES PAGADORES (Pagan siempre a tiempo o antes)",
    "2. PUNTUALES (Pagan siempre a tiempo, varios años)",
    "3. IRREGULARES (Pagos puntuales y a veces demorados)",
    "4. MOROSOS (Demoras constantes, Incumplidos, Protestos)",
    "5. ND (No se pudo determinar Política de Pagos al momento. Nuevos)",
    "6. NC (No se le reporta Notas en Contra. Se presume buen cumplimiento)",
    "7. NN (Carece de información crediticia. No son conocidos por consultados)"
  ]
  reputaciones : string[] = [
    "Buena Solvencia Económica y Moral.","Referidos como Buenos Contribuyentes (SUNAT).",
    "Empresa de buen prestigio.","Aparecen en Lista Clinton.","Faltaron el Respeto a nuesto Analista. Mala conducta.",
    "No reportan a los verdaderos accionistas (OFFSHORE)","Registra Cta. Cte. Cerrada x girar cheques sin fondo.",
    "Empresa poco transparente. Cuidado.","Reputación discutible (Publicaciones)"
  ]


  myControl = new FormControl<string | data>('');
  options: data[] = [{name: '112'}, {name: '113'}, {name: '114'}, {name: '115'}, {name: '116'}, {name: '117'}, {name: '118'}, {name: '119'}];
  filteredOptions: Observable<data[]>;
constructor(
  private dialog : MatDialog,
  private PaisService : PaisService,
) {
  this.filteredOptions = new Observable<data[]>();
  this.paises = this.PaisService.getPaises()

}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: data): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  agregarComentario(titulo1 : string, titulo2 : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo1 : titulo1,
      titulo2 : titulo2,
      subtitulo : subtitulo,
      empresa: empresa,
      },
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaInformeInvestigado = this.formatDate(selectedDate);
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
  titulo : string = 'Comentario - Traduccion'

  tituloComentarioIdentificacion : string = 'Comentario - Traduccion || Comentario de Identificación En => '
  tituloComentarioReputacion : string = 'Comentario - Traduccion || Comentario de Reputación En => '
  tituloComentarioPrensa : string = 'Comentario - Traduccion || Comentario de Prensa En => '

  selectIdioma(idioma : string){
    this.idiomaInforme = idioma
  }
  selectInstitucionInforme(intitucionInforme : string){
    this.tipoIntitucionInforme = intitucionInforme
  }
  selectPersoneriaJuridica(personeriaJuridica : string){
    this.personeriaJuridicaInforme = personeriaJuridica
  }
  selectSituacionRuc(situacionRuc : string){
    this.situacionRucInforme = situacionRuc
  }
  selectRiesgoCrediticio(riesgoCrediticio : string){
    this.riesgoCrediticioInforme = riesgoCrediticio
  }
  selectPoliticaPagos(politicaPagos : string){
    this.politicaPagosInforme = politicaPagos
  }
  selectReputacion(reputacion : string){
    this.reputacionInforme = reputacion
  }

  paises : Pais[] = []

  iconoSeleccionado: string = ""
  actualizarSeleccionPais(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisInforme = paisSeleccionadoObj.id;
      this.iconoSeleccionado = paisSeleccionadoObj.icono;
    }
  }
  //DATOS DE EMPRESA
  fechaInformeInvestigado : string = ""
  idiomaInforme : string = ""
  tipoIntitucionInforme : string = ""
  anioFundacionInforme : string = ""
  razonSocialInforme : string = ""
  nombreComercialInforme : string = ""
  personeriaJuridicaInforme : string = ""
  tipoRegistroTributarioInforme : string = ""
  codigoRegistroTributarioInforme : string = ""
  situacionRucInforme : string = ""
  direccionCompletaInforme : string = ""
  dptoEstadoInforme : string = ""
  paisInforme : number = 0
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

  guardar(){
    console.log(this.fechaInformeInvestigado)
    console.log(this.idiomaInforme)
    console.log(this.tipoIntitucionInforme)
    console.log(this.anioFundacionInforme)
    console.log(this.razonSocialInforme)
    console.log(this.nombreComercialInforme)
    console.log(this.personeriaJuridicaInforme)
    console.log(this.tipoRegistroTributarioInforme)
    console.log(this.codigoRegistroTributarioInforme)
    console.log(this.situacionRucInforme)
    console.log(this.direccionCompletaInforme)
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
}
