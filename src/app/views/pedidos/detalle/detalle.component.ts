import { formatDate } from '@angular/common';
import { EmpresaPersonaService } from 'app/services/empresa-persona.service';
import { PaisService } from './../../../services/pais.service';
import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { ReportesSolicitados } from 'app/models/informes/reportes-solicitados';
import { RequestedReportsService } from 'app/services/pedidos/reportes-solicitados.service';
import { Pais } from 'app/models/pais';
import { PedidoService } from 'app/services/pedido.service';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'app/services/mantenimiento/personal.service';
import { ComboService } from 'app/services/combo.service';
import { RiesgoCrediticio } from 'app/models/combo';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { ListaAbonadosComponent } from './lista-abonados/lista-abonados.component';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { Abonado, Precio } from 'app/models/mantenimiento/abonado';

interface Idioma {
  value: string;
  viewValue: string;
}
interface TipoInforme {
  id: number;
  value: string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  language = ""

  /**/
  paisSeleccionado = 0
  iconoSeleccionado = ""
  buscarPorNombreInforme = ""
  buscarPorNombre(nombreInforme : string){
    let informe = this.empresaPersonaService.getEmpresasPersonas()
    informe = informe.filter(x => x.nombreSolicitado === nombreInforme)
    if(informe){
      this.paisSeleccionado = informe[0].pais
      this.ruc = informe[0].ruc
      this.continente = informe[0].continente
      this.ciudad = informe[0].ciudad
      this.direccion = informe[0].direccion
      this.correo = informe[0].correo
      this.telefono = informe[0].telefono
    }
  }

  idContinent = 0
  precio = 0
  countryAbonado : Pais = {
    id : 0,
    valor : "",
    bandera : ""
  }
  idCountry = 0

  //DATOS GENERALES
  informePara = "E"
  tipoTramite : Precio = {
    name : "",
    price : 0,
    days : 0
  }
  fechaIngreso = ""
  fechaIngresoDate : Date = new Date()
  fechaVencimiento = ""
  fechaVencimientoDate : Date = new Date(this.fechaIngresoDate.getFullYear(),this.fechaIngresoDate.getMonth(),this.fechaIngresoDate.getDate()+6)
  fechaVencimientoReal = ""
  fechaVencimientoRealDate : Date | null = new Date(this.fechaIngresoDate.getFullYear(),this.fechaIngresoDate.getMonth(),this.fechaIngresoDate.getDate()+5)
  fechaInforme = ""
  fechaInformeDate : Date | null = new Date()

  listaPrecio : Precio[] = []
  //FORM ABONADO
  idAbonado = 0
  abonadoNoEncontrado = ""
  nombreAbonado = ""
  isChecked = true;
  pais = ""
  codigoPais = ""
  estado = true
  nmrReferencia = ""
  creditoConsultado = ""
  indicacionesAbonado = ""
  datosAdicionales = ""

  //FORM EMPRESA
  razonSocialInforme = ""
  nombreComercialInforme = ""
  tipoRT = ""
  codigoRT = ""
  ruc = ""
  continente = ""
  paisEmp = ""
  ciudad = ""
  direccion = ""
  correo = ""
  telefono = ""

  //FORM PERSONA
  apellidosNombresInforme = ""
  tipoDI = ""
  codigoDI = ""
  codigoRuc = ""
  situacionRuc = ""
  estadoCivil = ""
  ciudadPersona = ""
  telefonoPersona = ""
  direccionPersona = ""
  idCreditRisk = 0

  calificacionCrediticia : RiesgoCrediticio[] = []

