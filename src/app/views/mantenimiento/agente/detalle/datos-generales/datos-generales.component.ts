import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Agente } from 'app/models/mantenimiento/agentes/agente';
import { Pais } from 'app/models/pais';
import { ComboService } from 'app/services/combo.service';
import { AgenteService } from 'app/services/mantenimiento/agente.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-datos-generales-agente',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss']
})
export class DatosGeneralesAgenteComponent implements OnInit {

  //DATOS DEL FORM
  id = 0
  code = ""
  name = ""
  startDate = ""
  startDateD : Date | null = null
  address = ""
  email = ""
  telephone = ""
  fax = ""
  inCharge = ""
  language = ""
  idCountry = 0
  countryAgente : Pais = {
    id : 0,
    valor : "",
    bandera : ""
  }
  observations = ""
  status = true
  specialCase = false
  agenteAbonado = false


  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  msgPais = ""
  colorMsgPais = ""
  iconoSeleccionado = ""

  agenteActual : Agente[] = []
  agenteModificado : Agente[] = []

  constructor(private router : Router, private activatedRoute: ActivatedRoute, private comboService : ComboService, private agenteService : AgenteService){
    this.filterPais = new Observable<Pais[]>()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {

    if(this.id > 0){
      this.comboService.getPaises().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.paises = response.data
          }
        }
      ).add(
        () =>{
          this.agenteService.getAgentePorId(this.id).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const agente = response.data
                if(agente){
                  this.code = agente.code
                  this.name = agente.name
                  this.startDate = agente.startDate
                  if(this.startDate !== "" && this.startDate !== null){
                    const fechaIngreso = this.startDate.split("/")
                    if(fechaIngreso.length > 0){
                      this.startDateD = new Date(parseInt(fechaIngreso[2]),parseInt(fechaIngreso[1]),parseInt(fechaIngreso[0]))
                    }else{
                      this.startDateD = null
                    }
                  }
                  this.address = agente.address
                  this.email = agente.email
                  this.telephone = agente.telephone
                  this.fax = agente.fax
                  this.inCharge = agente.inCharge
                  this.language = agente.language
                  this.idCountry = agente.idCountry
                  this.observations = agente.observations
                  this.status = agente.status
                  this.specialCase = agente.specialCase
                  this.agenteAbonado = agente.agenteAbonado
                }
              }
            }
          ).add(
            () => {
              this.countryAgente = this.paises.filter(x => x.id === this.idCountry)[0]
              this.armarAgenteActual()
              this.armarAgenteModificado()
            }
          )
        }
      )
    }else{
      this.comboService.getPaises().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.paises = response.data
          }
        }
      )
    }
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }

  cambioPais(pais: Pais) {
    console.log(pais)
    if (typeof pais === 'string' || pais === null) {
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
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }

  selectFechaIngreso(event: MatDatepickerInputEvent<Date>) {
    this.startDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  }

  armarAgenteActual(){
    this.agenteActual[0] = {
      id : this.id,
      code : this.code,
      name : this.name,
      startDate : this.startDate,
      address : this.address,
      email : this.email,
      telephone : this.telephone,
      fax : this.fax,
      inCharge : this.inCharge,
      language : this.language,
      idCountry : this.idCountry,
      observations : this.observations,
      status : this.status,
      specialCase : this.specialCase,
      agenteAbonado : this.agenteAbonado
    }
  }
  armarAgenteModificado(){
    this.agenteModificado[0] = {
      id : this.id,
      code : this.code,
      name : this.name,
      startDate : this.startDate,
      address : this.address,
      email : this.email,
      telephone : this.telephone,
      fax : this.fax,
      inCharge : this.inCharge,
      language : this.language,
      idCountry : this.idCountry,
      observations : this.observations,
      status : this.status,
      specialCase : this.specialCase,
      agenteAbonado : this.agenteAbonado
    }
  }
  guardar(){
    this.armarAgenteModificado()
    console.log(this.agenteModificado[0])
  }
  salir(){

  }

}
