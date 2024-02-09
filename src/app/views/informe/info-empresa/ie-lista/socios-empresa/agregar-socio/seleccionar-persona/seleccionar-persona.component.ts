import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TPersona } from 'app/models/informes/persona/datos-generales';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-seleccionar-persona',
  templateUrl: './seleccionar-persona.component.html',
  styleUrls: ['./seleccionar-persona.component.scss'],
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
export class SeleccionarPersonaComponent implements OnInit{
  //FILTRAR
  nombreCompleto = ''
  idPais = 0
  filtroRB = 'C'
  chkConInforme = true

  columnsToDisplay = ['creditRisk', 'language', 'name', 'taxNumber', 'lastReportDate', 'country', 'traductionPercentage', 'quality','birthDate','profession','acciones' ];
  dataSource: MatTableDataSource<TPersona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SeleccionarPersonaComponent>,
  private comboService : ComboService, private personaService : DatosGeneralesService){
    this.filterPais = new Observable<Pais[]>()
    this.dataSource = new MatTableDataSource()
  }
  ngOnInit(): void {
    this.comboService.getPaises().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = response.data;
        }
      }
    ).add(
      () => {
        if(localStorage.getItem('busquedaPersonas')){
          const busqueda = JSON.parse(localStorage.getItem('busquedaPersonas')+'')
          this.nombreCompleto = busqueda.nombreCompleto
          this.filtroRB = busqueda.filtro
          if(busqueda.idCountry > 0){
            this.idPais = busqueda.idCountry
            this.paisSeleccionado = this.paises.filter(x => x.id === busqueda.idCountry)[0]
            this.iconoSeleccionado = this.paisSeleccionado.bandera
          }else{
            this.limpiarSeleccionPais()
          }
          this.paisSeleccionado = this.paises.filter(x => x.id === busqueda.idPais)[0]
          this.chkConInforme = busqueda.conInforme
          if(this.nombreCompleto!= null && this.nombreCompleto !== ''){
            this.filtrarPersonas()
          }
        }
      }
    )
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
  seleccionarPersona(idPerson : number){
    this.dialogRef.close({
      idPerson : idPerson
    })
  }
  cerrar(){
    this.dialogRef.close({
      idPerson : 0
    })
  }
  filtrarPersonas(){
    const listaPersonas = document.getElementById('loader-lista-persona') as HTMLElement | null;
    if(listaPersonas){
      listaPersonas.classList.remove('hide-loader');
    }
    const busqueda = {
      nombreCompleto : this.nombreCompleto,
      filtro : this.filtroRB,
      idPais : this.idPais,
      conInforme : this.chkConInforme
    }
    localStorage.setItem('busquedaPersonas', JSON.stringify(busqueda))
    this.personaService.getList(this.nombreCompleto.trim(), this.filtroRB, this.idPais, this.chkConInforme).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource = new MatTableDataSource<TPersona>(response.data);

          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }
      },(error) => {
        if(listaPersonas){
          listaPersonas.classList.add('hide-loader');
        }
        Swal.fire({
          title: 'Ocurrió un problema. Comunicarse con Sistemas.',
          text: error,
          icon: 'warning',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok',
          width: '40rem',
          heightAuto : true
        }).then(() => {
        })
      }).add(() => {
        if(listaPersonas){
          listaPersonas.classList.add('hide-loader');
        }
      })
  }
}

