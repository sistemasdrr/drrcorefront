import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TPersona } from 'app/models/informes/persona/datos-generales';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { SociosPersonaComponent } from './socios-persona/socios-persona.component';
import { MatDialog } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-ip-lista',
  templateUrl: './ip-lista.component.html',
  styleUrls: ['./ip-lista.component.scss'],
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

  columnsToDisplay = ['creditRisk', 'language', 'name', 'taxNumber', 'lastReportDate', 'country', 'traductionPercentage', 'quality','birthDate','profession','acciones' ];
  dataSource: MatTableDataSource<TPersona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private dialog : MatDialog,private router : Router, private comboService : ComboService, private personaService : DatosGeneralesService){
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
          this.loading = false
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
  agregarPersona(){
    this.router.navigate(['informes/persona/detalle/nuevo']);
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
  eliminarPersona(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.personaService.deletePerson(id).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarPersonas()
        })
      }
    });
  }
  activarWebPersona(id : number){
    Swal.fire({
      title: '¿Está seguro de mostrar este registro en la web?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se actualizo correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.personaService.activateWeb(id).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarPersonas()
        })
      }
    });
  }
  desactivarWebPersona(id : number){
    Swal.fire({
      title: '¿Está seguro de ocultar este registro en la web?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se actualizo correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.personaService.desactivateWeb(id).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarPersonas()
        })
      }
    });
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
  sociosPersona(idPerson : number){
    const dialogRef = this.dialog.open(SociosPersonaComponent, {
      data: {
        idPerson : idPerson
      },
    });
  }
}
