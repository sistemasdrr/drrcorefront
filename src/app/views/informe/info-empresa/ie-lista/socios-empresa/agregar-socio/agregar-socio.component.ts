import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ComboData } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { SociosEmpresaService } from 'app/services/informes/empresa/socios-empresa.service';
import { Observable, map, startWith } from 'rxjs';
import { SeleccionarPersonaComponent } from './seleccionar-persona/seleccionar-persona.component';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';

@Component({
  selector: 'app-agregar-socio',
  templateUrl: './agregar-socio.component.html',
  styleUrls: ['./agregar-socio.component.scss']
})
export class AgregarSocioComponent implements OnInit {
  titulo = ""

  fullname = ""
  lastSearched = ""
  lastSearchedD : Date | null = null
  language = ""
  idPersonSituation = 0
  nationality = ""
  birthDate = ""
  birthDateD : Date | null = null
  idDocumentType = 0
  codeDocumentType = ""
  taxTypeName = ""
  taxTypeCode = ""
  idLegalRegisterSituation = 0


  id = 0
  idCompany = 0
  idPerson = 0
  mainExecutive = false
  idProfession = 0
  participation = 0
  startDate = ""
  startDateD : Date | null = null

  situacionPersona : ComboData[] = []
  tipoDocumento : ComboData[] = []

  controlSituacionRUC = new FormControl<string | ComboData>('');
  filterSituacionRuc: Observable<ComboData[]>
  situacionRuc: ComboData[] = []
  situacionRucInforme: ComboData = {
    id: 0,
    valor: ''
  }
  msgSituacionRuc = ""
  colorMsgSituacionRuc = ""

  controlProfesion = new FormControl<string | ComboData>('');
  filterProfesion: Observable<ComboData[]>
  listaProfesion: ComboData[] = []
  profesion: ComboData = {
    id: 0,
    valor: ''
  }
  msgProfesion = ""
  colorMsgProfesion = ""

  constructor(private comboService : ComboService,
    private sociosEmpresaService : SociosEmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog,
    private datosGeneralesService : DatosGeneralesService){
    if(data.id !== 0){
      this.id = data.id
    }
    this.idCompany = data.idCompany
    this.filterSituacionRuc = new Observable<ComboData[]>()
    this.filterProfesion = new Observable<ComboData[]>()
  }
  ngOnInit(): void {
    this.comboService.getProfesion().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaProfesion = response.data
        }
      }
    )
    this.comboService.getSituacionPersona().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.situacionPersona = response.data
        }
      }
    )
    this.comboService.getTipoDocumento().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.tipoDocumento = response.data
        }
      }
    )
    this.comboService.getSituacionRUC().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.situacionRuc = response.data
        }
      }
    )
    if(this.id !== 0){
      this.titulo = "Editar Socio"
      this.sociosEmpresaService.getCompanyPartner(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const socio = response.data
            if(socio){
              this.idPerson = socio.idPerson
              this.mainExecutive = socio.mainExecutive
              this.idProfession = socio.idProfession
              this.participation = socio.participation
              if(socio.startDate !== null && socio.startDate !== ""){
                const fecha = socio.startDate.split("/")
                if(fecha.length > 0){
                  this.startDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.startDate = socio.startDate
                }
              }
            }
          }
        }
      )
    }else{
      this.titulo = "Agregar Socio"
    }
    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
    this.filterProfesion = this.controlProfesion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterProfesion(name as string) : this.listaProfesion.slice()
      }),
    )
  }
  selectIdioma(idioma: string) {
    this.language = idioma;
  }
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.lastSearched = this.formatDate(selectedDate);
    }
  }
  selectFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.birthDate = this.formatDate(selectedDate);
    }
  }
  selectFechaInicio(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  private _filterSituacionRuc(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.valor.toLowerCase().includes(filterValue));
  }

  displaySituacionRuc(situacionRuc : ComboData): string {
    return situacionRuc && situacionRuc.valor ? situacionRuc.valor : '';
  }
  limpiarSeleccionSituacionRUC() {
    this.controlSituacionRUC.reset();
    this.idLegalRegisterSituation = 0
  }
  cambioSituacionRuc(situacionRuc: ComboData) {
    if (typeof situacionRuc === 'string' || situacionRuc === null) {
      this.msgSituacionRuc = "Seleccione una opción."
      this.idLegalRegisterSituation = 0
      this.colorMsgSituacionRuc = "red"
    } else {
      this.msgSituacionRuc = "Opción Seleccionada."
      this.idLegalRegisterSituation = situacionRuc.id
      this.colorMsgSituacionRuc = "green"
    }
    console.log(this.idLegalRegisterSituation)
  }
  private _filterProfesion(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.listaProfesion.filter(profesion => profesion.valor.toLowerCase().includes(filterValue));
  }

  displayProfesion(profesion : ComboData): string {
    return profesion && profesion.valor ? profesion.valor : '';
  }
  limpiarSeleccionProfesion() {
    this.controlProfesion.reset();
    this.idProfession = 0
  }
  cambioProfesion(profesion: ComboData) {
    if (typeof profesion === 'string' || profesion === null) {
      this.msgProfesion = "Seleccione una opción."
      this.idProfession = 0
      this.colorMsgProfesion = "red"
    } else {
      this.msgProfesion = "Opción Seleccionada."
      this.idProfession = profesion.id
      this.colorMsgProfesion = "green"
    }
    console.log(this.idProfession)
  }
  seleccionarPersona(){
    const dialogRef = this.dialog.open(SeleccionarPersonaComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.idPerson !== 0 && data !== undefined) {
        this.idPerson = data.idPerson
        console.log(data)
      }
    }).add(
      () => {
        if(this.idPerson !== 0){
          this.datosGeneralesService.getPersonaById(this.idPerson).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const persona = response.data
                if(persona){
                  this.fullname = persona.fullname
                  this.language = persona.language
                  this.idPersonSituation = persona.idPersonSituation
                  this.nationality = persona.nationality
                  this.idDocumentType = persona.idDocumentType
                  this.codeDocumentType = persona.codeDocumentType
                  this.taxTypeName = persona.taxTypeName
                  this.taxTypeCode = persona.taxTypeCode
                  this.idLegalRegisterSituation = persona.idLegalRegisterSituation
                  if(persona.lastSearched !== null && persona.lastSearched !== ""){
                    const fecha = persona.lastSearched.split("/")
                    if(fecha.length > 0){
                      this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.lastSearched = persona.lastSearched
                    }
                  }
                  if(persona.birthDate !== null && persona.birthDate !== ""){
                    const fecha = persona.birthDate.split("/")
                    if(fecha.length > 0){
                      this.birthDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.birthDate = persona.birthDate
                    }
                  }
                }
              }
            }
          ).add(
            () => {
              if(this.idLegalRegisterSituation !== null && this.idLegalRegisterSituation !== 0){
                this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
              }
            }
          )
        }
      }
    )
  }
  borrarSeleccion(){
    this.idPerson = 0
    this.fullname = ""
    this.language = ""
    this.idPersonSituation = 0
    this.nationality = ""
    this.idDocumentType = 0
    this.codeDocumentType = ""
    this.taxTypeCode = ""
    this.taxTypeName = ""
    this.idLegalRegisterSituation = 0
    this.situacionRucInforme = {
      id: 0,
      valor: ''
    }
  }
}
