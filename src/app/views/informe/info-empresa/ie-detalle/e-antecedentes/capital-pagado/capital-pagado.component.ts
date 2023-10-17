import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface CapitalPagadoData{
  moneda : string
  monto : string
  observacion : string
  observacionIng : string
}
export interface MonedaData{
  codigo : string
  name : string
}

@Component({
  selector: 'app-capital-pagado',
  templateUrl: './capital-pagado.component.html',
  styleUrls: ['./capital-pagado.component.scss']
})
export class CapitalPagadoComponent implements OnInit {

  moneda : MonedaData
  monto = ""
  observacion = ""
  observacionIng = ""

  @Output()
  eventCapitalPagado = new EventEmitter<CapitalPagadoData>();

  options: MonedaData[] = [
    {
      codigo : 'PEN',
      name: 'PEN - Nuevos Soles (S/.)'
    },
    {
      codigo : 'USD',
      name: 'USD - Dolár EstadoUnidense ($)'
    },
    {
      codigo : 'EUR',
      name: 'EUR - Euro (€)'
    },
    {
      codigo : 'JPY',
      name: 'JPY - Yen Japonés (¥)'
    },
    {
      codigo : 'MXN',
      name: 'MXN - Peso Mexicano ($)'
    },
    {
      codigo : 'CLP',
      name: 'CLP - Peso Chileno ($)'
    },
    {
      codigo : 'INR',
      name: 'INR -Rupia India (₹)'
    },
    {
      codigo : 'RUB',
      name: 'RUB - Rublo Ruso (₽)'
    }];
  filteredOptions: Observable<MonedaData[]>;
  controlMoneda = new FormControl<string | MonedaData>('');

  selectMoneda(event : any){
    console.log(event)
  }

  constructor(public dialogRef: MatDialogRef<CapitalPagadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CapitalPagadoData
  ) {
    console.log(data)
    this.filteredOptions = new Observable<MonedaData[]>();
    this.moneda = this.options.filter(option => option.codigo.toLocaleLowerCase().includes(data.moneda.toLowerCase()))[0]

    this.monto = data.monto
    this.observacion = data.observacion
    this.observacionIng = data.observacionIng
  }

  ngOnInit() {
    this.filteredOptions = this.controlMoneda.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

  }

  displayFn(user: MonedaData): string {
    return user && user.codigo ? user.codigo : '';
  }

  private _filter(name: string): MonedaData[] {
    return this.options.filter(option => option.name.toLowerCase().includes(name.toLowerCase()));
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
  realizarEnvioCodigo() {
    this.dialogRef.close(
      {
        capitalPagado : {
          moneda : this.moneda.codigo,
          monto : this.monto,
          observacion :this.observacion,
          observacionIng : this.observacionIng
        }
       });
  }
}