  filterPaisAbonado : Observable<Pais[]>
  filterPaisEmpresa : Observable<Pais[]>
  filterPaisPersona : Observable<Pais[]>
  controlPaisesAbonado = new FormControl<string | Pais>('')
  controlPaisesEmpresa = new FormControl<string | Pais>('')
  controlPaisesPersona = new FormControl<string | Pais>('')
  paisesAbonado : Pais[] = []
  paisesEmpresa : Pais[] = []
  paisesPersona : Pais[] = []
  paisAbonado : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }
  paisEmpresa : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }
  paisPersona : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }
  /**/
  idiomas: Idioma[] = [
    {value: 'SPANISH', viewValue: 'Español'},
    {value: 'ENGLISH', viewValue: 'Inglés'}
  ];
  continentes: data[] = [];
  tipoInformes: TipoInforme[] = [
    {id: 1, value: 'RV'},
    {id: 2, value: 'OR'}
  ];

  columnsToDisplay = ['tipo', 'cupon', 'nombreSolicitado', 'despacho', 'abonado', 'tramite', 'pais', 'balance', 'calidad', 'estado' ];
  dataSource: MatTableDataSource<ReportesSolicitados>;

  public tipo_formulario: string | null = '';
  public formulario: string = '';
  public nmrCupon: string | null = '';

  idiomaSeleccionado = ""
  idCountryEmpresa = 0
  tipoInforme = ""

  codAbonado = ''
  nombre_abonado = "SI"
  breadscrums = [
    {
      title: '',
      items: [''],
      active: '',
    },
  ];
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private requestedReportsService : RequestedReportsService,
    private router : Router,
    private abonadoService : AbonadoService,
    private paisService : PaisService,
    private empresaPersonaService : EmpresaPersonaService,
    private pedidoService : PedidoService,
    private datosEmpresaService : DatosEmpresaService,
    private comboService : ComboService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
    this.filterPaisAbonado = new Observable<Pais[]>()
    this.filterPaisEmpresa = new Observable<Pais[]>()
    this.filterPaisPersona = new Observable<Pais[]>()



  }
  ngOnInit() {
    this.filterPaisAbonado = this.controlPaisesAbonado.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisAbonado(name as string) : this.paisesAbonado.slice()
      }),
    )
    this.filterPaisEmpresa = this.controlPaisesEmpresa.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisEmpresa(name as string) : this.paisesEmpresa?.slice()
      }),
    )
    this.filterPaisPersona = this.controlPaisesPersona.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisPersona(name as string) : this.paisesPersona.slice()
      }),
    )
    this.selectContinente(this.idContinent)

    this.tipo_formulario = this.activatedRoute.snapshot.paramMap.get('tipo');
    this.nmrCupon = this.activatedRoute.snapshot.paramMap.get('cupon');
    this.comboService.getRiesgoCrediticio().subscribe((response) =>{
      if(response.isSuccess === true && response.isWarning === false){
        this.calificacionCrediticia = response.data
      }
    })

    if (this.tipo_formulario == 'editar') {
      this.breadscrums = [
        {
          title: 'Editar Cupón',
          items: ['Producción', 'Pedidos'],
          active: 'Editar',
        },
      ];
      const pedido = this.pedidoService.getPedidosPorCupon(this.nmrCupon+'')[0]
      if(pedido){
        this.codAbonado = pedido.codigo
        this.informePara = pedido.informeEP
        this.fechaIngreso = pedido.fechaIngreso
        const fechaIngreso = pedido.fechaIngreso.split('/')
        this.fechaIngresoDate = new Date(parseInt(fechaIngreso[2]),(parseInt(fechaIngreso[1])-1),parseInt(fechaIngreso[0]))
        if(this.informePara === 'E'){
          // const datosEmpresa = this.datosEmpresaService.getDatosEmpresaPorCodigo(pedido.codigoInforme)
          // console.log(datosEmpresa)
          // if(datosEmpresa){
          //   this.razonSocialInforme = datosEmpresa[0].razonSocial
          //   this.nombreComercialInforme = datosEmpresa[0].nombreComercial
          //   this.tipoRT = datosEmpresa[0].tipoRuc
          //   this.codigoRT = datosEmpresa[0].codigoRuc
          //   this.correo = datosEmpresa[0].emailCorporativo
          //   this.paisEmpresa = datosEmpresa[0].pais
          //   this.ciudad = datosEmpresa[0].dptoEstado
          //   this.telefono = datosEmpresa[0].numeroTelefono
          //   this.direccion = datosEmpresa[0].direccionCompleta
          //   this.riesgoCrediticioInforme = datosEmpresa[0].riesgoCrediticio
          //   this.tipoInforme = pedido.tipoInforme
          //   this.tipoTramite = pedido.tipoTramite
          //   this.fechaInforme = datosEmpresa[0].informeInvestigadoEl
          //   const fechaInforme = datosEmpresa[0].informeInvestigadoEl.split('/')
          //   if(fechaInforme){
          //     this.fechaInformeDate = new Date(parseInt(fechaInforme[2]),(parseInt(fechaInforme[1])-1),parseInt(fechaInforme[0]))
          //   }
          // }
        }else if(this.informePara === 'P'){
        }

      }

    } else if (this.tipo_formulario == 'agregar') {
      this.breadscrums = [
        {
          title: 'Nuevo Cupón',
          items: ['Producción', 'Pedidos'],
          active: 'Nuevo',
        },
      ];
      this.nmrCupon = 'NUEVO'
    }

    this.dataSource = new MatTableDataSource(this.requestedReportsService.getRequestedReports());
  }
  selectContinente(idContinent : number){
    this.abonadoService.getPaises(this.idAbonado, this.idContinent).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paisesEmpresa = []
          this.paisesEmpresa = response.data
          this.limpiarSeleccionPais()
        }
      })
  }
  cambioPais(pais: Pais) {
    console.log(pais)
    if (typeof pais === 'string' || pais === null || this.countryAbonado.id === 0) {
      this.iconoSeleccionado = ""
      this.idCountry = 0
    } else {
      this.iconoSeleccionado = pais.bandera
      this.idCountry = pais.id
      this.abonadoService.getPreciosPorPais(this.idAbonado,this.idContinent,this.idCountry).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.listaPrecio = response.data
          }
        }
      )
    }
  }
  tipotramite(){
    this.precio = this.tipoTramite.price
  }
  limpiarSeleccionPais() {
    this.controlPaisesEmpresa.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  private _filterPaisAbonado(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesAbonado.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPaisAbonado(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  private _filterPaisEmpresa(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesEmpresa.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPaisEmpresa(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  private _filterPaisPersona(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesPersona.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPaisPersona(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  revelarNombre(){
    if(this.isChecked){
      this.nombre_abonado = "SI"
    }else{
      this.nombre_abonado = "NO"
      this.nombreAbonado = ""
    }
  }
  TipoFormulario(tipo: string) {
    this.tipo_formulario = tipo;
  }
  getTipoFormulario(): string {
    return this.tipo_formulario || '';
  }
  buscarAbonado() {
    const dialogRef = this.dialog.open(ListaAbonadosComponent, {
    data: {
      mensaje: 'Abonado',
    },
  });
    dialogRef.afterClosed().subscribe((data) => {
     console.log(data)
     this.abonadoService.getAbonadoPorId(data.id).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          const abonado : Abonado = response.data
          if(abonado){
            this.idAbonado = data.id
            this.codAbonado = abonado.code
            this.isChecked = abonado.revealName
            this.estado = abonado.enable;
            this.indicacionesAbonado = abonado.indications;
            this.datosAdicionales = abonado.observations;
            this.language = abonado.language
          }
        }
      }
     ).add(
      () => {
        this.abonadoService.getContinentes(this.idAbonado).subscribe(response => {
          if(response.isSuccess == true){
            console.log(response)
            this.continentes = response.data;
            this.idContinent = 0
            this.limpiarSeleccionPais()
            this.listaPrecio = []
            this.idCountry = 0
            this.precio = 0
          }
        })
      }
     )
    });
  }
  buscarEmpresaPersona() {
    const dialogRef1 = this.dialog.open(ListaEmpresasComponent, {
      data: {
      },
    });
    dialogRef1.afterClosed().subscribe((data) => {
      console.log(data.idCompany)
      if(data.idCompany > 0){
      this.datosEmpresaService.getDatosEmpresaPorId(data.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const datosEmpresa = response.data
            if(datosEmpresa){
              this.razonSocialInforme = datosEmpresa.name
              this.nombreComercialInforme = datosEmpresa.socialName
              this.tipoRT = datosEmpresa.taxTypeName
              this.codigoRT = datosEmpresa.taxTypeCode
              this.correo = datosEmpresa.email
              this.ciudad = datosEmpresa.place
              this.direccion = datosEmpresa.address
              this.telefono = datosEmpresa.telephone
              if(datosEmpresa.lastSearched !== "" && datosEmpresa.lastSearched !== null){
                const lastSearched = datosEmpresa.lastSearched.split("/")
                if(lastSearched.length > 0){
                  console.log(datosEmpresa.lastSearched)
                  this.fechaInformeDate = new Date(parseInt(lastSearched[2]),parseInt(lastSearched[0])-1,parseInt(lastSearched[1]))
                  const now = new Date()
                  if(this.fechaInformeDate > new Date(now.getFullYear(), now.getMonth()-3, now.getDate())){
                    this.tipoInforme = "EF"
                    console.log(new Date(now.getFullYear(), now.getMonth()-3, now.getDate()))
                  }else{
                    this.tipoInforme = "RV"
                  }
                }else{
                  this.fechaInformeDate = null
                }
              }
              this.idCreditRisk = datosEmpresa.idCreditRisk
            }
          }
        }
      )
      }
    });
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  volver(){
    this.router.navigate(['pedidos/lista']);
  }

  // asignarDatosAbonado() {
  //   const abonado: Abonado | null = this.abonadoService.getAbonadoPorCodigo(this.codAbonado);
  //   console.log(abonado)
  //   if (abonado !== null) {
  //     this.nombreAbonado = abonado.codigo + ' - ' + abonado.nombre;
  //     this.isChecked = abonado.revelarNombre;
  //     this.paisAbonado = abonado.pais
  //     this.estado = abonado.estado;
  //     this.nmrReferencia = abonado.nroReferencia;
  //     this.creditoConsultado = abonado.creditoConsultado;
  //     this.indicacionesAbonado = abonado.indicaciones;
  //     this.datosAdicionales = abonado.dtsAdicionales;
  //     this.abonadoNoEncontrado = "Abonado Encontrado"
  //   } else {
  //     this.nombreAbonado = ""
  //     this.isChecked = false
  //     this.paisAbonado = {
  //       id : 0,
  //       valor : '',
  //       bandera : ''
  //     }
  //     this.estado = ""
  //     this.nmrReferencia = ""
  //     this.creditoConsultado = ""
  //     this.indicacionesAbonado = ""
  //     this.datosAdicionales = ""
  //     this.abonadoNoEncontrado = "No se encontró el abonado"
  //   }
  // }
  filtrar(event : any){
    if(event.code == 'Enter'){
      if(this.codAbonado.length > 3){
        this.abonadoService.getAbonadoPorCode(this.codAbonado).subscribe(
          (response) => {
            console.log(response)
            if(response.isSuccess === true && response.isWarning === false){
              const abonado : Abonado = response.data
              if(abonado){
                this.idAbonado = abonado.id
                this.codAbonado = abonado.code
                this.isChecked = abonado.revealName
                if(abonado.revealName === true){
                  this.nombreAbonado = abonado.name
                }
                this.estado = abonado.enable;
                this.indicacionesAbonado = abonado.indications;
                this.datosAdicionales = abonado.observations;
                this.language = abonado.language
              }
            }
          }
        ).add(
          () => {
            this.abonadoService.getContinentes(this.idAbonado).subscribe(response => {
              if(response.isSuccess == true){
                console.log(response)
                this.continentes = response.data;
              }
            })
          }
         )
      }
    }
  }
}
