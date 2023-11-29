import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { HistoricoVentasService } from '../../../../../services/informes/historico-ventas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoVentas } from 'app/models/informes/historico-ventas';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { BalanceSituacionalComponent } from './balance-situacional/balance-situacional.component';

export interface data {
  name: string;
}

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  constructor(
    private historicoVentasService : HistoricoVentasService,
    private dialog : MatDialog
  ){
    this.filteredOptions = new Observable<data[]>();
  }

  entrevistado : string = ""
  cargos : string = "cargos esp"
  cargosIng : string = "cargos es"
  gradoColaboracion : string = ""
  comentarioEntrevista : string = ""
  comentarioEntrevistaIng : string = ""
  auditores : string = ""
  situacionFinanciera: string = ""
  principalesActivos : string = ""
  principalesActivosIng : string = ""
  comentarioFinancieroElegido : string = ""
  comentarioFinancieroElegidoIng : string = ""
  comentarioAnalista : string = ""
  comentarioAnalistaIng : string = ""
  riesgoCrediticio : string = ""
  comentarioConBalance : string = "comentario con balance"
  comentarioSinBalance : string = "comentario sin balance"
  comentarioElegido : string = ""
  comentarioElegidoIng : string = ""
  checkComentarioConBalance : boolean = false
  checkComentarioSinBalance : boolean = false

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [
    {name: 'A. Excelente. Proporcionaron amplios datos y cifras.'},
    {name: 'A. Buena. Colaboraron dando toda la información disponible.'},
    {name: 'B. Moderada. Dieron y/o confirmaron algunos datos y cifras.'},
    {name: 'C. Pobre. Entregaron muy poca información cortésmente.'},
    {name: 'D. Declinaron dar información por motivos de seguridad y/o competencia.'},
    {name: 'D. Declinaron dar información por querer saber quien pide el informe.'},
    {name: 'D. Declinaron dar información sin dar mayor explicación.'},
    {name: 'D. Declinaron dar información de manera muy descortés.'},
    {name: 'D. Declinaron dar información por NO tener autorización para ello.'},
    {name: 'TF: Se logro preparar el informe exclusivamente por terceros'},
  ];
  filteredOptions: Observable<data[]>;

  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.dataSourceHistoricoVentas = new MatTableDataSource(this.historicoVentasService.GetAllHistoricoVentas())

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

  elegirComentarioConBalance(){
    if(this.checkComentarioConBalance == true){
      this.comentarioElegido = this.comentarioConBalance
      this.checkComentarioSinBalance = false
    }else if(this.checkComentarioConBalance == false){
      this.comentarioElegido = ""
    }
  }
  elegirComentarioSinBalance(){
    if(this.checkComentarioSinBalance == true){
      this.comentarioElegido = this.comentarioSinBalance
      this.checkComentarioConBalance = false
    }else if(this.checkComentarioSinBalance == false){
      this.comentarioElegido = ""
    }
  }

  //TABLA HISTORICO VENTAS
  dataSourceHistoricoVentas = new MatTableDataSource<HistoricoVentas>
  columnToDisplayHistoricoVentas : string[] = [
    "id","fecha","moneda","ventasMN","TC","equivaleDolar","accion"
  ]

  agregarHistoricoVentas(){
    const dialogR1 = this.dialog.open(HistoricoVentasComponent, {
      data: {
        accion : 'AGREGAR',
        id : 0
        },
      });
      dialogR1.afterClosed().subscribe(() => {
        this.dataSourceHistoricoVentas = new MatTableDataSource(this.historicoVentasService.GetAllHistoricoVentas())
      });
  }
  editarHistoricoVentas(id : number){
    const dialogR2 = this.dialog.open(HistoricoVentasComponent, {
      data: {
        accion : 'EDITAR',
        id : id
        },
      });
      dialogR2.afterClosed().subscribe(() => {
        this.dataSourceHistoricoVentas = new MatTableDataSource(this.historicoVentasService.GetAllHistoricoVentas())
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
          case 'cargos':
          this.cargos = data.comentario_es;
          this.cargosIng = data.comentario_en;
          break
        }
      }
    });
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
          case 'comentarioEntrevista':
          this.comentarioEntrevista = data.comentario_es;
          this.comentarioEntrevistaIng = data.comentario_en;
          break
          case 'principalesActivos':
          this.principalesActivos = data.comentario_es;
          this.principalesActivosIng = data.comentario_en;
          break
          case 'comentarioElegido':
          this.comentarioElegido = data.comentario_es;
          this.comentarioElegidoIng = data.comentario_en;
          break
          case 'comentarioAnalista':
          this.comentarioAnalista = data.comentario_es;
          this.comentarioAnalistaIng = data.comentario_en;
          break

        }
      }
    });
  }
  balanceSituacional(idInforme : number) {
    const dialogRef = this.dialog.open(BalanceSituacionalComponent, {
      data : idInforme,
    });
  }
  selectSituacionFinanciera(situacionFinanciera : string){
    this.situacionFinanciera = situacionFinanciera
    console.log(situacionFinanciera)
    if(situacionFinanciera == ''){
      this.comentarioConBalance = ''
      this.comentarioSinBalance = ''
    }else if(situacionFinanciera == 'A+: Situación Financiera MUY BUENA.'){
      this.comentarioConBalance = 'De acuerdo con el último Estado Financiero presentado y otros factores analizados, estimamos que la Situación Financiera de la titular es MUY BUENA, por lo siguiente: \n\n- Su buen índice de liquidez es superior o similar al promedio del sector, su Capital de Trabajo es positivo y permite un cumplimiento ordenado de sus pagos, El Patrimonio, cubre sus deudas corrientes con amplitud. Sus resultados operativos son positivos. Buena rentabilidad.'
      this.comentarioSinBalance = 'A pesar de no contar con Estados Financieros, los resultados económicos y financieros que se comenta,  han sido satisfactorios,  La tendencia de la empresa es positiva., El respaldo económico de sus propietarios es importante. Pagos puntuales. Nada en contra'
    }
    else if(situacionFinanciera == 'A-: Situación Financiera BUENA.'){
      this.comentarioConBalance = 'De acuerdo con el último Estado Financiero presentado y otros factores analizados, estimamos que la Situación Financiera de la titular es  BUENA, por lo siguiente: \n\n- El Índice de Liquidez es aceptable, el Capital de Trabajo tiene un margen positivo, Su Patrimonio cubre aceptablemente sus pasivos y sus resultados son moderados. Pagan bien.'
      this.comentarioSinBalance = 'A pesar de no contar con Estados Financieros disponibles, nos refieren que la empresa cuenta con respaldo económico de sus propietarios. Es de público conocimiento que la empresa opera sin mayores problemas. Cumple bien con sus obligaciones. Nada en contra.'
    }
    else if(situacionFinanciera == 'B: Situación Financiera ACEPTABLE.'){
      this.comentarioConBalance = 'De acuerdo con el último Estado Financiero que nos han presentado y otros factores analizados, estimamos que la Situación Financiera de la empresa es ACEPTABLE, por lo siguiente: \n\n- Cuentan con un Índice de liquidez y Capital de trabajo moderado. Presenta un endeudamiento algo superior a sus cuentas patrimoniales, pero sus resultados operacionales son aceptables. Presentan épocas de corta liquidez. Sus Pagos algo irregulares, pero cumple.'
      this.comentarioSinBalance = 'A pesar de no contar con estados financieros disponibles, pudimos conocer que el cumplimiento de pagos es referido de Puntual a irregular en ocasiones. La solvencia de los propietarios es satisfactoria. Cuenta con amplia competencia que está mejor posicionada. Sus resultados operativos solo aceptables.'
    }
    else if(situacionFinanciera == 'C: Situación Financiera DEFICIENTE.'){
      this.comentarioConBalance = 'De acuerdo con su último Estado Financiero que hemos obtenido y otros factores analizados, estimamos que  la Situación Financiera de la empresa es DEFICIENTE, por lo siguiente:\n\n- El Índice de liquidez es muy corto. El Capital de Trabajo es ligeramente negativo lo que ocasiona que su liquidez sea muy escasa. Patrimonio negativo. Resultados limitados. Pagos irregulares.'
      this.comentarioSinBalance = 'A pesar de no haber podido lograr Estados Financieros, los comentarios que hemos recogido en plaza indican que sus resultados son muy cortos o negativos y el endeudamiento es notoriamente alto,  Acusa constantes problemas crediticios. No se conoce solvencia de propietarios. Tener permanente observación.'
    }
    else if(situacionFinanciera == 'D: Situación Financiera PESADA.'){
      this.comentarioConBalance = 'De acuerdo con el último Estado Financiero obtenido  y otros factores analizados, podemos indicar que la Situación Financiera de la empresa es PESADA, por lo siguiente: \n\n- El Índice de liquidez es deficitario, El Capital de trabajo negativo. Su endeudamiento es muy superior a sus valores patrimoniales. Presenta resultados negativos al final del período y hay notoria falta de recursos económicos y financieros. Pagos morosos.'
      this.comentarioSinBalance = 'A pesar de no contar con estados financieros disponibles, hemos logrado conocer a través de consultados que la situación financiera de la titular es precaria, Las referencias comerciales son mayoritariamente negativas. Incluso suspensión de pagos.  Su futuro es comentado como incierto.'
    }
    else if(situacionFinanciera == 'ND: Situación Financiera NO DETERMINADA.'){
      this.comentarioConBalance = 'La Situación Financiera de la empresa la estimamos: INDETERMINADA en razón de no contar con Estados financieros que permitan un análisis certero de sus resultados en su último ejercicio. Las escasas cifras con las que se cuenta, no descubren su relación deuda/patrimonio.  No se conocen sus resultados operacionales finales. La escasa o poca experiencia crediticia no nos indica su real capacidad de liquidez al momento. Referencias comerciales muy escasas o nulas, no permiten determinar sus costumbres de pago. No hay mayor conocimiento de la solvencia de los dueños del negocio.\n\nEl hermetismo en las declaraciones de sus principales ejecutivos, derivadas de políticas internas  de confidencialidad, hace que se carezca de fuentes externas de consulta. Fuentes públicas y privadas no reportan mayores datos. Empresa poco transparente, sobre la cual se recomienda prudencia. Muy reservados. Garantías colaterales son recomendables.'
      this.comentarioSinBalance = ''
    }
    else if(situacionFinanciera == 'E: Situación Financiera MALA.'){
      this.comentarioConBalance = 'Empresa Inoperativa'
      this.comentarioSinBalance = ''
    }
  }

  titulo = 'Comentario - Traduccion'
  tituloActivos = 'Principales Activos Fijos de la Empresa '
  tituloCargo = 'Cargos de la Empresa '
  tituloComentarioEntrevista = 'Comentarios de la Entrevista'
  tituloComentarioFinanciero = 'Comentario Financiero'
  tituloComentarioAnalista = 'Comentarios del Analista'

  subtituloActivos = '(Inmuebles, Vehículos, etc. Detalle - Valor)'
}
