import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-capital-pagado',
  templateUrl: './capital-pagado.component.html',
  styleUrls: ['./capital-pagado.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
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
    @Inject(MAT_DIALOG_DATA) public data: any, private comboService : ComboService) {
    this.filteredMoneda = new Observable<ComboData[]>()
    if(data){
      console.log(data)
      this.idCurrency = data.moneda
      this.capital = data.monto
      this.commentary = data.observacion
      this.commentaryEng = data.observacionIng
    }
  }

  ngOnInit() {
    this.comboService.getTipoMoneda().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaMonedas = response.data
        }
      }).add(
        () => {
          console.log(this.listaMonedas)
          this.currentPaidCapitalCurrencyInforme = this.listaMonedas.filter(x => x.id === this.idCurrency)[0]
        }
      );
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
      monto : this.capital,
      observacion :this.commentary,
      observacionIng : this.commentaryEng
    });
  }
}
