import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  columnsToDisplay = ['razonSocial', 'pais', 'fechaEstablecimiento', 'registroTributario', 'estado', 'accion'];
  selection = new SelectionModel<EmpresaRelacionada>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  myControl = new FormControl<string | data>('');
  options: data[] = [{name: '112'}, {name: '113'}, {name: '114'}, {name: '115'}, {name: '116'}, {name: '117'}, {name: '118'}, {name: '119'}];
  filteredOptions: Observable<data[]>;
constructor(
  private router : Router,
  public dialog: MatDialog,
  private empresaRelacionadaService : EmpresaRelacionadaService) {
  this.filteredOptions = new Observable<data[]>();
  this.dataSource = new MatTableDataSource(this.empresaRelacionadaService.getListEmpresasRelacionadas())
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
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }

  //TITULOS DE COMENTARIOS
  titulo : string = 'Comentario - Traduccion'
  tituloRegistradaEn : string = 'Registrada En => '
  tituloRegistrosPublicos : string = 'Registros Públicos => '
  tituloCapitalActual : string = 'Capital Actual => '
  tituloFechaAumento : string = 'Fecha de Aumento => '
  tituloActualTC : string = 'Actual T.C. Por 1US$ => '
  tituloComentarioAntecedentes : string = 'Antecedentes Legales => '
  subtituloComentarioAntecedentes: string = 'Anote aquí unicamente Datos de Contitución, Gestores del Negocio, Aumentos del Capital, Cambios de Razón Social, Objeto Social, Fusiones, Cotización de la Acciones, entre otros.'
  tituloHistoria : string = 'Historia (Antecedentes) => '
  subtituloHistoria: string = 'Anote aquí unicamente el Historial de la Empresa a travéz del tiempo, a que grupo económico pertenecen, destacar al principal accionista, posición en el mercado, etc.'

  checkEmpresaCotizada : boolean = false;

  empresaCotizada(){
    if(this.checkEmpresaCotizada){
      this.checkEmpresaCotizada = false
    }else{
      this.checkEmpresaCotizada = true
    }
  }
}
