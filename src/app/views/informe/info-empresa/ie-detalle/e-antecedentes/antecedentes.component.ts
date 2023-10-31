import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

export interface data {
  name: string;
}

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent implements OnInit{

  codigoInforme : string | null = ''
  antecedentesLegales : AntecedentesLegales[] = []
  //TABLA
  dataSource: MatTableDataSource<EmpresaRelacionada>;

  columnsToDisplay = ['razonSocial', 'registroTributario', 'pais', 'fechaEstablecimiento', 'estado', 'accion'];
  selection = new SelectionModel<EmpresaRelacionada>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  myControl = new FormControl<string | data>('');
  options: data[] = [
    {
      name: 'PEN - Nuevos Soles (S/.)'
    },
    {
      name: 'USD - Dolár EstadoUnidense ($)'
    },
    {
      name: 'EUR - Euro (€)'
    },
    {
      name: 'JPY - Yen Japonés (¥)'
    },
    {
      name: 'MXN - Peso Mexicano ($)'
    },
    {
      name: 'CLP - Peso Chileno ($)'
    },
    {
      name: 'INR -Rupia India (₹)'
    },
    {
      name: 'RUB - Rublo Ruso (₽)'
    }];
  filteredOptions: Observable<data[]>;
constructor(
  public dialog: MatDialog,
  private empresaRelacionadaService : EmpresaRelacionadaService,
  private activatedRoute: ActivatedRoute,
    private antecedentesLegalesService : AntecedentesLegalesService
  ) {
    this.filteredOptions = new Observable<data[]>();
    this.dataSource = new MatTableDataSource<EmpresaRelacionada>
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
    console.log(this.codigoInforme)

}
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.empresaRelacionadaService.GetAllEmpresaRelacionada())

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    if(this.codigoInforme !== 'nuevo'){
      this.antecedentesLegales = this.antecedentesLegalesService.getAntecedentesLegales(this.codigoInforme+'')
      console.log(this.antecedentesLegales)
      this.fechaConstitucionInforme = this.antecedentesLegales[0].fechaConstitucion
      const fecha1 = this.fechaConstitucionInforme.split("/");
      if(fecha1){
        this.fechaConstitucionInformeDate = new Date(parseInt(fecha1[2]), parseInt(fecha1[1])-1,parseInt(fecha1[0]))
      }

      this.inicioActividadesInforme = this.antecedentesLegales[0].inicioActividades
      this.duracionInforme = this.antecedentesLegales[0].duracion
      this.duracionIngInforme = this.antecedentesLegales[0].duracionIng
      this.registradaEnInforme = this.antecedentesLegales[0].registradaEn
      this.registradaEnIngInforme = this.antecedentesLegales[0].registradaEnIng
      this.notariaInforme = this.antecedentesLegales[0].notaria
      this.registrosPublicosInforme = this.antecedentesLegales[0].registrosPublicos
      this.registrosPublicosIngInforme = this.antecedentesLegales[0].registrosPublicosIng
      this.comentarioAntecedentes = this.antecedentesLegales[0].comentarioAntecedentesLegales
      this.comentarioAntecedentesIng = this.antecedentesLegales[0].comentarioAntecedentesLegalesIng
      this.historialAntecedentes = this.antecedentesLegales[0].comentarioHistoriaAntecedentes
      this.historialAntecedentesIng = this.antecedentesLegales[0].comentarioHistoriaAntecedentesIng
      this.capitalPagadoMoneda = this.antecedentesLegales[0].moneda
      this.capitalPagadoMonto = this.antecedentesLegales[0].monto
      this.capitalPagadoObservacion = this.antecedentesLegales[0].observacion
      this.capitalPagadoObservacionIng = this.antecedentesLegales[0].observacionIng
      this.origenInforme = this.antecedentesLegales[0].origen
      this.fechaAumentoInforme = this.antecedentesLegales[0].fechaAumento
      this.fechaAumentoIngInforme = this.antecedentesLegales[0].fechaAumentoIng
      this.monedaPaisInforme = this.antecedentesLegales[0].monedaPais
      this.cotizadaEnBolsaInforme = this.antecedentesLegales[0].cotizada
      this.cotizadaEnBolsaPorInforme = this.antecedentesLegales[0].por
      this.actualTCInforme = this.antecedentesLegales[0].actualTC
      this.actualTCIngInforme = this.antecedentesLegales[0].actualTCIng
      this.fechaUltimaConsultaInforme = this.antecedentesLegales[0].fechaUltimaConsultaRRPP
      this.ultimaConsultaPorInforme = this.antecedentesLegales[0].fechaUltimaConsultaPor

    }
  }

  displayFn(user: data): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): data[] {
    return this.options.filter(option => option.name.toLowerCase().includes(name.toLowerCase()));
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
        this.antecedentesLegales[0].registrosPublicos = data.comentario_es;
        this.antecedentesLegales[0].registrosPublicosIng = data.comentario_en;
        console.log(this.registrosPublicosInforme)
        break
        case 'fechaAumento':
          this.antecedentesLegales[0].fechaAumento = data.comentario_es;
          this.antecedentesLegales[0].fechaAumento = data.comentario_en;
        break
        case 'actualTC':
          this.antecedentesLegales[0].actualTC = data.comentario_es;
          this.antecedentesLegales[0].actualTCIng = data.comentario_en;
        break
        case 'comentarioAntecedentes':
          this.antecedentesLegales[0].comentarioAntecedentesLegales = data.comentario_es;
          this.antecedentesLegales[0].comentarioAntecedentesLegalesIng = data.comentario_en;
        break
        case 'historiaAntecedentes':
          this.antecedentesLegales[0].comentarioHistoriaAntecedentes = data.comentario_es;
        this.antecedentesLegales[0].comentarioHistoriaAntecedentesIng = data.comentario_en;
        console.log(this.historialAntecedentes)
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
            this.antecedentesLegales[0].duracion = data.comentario_es;
            this.antecedentesLegales[0].duracionIng = data.comentario_en;
          break
          case 'registradaEn':
            this.antecedentesLegales[0].registradaEn = data.comentario_es;
            this.antecedentesLegales[0].registradaEnIng = data.comentario_en;
          break
          case 'registrosPublicos':
          this.antecedentesLegales[0].registrosPublicos = data.comentario_es;
          this.antecedentesLegales[0].registrosPublicosIng = data.comentario_en;
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
  monedaPaisInforme : string = ""
  checkEmpresaCotizada : boolean = false
  cotizadaEnBolsaInforme : string = ""
  cotizadaEnBolsaPorInforme : string = ""
  actualTCInforme : string = ""
  actualTCIngInforme : string = ""
  fechaUltimaConsultaInforme : string = ""
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
}
