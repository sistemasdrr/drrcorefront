import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CuadroImpoExpoComponent } from '@shared/components/cuadro-impo-expo/cuadro-impo-expo.component';
import { RamoActividadDialogComponent } from '@shared/components/ramo-actividad/ramo-actividad.component';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Observable, map, startWith } from 'rxjs';

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


  agregarComentario(titulo1 : string, titulo2 : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo1 : titulo1,
      titulo2 : titulo2,
      subtitulo : subtitulo,
      empresa: empresa,

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

  //TITULOS DE COMENTARIOS
  codEmpresa = "cod de empresa o nombre"
  titulo : string = 'Comentario - Traduccion'
  tituloImportacion : string = 'Importación en Países => '
  tituloExportacion : string = 'Exportación en Países => '
  tituloVentaContado : string = '% de Venta al Contado / Forma => '
  tituloCreditoTerminos : string = '% de Créditos / Términos => '
  tituloTerritorioVentas : string = 'Territorio de Ventas => '
  tituloVentaExterior : string = '% de Ventas al Exterior => '
  tituloComprasNacionales : string = '% de Compras Nacionales => '
  tituloExterior : string = '% del Exterior => '
  tituloAreaTotal : string = 'Área Total => '
  tituloOtrosLocales : string = 'Otros Locales => '
  subtituloOtrosLocales: string = 'Plantas, Almacenes, Depósitos y Sucursales'


  //RAMO NEGOCIO
  sectorPrincipalInforme : string = ""
  ramoNegociosInforme : string = ""
  actividadEspecificaInforme : string = ""
  checkImportacion : boolean = false
  checkExportacion : boolean = false
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
  }
}
