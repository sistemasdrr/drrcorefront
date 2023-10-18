import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CuadroImpoExpoComponent } from '@shared/components/cuadro-impo-expo/cuadro-impo-expo.component';
import { RamoActividadDialogComponent } from '@shared/components/ramo-actividad/ramo-actividad.component';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Observable, map, startWith } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  public Editor: any = ClassicEditor;


  constructor(private dialog : MatDialog){
    this.filteredOptions = new Observable<data[]>();
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
      },
    });
  dialogRef1.componentInstance.eventSelectRamo.subscribe((data) => {
    console.log('Datos recibidos desde el diálogo:', data);
    // Haz lo que necesites con los datos recibidos.
  });
  }
  ImportacionDialog() {
    const dialogRef2 = this.dialog.open(CuadroImpoExpoComponent, {
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

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'Alquilado'}, {name: 'Comodato'}, {name: 'Compartido'}, {name: 'No Revelado'}, {name: 'Oficina Virtual'}, {name: 'Propio Cancelado'}, {name: 'Propio Pagandolo'}];
  filteredOptions: Observable<data[]>;

  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
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
