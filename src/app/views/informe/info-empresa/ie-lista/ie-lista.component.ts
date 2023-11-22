import { PaisService } from './../../../../services/pais.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TCompany } from 'app/models/informes/empresa/datos-empresa';
import { Pais } from 'app/models/pais';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ie-lista',
  templateUrl: './ie-lista.component.html',
  styleUrls: ['./ie-lista.component.scss']
})
export class IEListaComponent implements OnInit{
  private readonly CACHE_KEY = 'authCache';
  breadscrums = [
    {
      title: 'Lista de Empresas',
      subtitle: '',
      codigoInforme : '',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Empresa',
    },
  ];
  loading : boolean = false
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
  //FILTROS
  razonSocial = ""
  filtroRB = "C"
  idPais = 0
  chkConInforme = true


  dataSource: MatTableDataSource<TCompany>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;
  columnsToDisplay = ['rc', 'idioma', 'rucInit', 'razonSocial', 'datosAl', 'pais', 'traduccion', 'calificacion','ejecPrincipal','acciones' ];

  constructor(private datosEmpresaService : DatosEmpresaService,private router : Router, private paisService : PaisService){
    this.dataSource = new MatTableDataSource()
    this.filterPais = new Observable<Pais[]>()
    this.loading = true
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()

    this.paisService.getPaises().subscribe((response) => {
      if (response.isSuccess == true) {
        this.paises = response.data;
      }
    }).add(() => {
      if(localStorage.getItem('busquedaEmpresas')){
        const busqueda = JSON.parse(localStorage.getItem('busquedaEmpresas')+'')
        this.razonSocial = busqueda.razonSocial
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
        this.filtrarEmpresas()
      }
    })

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
    this.loading = false
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
      this.filtrarEmpresas()
    }
  }
  limpiar(){
    this.razonSocial = ""
    this.filtroRB = "C"
    this.idPais = 0
    this.paisSeleccionado = {
      id: 0,
      valor: '',
      bandera: ''
    }
    this.chkConInforme = true
    
    this.filtrarEmpresas()
  }
  filtrarEmpresas(){
    const listaEmpresas = document.getElementById('loader-lista-empresas') as HTMLElement | null;
    if(listaEmpresas){
      listaEmpresas.classList.remove('hide-loader');
    }
    const busqueda = {
      razonSocial : this.razonSocial,
      filtro : this.filtroRB,
      idPais : this.idPais,
      conInforme : this.chkConInforme
    }
    localStorage.setItem('busquedaEmpresas', JSON.stringify(busqueda))
    this.datosEmpresaService.getDatosEmpresas(this.razonSocial.trim(), this.filtroRB, this.idPais, this.chkConInforme).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource = new MatTableDataSource(response.data)
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }
      }).add(() => {
        if(listaEmpresas){
          listaEmpresas.classList.add('hide-loader');
        }
      })

  }
  agregarEmpresa(){
    this.router.navigate(['informes/empresa/detalle/nuevo']);
  }

  eliminarEmpresa(id : number){
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
        this.datosEmpresaService.deleteDatosEmpresa(id).subscribe(
          (response) => {
            console.log(response)
          }
        ).add(() => {
          this.filtrarEmpresas()
        })
      }
    });
  }
}
