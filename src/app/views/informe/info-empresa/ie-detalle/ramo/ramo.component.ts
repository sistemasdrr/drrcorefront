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
  checkImportacion = false;
  importacion = "NO"
  checkExportacion = false;
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

}
