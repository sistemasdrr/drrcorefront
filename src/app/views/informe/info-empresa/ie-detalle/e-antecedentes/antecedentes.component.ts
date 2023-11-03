import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { EmpresaRelacionada } from 'app/models/informes/empresa-relacionada';
import { EmpresaRelacionadaService } from 'app/services/informes/empresa-relacionada.service';
import { Observable, map, startWith } from 'rxjs';
import { CapitalPagadoComponent } from './capital-pagado/capital-pagado.component';
import { ActivatedRoute } from '@angular/router';
import { AntecedentesLegalesService } from 'app/services/informes/empresa/antecedentes-legales.service';
import { AntecedentesLegales } from 'app/models/informes/empresa/antecendentes-legales';
import { Moneda } from 'app/models/informes/moneda';
import { MonedaService } from 'app/services/informes/moneda.service';

export interface data {
  name: string;
}

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent implements OnInit, OnDestroy{

  codigoInforme : string | null = ''
  antecedentesLegales : AntecedentesLegales[] = []
  //TABLA
  dataSource: MatTableDataSource<EmpresaRelacionada>;

  columnsToDisplay = ['razonSocial', 'registroTributario', 'pais', 'fechaEstablecimiento', 'estado', 'accion'];
  selection = new SelectionModel<EmpresaRelacionada>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  myControl = new FormControl<string | Moneda>('');
  listaMonedas : Moneda[] = []
  filteredOptions: Observable<Moneda[]>;
constructor(
  public dialog: MatDialog,
  private empresaRelacionadaService : EmpresaRelacionadaService,
  private activatedRoute: ActivatedRoute,
    private antecedentesLegalesService : AntecedentesLegalesService,
    private monedaService : MonedaService
  ) {
    this.filteredOptions = new Observable<Moneda[]>();
    this.dataSource = new MatTableDataSource<EmpresaRelacionada>
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }
  compararModelosF : any
  ngOnInit() {
    this.listaMonedas = this.monedaService.getMonedas()
    this.dataSource = new MatTableDataSource(this.empresaRelacionadaService.GetAllEmpresaRelacionada())

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.pais + ' - ' + value?.moneda;
        return name ? this._filter(name as string) : this.listaMonedas.slice();
      }),
    );

    if(this.codigoInforme !== 'nuevo'){
      const antecedentesLegales = this.antecedentesLegalesService.getAntecedentesLegales(this.codigoInforme+'')
      console.log(this.antecedentesLegales)
      this.fechaConstitucionInforme = antecedentesLegales[0].fechaConstitucion
      const fecha1 = this.fechaConstitucionInforme.split("/");
      if(fecha1){
        this.fechaConstitucionInformeDate = new Date(parseInt(fecha1[2]), parseInt(fecha1[1])-1,parseInt(fecha1[0]))
      }

      this.inicioActividadesInforme = antecedentesLegales[0].inicioActividades
      this.duracionInforme = antecedentesLegales[0].duracion
      this.duracionIngInforme = antecedentesLegales[0].duracionIng
      this.registradaEnInforme = antecedentesLegales[0].registradaEn
      this.registradaEnIngInforme = antecedentesLegales[0].registradaEnIng
      this.notariaInforme = antecedentesLegales[0].notaria
      this.registrosPublicosInforme = antecedentesLegales[0].registrosPublicos
      this.registrosPublicosIngInforme = antecedentesLegales[0].registrosPublicosIng
      this.comentarioAntecedentes = antecedentesLegales[0].comentarioAntecedentesLegales
      this.comentarioAntecedentesIng = antecedentesLegales[0].comentarioAntecedentesLegalesIng
      this.historialAntecedentes = antecedentesLegales[0].comentarioHistoriaAntecedentes
      this.historialAntecedentesIng = antecedentesLegales[0].comentarioHistoriaAntecedentesIng
      this.capitalPagadoMoneda = antecedentesLegales[0].monedaPais
      this.capitalPagadoMonto = antecedentesLegales[0].monto
      this.capitalPagadoObservacion = antecedentesLegales[0].observacion
      this.capitalPagadoObservacionIng = antecedentesLegales[0].observacionIng
      this.origenInforme = antecedentesLegales[0].origen
      this.fechaAumentoInforme = antecedentesLegales[0].fechaAumento
      this.fechaAumentoIngInforme = antecedentesLegales[0].fechaAumentoIng
      this.monedaPaisInforme = antecedentesLegales[0].moneda
      this.cotizadaEnBolsaInforme = antecedentesLegales[0].cotizada
      this.cotizadaEnBolsaPorInforme = antecedentesLegales[0].por
      this.actualTCInforme = antecedentesLegales[0].actualTC
      this.actualTCIngInforme = antecedentesLegales[0].actualTCIng
      this.fechaUltimaConsultaInforme = antecedentesLegales[0].fechaUltimaConsultaRRPP
      const fecha2 = this.fechaUltimaConsultaInforme.split("/");
      if(fecha2){
        this.fechaUltimaConsultaInformeDate = new Date(parseInt(fecha2[2]), parseInt(fecha2[1])-1,parseInt(fecha2[0]))
      }
      this.ultimaConsultaPorInforme = antecedentesLegales[0].fechaUltimaConsultaPor
    }
    this.compararModelosF = setInterval(() => {
      this.compararModelos();
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.compararModelosF)
  }

  compararModelos(){
    this.armarModelo()
    console.log(this.antecedentesLegales)
    console.log(this.antecedentesLegalesService.getAntecedentesLegales(this.codigoInforme+''))
    if(JSON.stringify(this.antecedentesLegales) !== JSON.stringify(this.antecedentesLegalesService.getAntecedentesLegales(this.codigoInforme+''))){
      const tabAntecedentes = document.getElementById('tab-antecedentes') as HTMLElement | null;
      if (tabAntecedentes) {
        tabAntecedentes.classList.add('tab-cambios')
      }
    }else{
      const tabAntecedentes = document.getElementById('tab-antecedentes') as HTMLElement | null;
      if (tabAntecedentes) {
        tabAntecedentes.classList.remove('tab-cambios')
      }
    }
  }

  displayFn(moneda: Moneda): string {
    return moneda && moneda.moneda ? moneda.moneda : '';
  }

  private _filter(name: string): Moneda[] {
    return this.listaMonedas.filter(option => option.moneda.toLowerCase().includes(name.toLowerCase()));
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
        case 'registrosPublicos':
        this.registrosPublicosInforme = data.comentario_es;
        this.registrosPublicosIngInforme = data.comentario_en;
        console.log(this.registrosPublicosInforme)
        break
        case 'fechaAumento':
          this.fechaAumentoInforme = data.comentario_es;
          this.fechaAumentoIngInforme = data.comentario_en;
        break
        case 'actualTC':
          this.actualTCInforme = data.comentario_es;
          this.actualTCIngInforme = data.comentario_en;
        break
        case 'comentarioAntecedentes':
          this.comentarioAntecedentes = data.comentario_es;
          this.comentarioAntecedentesIng = data.comentario_en;
        break
        case 'historiaAntecedentes':
          this.historialAntecedentes = data.comentario_es;
        this.historialAntecedentesIng = data.comentario_en;
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
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'duracion':
            this.duracionInforme = data.comentario_es;
            this.duracionIngInforme = data.comentario_en;
          break
          case 'registradaEn':
            this.registradaEnInforme = data.comentario_es;
            this.registradaEnIngInforme = data.comentario_en;
          break
          case 'registrosPublicos':
          this.registrosPublicosInforme = data.comentario_es;
          this.registrosPublicosIngInforme = data.comentario_en;
          break
          case 'historialAntecedentes':
           this.historialAntecedentes = data.comentario_es;
           this.historialAntecedentesIng = data.comentario_en;
           break
          case 'fechaAumento':
          this.fechaAumentoInforme = data.comentario_es;
          this.fechaAumentoIngInforme = data.comentario_en;
          break
          case 'actualTC':
          this.actualTCInforme = data.comentario_es;
          this.actualTCIngInforme = data.comentario_en;
          break
          case 'comentarioAntecedentes':
          this.comentarioAntecedentes = data.comentario_es;
          this.comentarioAntecedentesIng = data.comentario_en;
          break
          case 'historiaAntecedentes':
          this.historialAntecedentes = data.comentario_es;
          this.historialAntecedentesIng = data.comentario_en;
          break
        }
      }
    });
  }
  func(string : string, valor : string){
    string = valor
  }
  abrirCapitalPagado(){
    const dialogRef = this.dialog.open(CapitalPagadoComponent, {
      data : {
        moneda : this.capitalPagadoMoneda,
        monto : this.capitalPagadoMonto,
        observacion : this.capitalPagadoObservacion,
        observacionIng : this.capitalPagadoObservacionIng
      }
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.capitalPagadoActualInforme = data.capitalPagado.moneda + ' | ' + data.capitalPagado.monto + ' | ' + data.capitalPagado.observacion
        this.capitalPagadoMoneda = data.capitalPagado.moneda
        this.capitalPagadoMonto = data.capitalPagado.monto
        this.capitalPagadoObservacion = data.capitalPagado.observacion
        this.capitalPagadoObservacionIng = data.capitalPagado.observacionIng
      }
    });
  }

  onDateChange1(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaConstitucionInforme = this.formatDate(selectedDate);
    }
  }
  onDateChange2(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaUltimaConsultaInforme = this.formatDate(selectedDate);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  //TITULOS DE COMENTARIOS
  tituloDuracion : string = "Duración"
  tituloRegistradaEn : string = 'Registrada En'
  tituloRegistrosPublicos : string = 'Registros Públicos'
  tituloCapitalActual : string = 'Capital Actual'
  tituloFechaAumento : string = 'Fecha de Aumento'
  tituloActualTC : string = 'Actual T.C. Por 1US$ '
  tituloComentarioAntecedentes : string = 'Antecedentes Legales '
  subtituloComentarioAntecedentes: string = 'Anote aquí unicamente Datos de Contitución, Gestores del Negocio, Aumentos del Capital, Cambios de Razón Social, Objeto Social, Fusiones, Cotización de la Acciones, entre otros.'
  tituloHistoria : string = 'Historia (Antecedentes)'
  subtituloHistoria: string = 'Anote aquí unicamente el Historial de la Empresa a travéz del tiempo, a que grupo económico pertenecen, destacar al principal accionista, posición en el mercado, etc.'


  empresaCotizada(){
    if(this.checkEmpresaCotizada){
      this.checkEmpresaCotizada = false
    }else{
      this.checkEmpresaCotizada = true
    }
  }

  selectOrigen(origen : string){
    this.origenInforme = origen
  }
  selectCotizadoEnBolsaPor(cotizadaEnBolsaPor : string){
    this.cotizadaEnBolsaPorInforme = cotizadaEnBolsaPor
  }

  //ANTECEDENTES
  fechaConstitucionInforme : string = ""
  fechaConstitucionInformeDate : Date = new Date()
  inicioActividadesInforme : string = ""
  duracionInforme : string = ""
  duracionIngInforme : string = ""
  registradaEnInforme : string = "1"
  registradaEnIngInforme : string = "2"
  notariaInforme : string = ""
  registrosPublicosInforme : string = ""
  registrosPublicosIngInforme : string = ""

  comentarioAntecedentes : string = ""
  comentarioAntecedentesIng : string = ""

  historialAntecedentes : string = ""
  historialAntecedentesIng : string = ""

  capitalPagadoMoneda : string = ""
  capitalPagadoMonto : string = ""
  capitalPagadoObservacion : string = ""
  capitalPagadoObservacionIng : string = ""

  capitalPagadoActualInforme : string = ""

  origenInforme : string = ""
  fechaAumentoInforme : string = ""
  fechaAumentoIngInforme : string = ""
  monedaPaisInforme : Moneda =  {
    id : 0,
    pais : '',
    moneda : ''
  }
  checkEmpresaCotizada : boolean = false
  cotizadaEnBolsaInforme : string = ""
  cotizadaEnBolsaPorInforme : string = ""
  actualTCInforme : string = ""
  actualTCIngInforme : string = ""
  fechaUltimaConsultaInforme : string = ""
  fechaUltimaConsultaInformeDate : Date = new Date()
  ultimaConsultaPorInforme : string = ""

  guardar(){
    console.log(this.fechaConstitucionInforme)
    console.log(this.inicioActividadesInforme)
    console.log(this.duracionInforme)
    console.log(this.registradaEnInforme)
    console.log(this.notariaInforme)
    console.log(this.registrosPublicosInforme)
    console.log(this.capitalPagadoActualInforme)
    console.log(this.origenInforme)
    console.log(this.fechaAumentoInforme)
    console.log(this.monedaPaisInforme)
    console.log(this.checkEmpresaCotizada)
    console.log(this.cotizadaEnBolsaPorInforme)
    console.log(this.actualTCInforme)
    console.log(this.fechaUltimaConsultaInforme)
    console.log(this.ultimaConsultaPorInforme)
  }
  armarModelo(){
    this.antecedentesLegales[0] = {
      codigoInforme : this.codigoInforme+'',
      fechaConstitucion : this.fechaConstitucionInforme,
      inicioActividades : this.inicioActividadesInforme,
      duracion : this.duracionInforme,
      duracionIng : this.duracionIngInforme,
      registradaEn : this.registradaEnInforme,
      registradaEnIng : this.registradaEnIngInforme,
      notaria : this.notariaInforme,
      registrosPublicos : this.registrosPublicosInforme,
      registrosPublicosIng : this.registrosPublicosIngInforme,

      monedaPais : this.capitalPagadoMoneda,
      monto : this.capitalPagadoMonto,
      observacion : this.capitalPagadoObservacion,
      observacionIng : this.capitalPagadoObservacionIng,

      origen : this.origenInforme,
      fechaAumento : this.fechaAumentoInforme,
      fechaAumentoIng : this.fechaAumentoIngInforme,

      moneda : this.monedaPaisInforme,
      cotizada : this.cotizadaEnBolsaInforme,
      por : this.cotizadaEnBolsaPorInforme,
      actualTC : this.actualTCInforme,
      actualTCIng : this.actualTCIngInforme,
      fechaUltimaConsultaRRPP : this.fechaUltimaConsultaInforme,
      fechaUltimaConsultaPor : this.ultimaConsultaPorInforme,

      comentarioAntecedentesLegales : this.comentarioAntecedentes,
      comentarioAntecedentesLegalesIng : this.comentarioAntecedentesIng,
      comentarioHistoriaAntecedentes : this.historialAntecedentes,
      comentarioHistoriaAntecedentesIng : this.historialAntecedentesIng,
    }
  }
  salir(){
  }
}
