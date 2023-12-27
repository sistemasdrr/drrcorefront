import { formatDate } from '@angular/common';
import { EmpresaPersonaService } from 'app/services/empresa-persona.service';
import { PaisService } from './../../../services/pais.service';
import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
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
import { TicketService } from 'app/services/pedidos/ticket.service';
import { HistorialPedido } from 'app/models/pedidos/ticket';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  tipo = ""
  cupon = ""

  id = 0
  number = 0
  idSubscriber = 0
  revealName = false
  nameRevealed = ""
  referenceNumber = ""
  language = ""
  queryCredit = ""
  timeLimit = ""
  aditionalData = ""
  about = ""
  orderDate = ""
  expireDate = ""
  realExpireDate = ""
  idContinent = 0
  idCountry = 0
  reportType = ""
  procedureType = ""
  idCompany = 0
  idPerson = 0
  busineesName = ""
  comercialName = ""
  taxType = ""
  taxCode = ""
  email = ""
  address = ""
  city = ""
  telephone = ""
  creditrisk = 0
  enable = true
  requestedName = ""


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
  precio = 0
  countryAbonado : Pais = {
    id : 0,
    valor : "",
    bandera : ""
  }

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
  talCualfueSolicitadoInforme = ""
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

  continentes: data[] = [];

  columnsToDisplay = ['tipo', 'cupon', 'nombreSolicitado', 'despacho', 'abonado', 'tramite'];
  dataSource: MatTableDataSource<HistorialPedido>;

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
    private router : Router,
    private abonadoService : AbonadoService,
    private paisService : PaisService,
    private empresaPersonaService : EmpresaPersonaService,
    private pedidoService : PedidoService,
    private datosEmpresaService : DatosEmpresaService,
    private comboService : ComboService,
    private snackBar: MatSnackBar, private ticketService : TicketService
  ) {
    const tipo = this.activatedRoute.snapshot.paramMap.get('tipo');
    if (tipo?.includes('agregar')) {
      this.tipo_formulario = 'agregar'
      this.id = 0
    } else {
      const cupon = this.activatedRoute.snapshot.paramMap.get('cupon');
      this.tipo_formulario = 'editar'
      this.id = parseInt(cupon + '')
    }
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
    if(this.id !== 0){

    }else{
      this.ticketService.getTicketActual().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.number = response.data.intValue
            this.cupon = response.data.strValue
          }
        }
      )
    }
    this.selectContinente(this.idContinent)

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

    this.dataSource = new MatTableDataSource();
  }
  selectContinente(idContinent : number){
    this.abonadoService.getPaises(this.idSubscriber, this.idContinent).subscribe(
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
      this.abonadoService.getPreciosPorPais(this.idSubscriber,this.idContinent,this.idCountry).subscribe(
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
        console.log(response)
        if(response.isSuccess === true && response.isWarning === false){
          const abonado : Abonado = response.data
          if(abonado){
            this.idSubscriber = data.id
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
        this.abonadoService.getContinentes(this.idSubscriber).subscribe(response => {
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

              this.idCreditRisk = datosEmpresa.idCreditRisk
            }
          }
        }
      ).add(
        () => {
          this.ticketService.getTipoReporte(data.idCompany, 'E').subscribe(
            (response) => {
              console.log(response)
              if(response.isSuccess === true && response.isWarning === false){
                const tipoReporte = response.data
                if(tipoReporte){
                  this.tipoInforme = tipoReporte.typeReport
                  if(tipoReporte.lastSearchedDate !== "" && tipoReporte.lastSearchedDate !== null){
                    const lastSearched = tipoReporte.lastSearchedDate.split("/")
                    if(lastSearched.length > 0){
                      this.fechaInformeDate = new Date(parseInt(lastSearched[2]),parseInt(lastSearched[0])-1,parseInt(lastSearched[1]))
                    }else{
                      this.fechaInformeDate = null
                    }
                  }
                  this.dataSource.data = tipoReporte.listSameSearched
                }
              }
            }
          )
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
  filtrar(event : KeyboardEvent){
    if(event.code === 'Enter' || event.code === 'NumpadEnter'){
      if(this.codAbonado.length > 3){
        this.abonadoService.getAbonadoPorCode(this.codAbonado).subscribe(
          (response) => {
            console.log(response)
            if(response.isSuccess === true && response.isWarning === false){
              const abonado : Abonado = response.data
              if(abonado){
                this.idSubscriber = abonado.id
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
            this.abonadoService.getContinentes(this.idSubscriber).subscribe(response => {
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
