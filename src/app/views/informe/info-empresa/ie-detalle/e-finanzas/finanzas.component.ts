import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { HistoricoVentasService } from '../../../../../services/informes/historico-ventas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoVentas } from 'app/models/informes/historico-ventas';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { BalanceSituacionalComponent } from './balance-situacional/balance-situacional.component';
import { ComboData, ComboData2 } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';

export interface data {
  name: string;
}

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  listaGradoColaboracion : ComboData[] = []
  listaSituacionFinanciera : ComboData2[] = []

  constructor(
    private historicoVentasService : HistoricoVentasService,
    private dialog : MatDialog,
    private comboService : ComboService
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
  idSituacionFinanciera = 0
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

  filteredOptions: Observable<data[]>;


  ngOnInit() {

    this.comboService.getGradoColaboracion().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaGradoColaboracion = response.data
        }
      }
    )
    this.comboService.getSituacionFinanciera().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaSituacionFinanciera = response.data
        }
      }
    )
    this.dataSourceHistoricoVentas = new MatTableDataSource(this.historicoVentasService.GetAllHistoricoVentas())


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
  selectSituacionFinanciera(idSituacionFinanciera : number){
    if(idSituacionFinanciera > 0){
      const sit = this.listaSituacionFinanciera.filter(x => x.id === idSituacionFinanciera)[0]
      if(sit){
        this.comentarioConBalance = sit.reportCommentWithBalance
        this.comentarioSinBalance = sit.reportCommentWithoutBalance
      }
    }

  }

  titulo = 'Comentario - Traduccion'
  tituloActivos = 'Principales Activos Fijos de la Empresa '
  tituloCargo = 'Cargos de la Empresa '
  tituloComentarioEntrevista = 'Comentarios de la Entrevista'
  tituloComentarioFinanciero = 'Comentario Financiero'
  tituloComentarioAnalista = 'Comentarios del Analista'

  subtituloActivos = '(Inmuebles, Vehículos, etc. Detalle - Valor)'
}
