import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CuadroImpoExpoComponent } from '@shared/components/cuadro-impo-expo/cuadro-impo-expo.component';
import { RamoActividadDialogComponent } from '@shared/components/ramo-actividad/ramo-actividad.component';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Observable, map, startWith } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Actividad } from 'app/models/informes/ramo-negocio';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { DialogComercioComponent } from './dialog-comercio/dialog-comercio.component';
import * as cheerio from 'cheerio';

export interface data {
  name: string;
}

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.scss']
})

export class RamoComponent implements OnInit{
  importacion = "NO"
  exportacion = "NO"

  numeroPaisesImpo = [1,2,3,4]
  numeroPaisesExpo = [5,6,7,8]

  separatorKeysCodes: number[] = [ENTER, COMMA];

  controlPaisesImpo = new FormControl<string | Pais>('')
  paisesImpo : Pais[] = []
  paisesSeleccionadosImpo : Pais[] = []
  filterPaisImpo : Observable<Pais[]>
  paisInformeImpo : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }

  controlPaisesExpo = new FormControl<string | Pais>('')
  paisesExpo : Pais[] = []
  paisesSeleccionadosExpo : Pais[] = []
  filterPaisExpo : Observable<Pais[]>
  paisInformeExpo : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }

  fruitCtrl = new FormControl('');


  fruits: string[] = ['Lemon'];

  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];


  @ViewChild('paisExpoInput') paisExpoInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  public Editor: any = ClassicEditor;
  data = '<figure class="table"><table><tbody><tr><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>f</td><td>g</td><td>h</td><td>i</td><td>j</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>'

  constructor(private dialog : MatDialog,
    private paisService : PaisService){

    this.filteredOptions = new Observable<data[]>();
    this.filterPaisImpo = new Observable<Pais[]>()
    this.filterPaisExpo = new Observable<Pais[]>()
  }
  ngOnInit() {
    this.paisService.getPaises().subscribe(data => {
      if(data.isSuccess == true){
        this.paisesImpo = data.data;
        this.paisesExpo = data.data;
        this.numeroPaisesImpo.forEach(num => {
          const p = this.paisesImpo.filter(x => x.id === num)[0]
          if(p){
            this.paisesSeleccionadosImpo.push(p)
          }
        });
        this.numeroPaisesExpo.forEach(num => {
          const p = this.paisesExpo.filter(x => x.id === num)[0]
          if(p){
            this.paisesSeleccionadosExpo.push(p)
          }
        });
        console.log(this.paisesSeleccionadosImpo)
        console.log(this.paisesSeleccionadosExpo)
      }
    });
    this.filterPaisImpo = this.controlPaisesImpo.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisImpo(name as string) : this.paisesImpo.slice()
      }),
    )
    this.filterPaisExpo = this.controlPaisesExpo.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisExpo(name as string) : this.paisesExpo.slice()
      }),
    )
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  private _filterPaisImpo(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesImpo.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filterPaisExpo(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesExpo.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayPais(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  displayFn(user: data): string {
    return user && user.name ? user.name : '';
  }

  addImpo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
    this.controlPaisesImpo.setValue(null);
  }

  removeImpo(pais: string): void {
    const deletePais = this.paisesSeleccionadosImpo.filter(x => x.valor === pais)

    if (deletePais.length > 0) {
      this.paisesSeleccionadosImpo = this.paisesSeleccionadosImpo.filter(x => x.valor !== pais)

      this.announcer.announce(`Se Removio  ${pais}`);
    }
  }
  selectedImpo(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)
    const pais = this.paisesImpo.filter(x => x.valor === event.option.value)[0]
    if(pais){
      const paisRepetido = this.paisesSeleccionadosImpo.filter(x => x.valor === event.option.value)[0]
      if(paisRepetido){
        console.log('Pais Repetido')
      }else{
        this.paisesSeleccionadosImpo.push(pais)
      }
    }
    this.paisExpoInput.nativeElement.value = '';
    this.controlPaisesImpo.setValue(null);
  }
  addExpo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
    this.controlPaisesExpo.setValue(null);
  }

  removeExpo(pais: string): void {
    const deletePais = this.paisesSeleccionadosExpo.filter(x => x.valor === pais)

    if (deletePais.length > 0) {
      this.paisesSeleccionadosExpo = this.paisesSeleccionadosExpo.filter(x => x.valor !== pais)

      this.announcer.announce(`Se Removio  ${pais}`);
    }
  }
  selectedExpo(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)
    const pais = this.paisesExpo.filter(x => x.valor === event.option.value)[0]
    if(pais){
      const paisRepetido = this.paisesSeleccionadosExpo.filter(x => x.valor === event.option.value)[0]
      if(paisRepetido){
        console.log('Pais Repetido')
      }else{
        this.paisesSeleccionadosExpo.push(pais)
      }
    }
    this.paisExpoInput.nativeElement.value = '';
    this.controlPaisesExpo.setValue(null);
  }
  importan(){
    if(this.checkImportacion){
      this.importacion = "SI"

    }else{
      this.importacion = "NO"
    }
  }
  exportan(){
    if(this.checkExportacion){
      this.exportacion = "SI"
    }else{
      this.exportacion = "NO"
    }
  }
  selectImportan(importan : string){
    this.checkImportacion = importan
    console.log(importan)
  }
  selectExportan(exportan : string){
    this.checkExportacion = exportan
    console.log(exportan)
  }

  ramoActividadDialog() {
    const dialogRef1 = this.dialog.open(RamoActividadDialogComponent, {
    data: {
      ramoNegocio : this.ramoNegociosInforme,
      actividadEspecifica : this.actividadEspecificaInforme
      },
    });
    dialogRef1.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        this.ramoNegociosInforme = data.ramoNegocio
        this.actividadEspecificaInforme = ''
        data.actividades.forEach((actividad : Actividad)  => {
          if(data.actividades[data.actividades.length-1] == actividad){
            this.actividadEspecificaInforme += actividad.nombre
          }else{
            this.actividadEspecificaInforme += actividad.nombre + ' - '
          }
        });
      }
    })
  }
  ImportacionDialog() {
    let dialogRef2 = this.dialog.open(CuadroImpoExpoComponent, {
    data: {
      titulo : "Importaciones",
      codigoEmpresa : "codigo"
    },
  });
  }
  ExportacionDialog() {
    const dialogRef3 = this.dialog.open(CuadroImpoExpoComponent, {
    data: {
      titulo : "Exportaciones",
      codigoEmpresa : "codigo"
    },
  });
  }
  comercioExteriorDialog(input : string){
    const dialogRef1 = this.dialog.open(DialogComercioComponent, {
      data: {
        titulo : input,
        monto : this.ramoNegociosInforme,
        plazos : this.actividadEspecificaInforme,
        observacion : this.actividadEspecificaInforme,
        observacionIng : this.actividadEspecificaInforme
        },
      });
    dialogRef1.afterClosed().subscribe(
      (data) => {
        if(data){
          switch(input){
            case '':
              break
            case '':
              break
            case '':
              break
            case '':
              break
            case '':
              break
            case '':
              break
          }
        }
      }
    )
  }

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'Alquilado'}, {name: 'Comodato'}, {name: 'Compartido'}, {name: 'No Revelado'}, {name: 'Oficina Virtual'}, {name: 'Propio Cancelado'}, {name: 'Propio Pagandolo'}];
  filteredOptions: Observable<data[]>;

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
        case 'otrosLocales':
        this.otrosLocalesInforme = data.comentario_es;
        this.otrosLocalesIngInforme = data.comentario_en;
        break
        case 'comentarioActividadPrincipal':
        this.comentarioActividadPrincipal = data.comentario_es;
        this.comentarioActividadPrincipalIng = data.comentario_en;
        break
        case 'comentarioNegocio':
        this.comentarioNegocio = data.comentario_es;
        this.comentarioNegocioIng = data.comentario_en;
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
        case 'paisesImportan':
        this.paisesImportacionInforme = data.comentario_es;
        this.paisesImportacionIngInforme = data.comentario_en;
        break
        case 'paisesExportan':
        this.paisesExportacionInforme = data.comentario_es;
        this.paisesExportacionIngInforme = data.comentario_en;
        break
        case 'ventaContado':
        this.ventaContadoInforme = data.comentario_es;
        this.ventaContadoIngInforme = data.comentario_en;
        break
        case 'creditoTermino':
        this.creditoTerminosInforme = data.comentario_es;
        this.creditoTerminosIngInforme = data.comentario_en;
        break
        case 'territorioVentas':
        this.territorioVentasInforme = data.comentario_es;
        this.territorioVentasIngInforme = data.comentario_en;
        break
        case 'ventaExterior':
        this.ventasExteriorInforme = data.comentario_es;
        this.ventasExteriorIngInforme = data.comentario_en;
        break
        case 'comprasNacionales':
        this.comprasNacionalesInforme = data.comentario_es;
        this.comprasNacionalesIngInforme = data.comentario_en;
        break
        case 'comprasExterior':
        this.comprasDelExteriorInforme = data.comentario_es;
        this.comprasDelExteriorIngInforme = data.comentario_en;
        break
        case 'areaTotal':
        this.areaTotalInforme = data.comentario_es;
        this.areaTotalIngInforme = data.comentario_en;
        break

      }
    }
  });
  }

  //TITULOS DE COMENTARIOS
  codEmpresa = "cod de empresa o nombre"
  titulo : string = 'Comentario - Traduccion'
  tituloImportacion : string = 'Importación en Países '
  tituloExportacion : string = 'Exportación en Países '
  tituloVentaContado : string = '% de Venta al Contado / Forma '
  tituloCreditoTerminos : string = '% de Créditos / Términos'
  tituloTerritorioVentas : string = 'Territorio de Ventas '
  tituloVentaExterior : string = '% de Ventas al Exterior '
  tituloComprasNacionales : string = '% de Compras Nacionales '
  tituloExterior : string = '% del Exterior'
  tituloAreaTotal : string = 'Área Total '
  tituloOtrosLocales : string = 'Otros Locales '
  subtituloOtrosLocales: string = 'Plantas, Almacenes, Depósitos y Sucursales'


  //RAMO NEGOCIO
  sectorPrincipalInforme : string = ""
  ramoNegociosInforme : string = ""
  actividadEspecificaInforme : string = ""
  checkImportacion : string = ""
  checkExportacion : string = ""
  paisesExportacionInforme : string = ""
  paisesExportacionIngInforme : string = ""
  paisesImportacionInforme : string = ""
  paisesImportacionIngInforme : string = ""
  ventaContadoInforme : string = ""
  ventaContadoIngInforme : string = ""
  creditoTerminosInforme : string = ""
  creditoTerminosIngInforme : string = ""
  territorioVentasInforme : string = ""
  territorioVentasIngInforme : string = ""
  ventasExteriorInforme : string = ""
  ventasExteriorIngInforme : string = ""
  comprasNacionalesInforme : string = ""
  comprasNacionalesIngInforme : string = ""
  comprasDelExteriorInforme : string = ""
  comprasDelExteriorIngInforme : string = ""
  numTrabajadoresInforme : string = ""
  titularidadInforme : string = ""
  areaTotalInforme : string = ""
  areaTotalIngInforme : string = ""
  domicilioAnteriorInforme : string = ""
  otrosLocalesInforme : string = ""
  otrosLocalesIngInforme : string = ""

  comentarioActividadPrincipal : string = ""
  comentarioActividadPrincipalIng : string = ""
  comentarioNegocio : string = ""
  comentarioNegocioIng : string = ""
  comentarioNegocioTabulado : string = ""

  guardar(){
    console.log(this.sectorPrincipalInforme)
    console.log(this.ramoNegociosInforme)
    console.log(this.actividadEspecificaInforme)
    console.log(this.checkImportacion)
    console.log(this.checkExportacion)
    console.log(this.paisesExportacionInforme)
    console.log(this.paisesImportacionInforme)
    console.log(this.ventaContadoInforme)
    console.log(this.creditoTerminosInforme)
    console.log(this.territorioVentasInforme)
    console.log(this.ventasExteriorInforme)
    console.log(this.comprasNacionalesInforme)
    console.log(this.comprasDelExteriorInforme)
    console.log(this.numTrabajadoresInforme)
    console.log(this.titularidadInforme)
    console.log(this.areaTotalInforme)
    console.log(this.domicilioAnteriorInforme)
    console.log(this.otrosLocalesInforme)
    console.log(this.comentarioNegocioTabulado)
  }
}
