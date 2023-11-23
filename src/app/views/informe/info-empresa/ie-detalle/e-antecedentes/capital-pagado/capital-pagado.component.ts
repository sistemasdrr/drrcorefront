import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';

export interface CapitalPagadoData{
  moneda : string
  monto : string
  observacion : string
  observacionIng : string
}
@Component({
  selector: 'app-capital-pagado',
  templateUrl: './capital-pagado.component.html',
  styleUrls: ['./capital-pagado.component.scss']
})
export class CapitalPagadoComponent implements OnInit {

  idCurrency = 0
  currentPaidCapitalCurrencyInforme : ComboData =  {
    id : 0,
    valor  : '',
  }
  capital = 0
  commentary = ""
  commentaryEng = ""


  ctrlMoneda = new FormControl<string | ComboData>('');
  listaMonedas : ComboData[] = []
  filteredMoneda: Observable<ComboData[]>;

  @Output()
  eventCapitalPagado = new EventEmitter<CapitalPagadoData>();

  selectMoneda(data : ComboData){
    if (data !== null) {
      if (typeof data === 'string' || data === null) {
        this.idCurrency = 0
      } else {
        this.idCurrency = data.id
      }
    } else {
      this.idCurrency = 0
    }
    console.log(this.idCurrency)
  }

  constructor(public dialogRef: MatDialogRef<CapitalPagadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CapitalPagadoData, private comboService : ComboService) {
    this.filteredMoneda = new Observable<ComboData[]>()
  }

  ngOnInit() {
    this.comboService.getTipoMoneda().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaMonedas = response.data
        }
      });
    this.filteredMoneda = this.ctrlMoneda.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor;
        return name ? this._filter(name as string) : this.listaMonedas.slice();
      }),
    );

  }

  displayFn(data: ComboData): string {
    return data && data.valor ? data.valor : '';
  }

  private _filter(name: string): ComboData[] {
    return this.listaMonedas.filter(x => x.valor.toLowerCase().includes(name.toLowerCase()));
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
  realizarEnvioCodigo() {
    this.dialogRef.close(
    {
      idMoneda : this.idCurrency,
      moneda : this.currentPaidCapitalCurrencyInforme.valor,
      monto : this.capital,
      observacion :this.commentary,
      observacionIng : this.commentaryEng
    });
  }
}
