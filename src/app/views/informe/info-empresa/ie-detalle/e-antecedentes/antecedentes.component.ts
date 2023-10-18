import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { EmpresaRelacionada } from 'app/models/empresa-relacionada';
import { EmpresaRelacionadaService } from 'app/services/empresa-relacionada.service';
import { Observable, map, startWith } from 'rxjs';
import { CapitalPagadoComponent } from './capital-pagado/capital-pagado.component';

export interface data {
  name: string;
}

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent implements OnInit{
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
  private empresaRelacionadaService : EmpresaRelacionadaService) {
    this.filteredOptions = new Observable<data[]>();
    this.dataSource = new MatTableDataSource<EmpresaRelacionada>
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
        this.registrosPublicosInforme = data.comentario_es;
        this.registrosPublicosIngInforme = data.comentario_en;
        console.log(this.registrosPublicosInforme)
        break
        case 'historialAntecedentes':
         this.historialAntecedentes = data.comentario_es;
         this.historialAntecedentesIng = data.comentario_en;
         console.log(this.historialAntecedentes)
         break
        case 'fechaAumento':
        this.fechaAumentoInforme = data.comentario_es;
        this.fechaAumentoIngInforme = data.comentario_en;
        console.log(this.fechaAumentoInforme)
        break
        case 'actualTC':
        this.actualTCInforme = data.comentario_es;
        this.actualTCIngInforme = data.comentario_en;
        console.log(this.actualTCInforme)
        break
        case 'comentarioAntecedentes':
        this.comentarioAntecedentes = data.comentario_es;
        this.comentarioAntecedentesIng = data.comentario_en;
        console.log(this.comentarioAntecedentes)
        break
        case 'historiaAntecedentes':
        this.historialAntecedentes = data.comentario_es;
        this.historialAntecedentesIng = data.comentario_en;
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
          this.duracionInforme = data.comentario_es;
          this.duracionIngInforme = data.comentario_en;
          console.log(this.duracionInforme)
          break
          case 'registradaEn':
          this.registradaEnInforme = data.comentario_es;
          this.registradaEnIngInforme = data.comentario_en;
          console.log(this.registradaEnInforme)
          break
          case 'registrosPublicos':
          this.registrosPublicosInforme = data.comentario_es;
          this.registrosPublicosIngInforme = data.comentario_en;
          console.log(this.registrosPublicosInforme)
          break
          case 'historialAntecedentes':
           this.historialAntecedentes = data.comentario_es;
           this.historialAntecedentesIng = data.comentario_en;
           console.log(this.historialAntecedentes)
           break
          case 'fechaAumento':
          this.fechaAumentoInforme = data.comentario_es;
          this.fechaAumentoIngInforme = data.comentario_en;
          console.log(this.fechaAumentoInforme)
          break
          case 'actualTC':
          this.actualTCInforme = data.comentario_es;
          this.actualTCIngInforme = data.comentario_en;
          console.log(this.actualTCInforme)
          break
          case 'comentarioAntecedentes':
          this.comentarioAntecedentes = data.comentario_es;
          this.comentarioAntecedentesIng = data.comentario_en;
          console.log(this.comentarioAntecedentes)
          break
          case 'historiaAntecedentes':
          this.historialAntecedentes = data.comentario_es;
          this.historialAntecedentesIng = data.comentario_en;
          console.log(this.historialAntecedentes)
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
        monto : this.capitalPagadoMoneda,
        observacion : this.capitalPagadoObservacion,
        observacionIng : this.capitalPagadoObservacionIng
      }
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.capitalPagadoActualInforme = data.capitalPagado.moneda + ' | ' + data.capitalPagado.monto + ' | ' + data.capitalPagado.observacion
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
