import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { HistoricoVentasService } from './../../../../../services/historico-ventas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoVentas } from 'app/models/historico-ventas';
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
  options: data[] = [{name: 'TF: Se logro preparar el informe exclusivamente por terceros'}, {name: 'otro 1'}, {name: 'otro 2'}];
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
  titulo = 'Comentario - Traduccion'
  tituloActivos = 'Principales Activos Fijos de la Empresa '
  tituloCargo = 'Cargos de la Empresa '
  tituloComentarioEntrevista = 'Comentarios de la Entrevista'
  tituloComentarioFinanciero = 'Comentario Financiero'
  tituloComentarioAnalista = 'Comentarios del Analista'

  subtituloActivos = '(Inmuebles, Vehículos, etc. Detalle - Valor)'
}
