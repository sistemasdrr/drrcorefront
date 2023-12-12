import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboData } from 'app/models/combo';
import { Pais } from 'app/models/pais';
import { ComboService } from 'app/services/combo.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss']
})
export class AgregarEditarAgenteComponent implements OnInit {
  titulo = ""
  accion = ""

  //FORM
  id = 0
  date = ""
  dateD : Date | null = null
  idContinent = 0
  idCountry = 0
  countryPrecio : Pais = {
    id : 0,
    valor : "",
    bandera : ""
  }
  idCurrency = 0
  priceT1 = 0
  dayT1 = 0
  priceT2 = 0
  dayT2 = 0
  priceT3 = 0
  dayT3 = 0
  pricePN = 0
  dayPN = 0
  priceBD = 0
  dayBD = 0
  priceRP = 0
  dayRP = 0
  priceCR = 0
  dayCR = 0

  continentes : ComboData[] = []

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  msgPais = ""
  colorMsgPais = ""
  iconoSeleccionado = ""

  constructor(public dialogRef: MatDialogRef<AgregarEditarAgenteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private comboService : ComboService){
    if(data){
      this.id = data.id
    }
    this.filterPais = new Observable<Pais[]>
  }
  ngOnInit(): void {
    this.comboService.getContinentes().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.continentes = response.data
        }
      }
    )
    if(this.id > 0){
      this.titulo = "Editar Precio"
    }else{
      this.titulo = "Agregar Precio"
    }

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  cambioPais(pais: Pais) {
    console.log(pais)
    if (typeof pais === 'string' || pais === null || this.countryPrecio.id === 0) {
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
      this.iconoSeleccionado = ""
      this.idCountry = 0
    } else {
      this.msgPais = "Opción Seleccionada"
      this.colorMsgPais = "green"
      this.iconoSeleccionado = pais.bandera
      this.idCountry = pais.id
    }
    console.log(this.idCountry)
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  selectContinente(idContinent : number){
    this.comboService.getPaisesPorContinente(this.idContinent).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = []
          this.paises = response.data
          console.log(response.data)
          this.limpiarSeleccionPais()
        }
      }
    )
  }
  agregar(){

  }
  editar(){

  }
  salir(){
    this.dialogRef.close()
  }
}
