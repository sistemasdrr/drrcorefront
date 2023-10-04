import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { HistoricoVentasService } from './../../../../../services/historico-ventas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoVentas } from 'app/models/historico-ventas';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

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
    this.dataSourceHistoricoVentas = new MatTableDataSource(this.historicoVentasService.GetAllHistoricoVentas())
  }

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'TF: Se logro preparar el informe exclusivamente por terceros'}, {name: 'otro 1'}, {name: 'otro 2'}];
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




  comentarioConBalance : string = "comentario con balance"
  comentarioSinBalance : string = "comentario sin balance"
  comentarioElegido : string = ""
  checkComentarioConBalance : boolean = false
  checkComentarioSinBalance : boolean = false

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
  agregarComentario(titulo1 : string, titulo2 : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo1 : titulo1,
      titulo2 : titulo2,
      subtitulo : subtitulo,
      empresa: empresa,
      },
    });
  }
  titulo = 'Comentario - Traduccion'
  tituloActivos = 'Principales Activos Fijos de la Empresa => '
  tituloCargo = 'Cargos de la Empresa => '
  tituloComentarioEntrevista = 'Comentarios de la Entrevista'
  tituloComentarioFinanciero = 'Comentario Financiero'
  tituloComentarioAnalista = 'Comentarios del Analista'

  subtituloActivos = '(Inmuebles, Vehículos, etc. Detalle - Valor)'
}
