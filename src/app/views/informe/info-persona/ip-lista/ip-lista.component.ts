import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pais } from 'app/models/pais';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-ip-lista',
  templateUrl: './ip-lista.component.html',
  styleUrls: ['./ip-lista.component.scss']
})
export class IPListaComponent implements OnInit{
  loading = false

  //FILTRAR
  nombreCompleto = ''
  idPais = 0
  filtroRB = 'C'
  chkConInforme = true

  breadscrums = [
    {
      title: 'Lista de Personas',
      subtitle: '',
      codigoInforme : '',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Persona',
    },
  ];

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  iconoSeleccionado = ""
  paisSeleccionado: Pais = {
    id: 0,
    valor: '',
    bandera: ''
  }
  msgPais = ""
  colorMsgPais = ""

  columnsToDisplay = ['creditRisk', 'language', 'name', 'taxNumber', 'lastReportDate', 'isoCountry', 'traductionPercentage', 'quality','manager','acciones' ];


  constructor(){
    this.filterPais = new Observable<Pais[]>()

  }
  ngOnInit(): void {


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
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idPais = 0
    this.iconoSeleccionado = ""
  }
  cambioPais(pais: Pais) {
    if (pais !== null && pais !== undefined) {
      this.iconoSeleccionado = pais.bandera
      this.idPais = pais.id
      console.log(this.idPais)
      if (typeof pais === 'string' || pais === null) {
        this.msgPais = "Seleccione una opción."
        this.idPais = 0
        this.colorMsgPais = "red"
      } else {
        this.msgPais = "Opción Seleccionada"
        this.colorMsgPais = "green"
      }
    } else {
      this.idPais = 0
      console.log(this.idPais)
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
    }
  }
  agregarPersona(){

  }
  filtrar(event : any){
    if(event.code == 'Enter'){
      this.filtrarPersonas()
    }
  }
  limpiar(){
    this.nombreCompleto = ""
    this.filtroRB = "C"
    this.idPais = 0
    this.paisSeleccionado = {
      id: 0,
      valor: '',
      bandera: ''
    }
    this.chkConInforme = true

    this.filtrarPersonas()
  }
  filtrarPersonas(){

  }
}
