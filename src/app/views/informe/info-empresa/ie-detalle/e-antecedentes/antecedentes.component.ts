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
  this.dataSource = new MatTableDataSource(this.empresaRelacionadaService.GetAllEmpresaRelacionada())
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
    return this.options.filter(option => option.name.toLowerCase().includes(name.toLowerCase()));
  }

  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo : titulo,
      subtitulo : subtitulo,
      comentario_es : comentario_es,
      comentario_en : comentario_en

    },
  });
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
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
  tituloDuracion : string = "Traducción => Duración"
  tituloRegistradaEn : string = 'Traducción => Registrada En'
  tituloRegistrosPublicos : string = 'Traducción => Registros Públicos'
  tituloCapitalActual : string = 'Traducción => Capital Actual'
  tituloFechaAumento : string = 'Traducción => Fecha de Aumento'
  tituloActualTC : string = 'Traducción => Actual T.C. Por 1US$ '
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
  registradaEnInforme : string = ""
  registradaEnIngInforme : string = ""
  notariaInforme : string = ""
  registrosPublicosInforme : string = ""
  registrosPublicosIngInforme : string = ""
  capitalPagadoActualInforme : string = ""
  capitalPagadoActualIngInforme : string = ""
  origenInforme : string = ""
  fechaAumentoInforme : string = ""
  fechaAumentoIngInforme : string = ""
  monedaPaisInforme : string = ""
  checkEmpresaCotizada : boolean = false
  cotizadaEnBolsaInforme : string = ""
  cotizadaEnBolsaPorInforme : string = ""
  actualTCInforme : string = ""
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
