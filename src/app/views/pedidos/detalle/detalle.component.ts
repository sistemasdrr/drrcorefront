import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { Pais } from 'app/models/combo';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { data } from 'app/services/mantenimiento/personal.service';
import { ComboService } from 'app/services/combo.service';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { ListaAbonadosComponent } from './lista-abonados/lista-abonados.component';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { Abonado, Precio } from 'app/models/mantenimiento/abonado';
import { TicketService } from 'app/services/pedidos/ticket.service';
import { HistorialPedido, Ticket } from 'app/models/pedidos/ticket';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
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
export class DetalleComponent implements OnInit {
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
  about = "E"
  orderDate = ""
  orderDateD : Date = new Date();
  expireDate = ""
  expireDateD : Date=new Date();
 
  realExpireDate = ""
  realExpireDateD : Date=new Date();
  idContinent = 0
  idCountry = 0
  reportType = "OR"
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
  remainingCoupons=0;


  /**/
  paisSeleccionado = 0
  iconoSeleccionado = ""

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
  tipoFacturacion=""


  idCreditRisk = 0

  //calificacionCrediticia : RiesgoCrediticio[] = []

  paisesAbonado : Pais[] = []


  continentes: data[] = [];

  columnsToDisplay = ['tipo', 'cupon', 'nombreSolicitado','nombreDespachado', 'despacho', 'abonado', 'tramite'];
  dataSource: MatTableDataSource<HistorialPedido>;

  public tipo_formulario: string | null = '';
  public formulario: string = '';
  public nmrCupon: string | null = '';

  idiomaSeleccionado = ""
  idCountryEmpresa = 0

  codAbonado = ''
  nombre_abonado = "NO"
  breadscrums = [
    {
      title: '',
      items: [''],
      active: '',
    },
  ];

  modeloNuevo : Ticket[] = []
  modeloModificado : Ticket[] = []

  constructor(public dialog: MatDialog,private activatedRoute: ActivatedRoute,private router : Router,
    private abonadoService : AbonadoService,private datosEmpresaService : DatosEmpresaService,
    private comboService : ComboService,private ticketService : TicketService) {
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
  }
  
  ngOnInit() {
    this.expireDateD = this.addDays(5,new Date(this.orderDateD));
      this.realExpireDateD = this.addDays(6,new Date(this.orderDateD));
      this.orderDateD = new Date;
   
    this.loading = true
    if(this.id !== 0){
      this.ticketService.getById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const ticket = response.data
            if(ticket){
              this.number = ticket.number
              this.cupon = ticket.number.toString().padStart(6, '0')
              this.idSubscriber = ticket.idSubscriber
              this.revealName = ticket.revealName
              this.nameRevealed = ticket.nameRevealed
              this.referenceNumber = ticket.referenceNumber
              this.language = ticket.language
              this.queryCredit = ticket.queryCredit
              this.timeLimit = ticket.timeLimit
              this.aditionalData = ticket.aditionalData
              this.about = ticket.about
              this.idContinent = ticket.idContinent
              this.idCountry = ticket.idCountry
              this.reportType = ticket.reportType
              this.procedureType = ticket.procedureType
              this.idCompany = ticket.idCompany
              this.idPerson = ticket.idPerson
              this.busineesName = ticket.busineesName
              this.comercialName = ticket.comercialName
              this.taxType = ticket.taxType
              this.taxCode = ticket.taxCode
              this.email = ticket.email
              this.address = ticket.address
              this.city = ticket.city
              this.telephone = ticket.telephone
              this.creditrisk = 0
              this.enable = ticket.enable
              this.requestedName = ticket.requestedName
              this.precio = ticket.price
              this.orderDateD=ticket.orderDate                
              this.expireDateD=ticket.expireDate
              this.realExpireDateD=ticket.realExpireDate
            
            }
          }
        }
      ).add(
        () => {          
          this.abonadoService.getAbonadoPorId(this.idSubscriber).subscribe(
            (response) => {
              console.log(response)
              if(response.isSuccess === true && response.isWarning === false){
                const abonado : Abonado = response.data
                if(abonado){
                  this.codAbonado = abonado.code
                  this.revealName = abonado.revealName
                  this.nameRevealed = abonado.name
                  this.estado = abonado.enable;
                  this.indicacionesAbonado = abonado.indications;
                  this.aditionalData = abonado.observations;
                  this.language = abonado.language
                  this.tipoFacturacion=abonado.facturationType;
                }
              }
            }
          ).add(
            () => {
              console.log(this.idSubscriber)
              this.abonadoService.getContinentes(this.idSubscriber).subscribe(
                (response) => {
                if(response.isSuccess == true){
                  this.continentes = response.data
                }
              }).add(
                () => {
                  this.abonadoService.getPaises(this.idSubscriber, this.idContinent).subscribe(
                    (response) => {
                      if(response.isSuccess === true && response.isWarning === false){
                        console.log(response.data)
                        this.paisesAbonado = []
                        this.paisesAbonado = response.data
                      }
                    }).add(
                      () => {
                        this.mostrarBandera()
                        this.ticketService.getTipoReporte(this.idCompany, this.about).subscribe(
                          (response) => {
                            console.log(response)
                            if(response.isSuccess === true && response.isWarning === false){
                              const tipoReporte = response.data
                              if(tipoReporte){
                                this.reportType = tipoReporte.typeReport
                                if(tipoReporte.lastSearchedDate !== "" && tipoReporte.lastSearchedDate !== null){
                                  const lastSearched = tipoReporte.lastSearchedDate.split("/")
                                  if(lastSearched.length > 0){
                                    this.fechaInformeDate = new Date(parseInt(lastSearched[2]),parseInt(lastSearched[1])-1,parseInt(lastSearched[0]))
                                  }else{
                                    this.fechaInformeDate = null
                                  }
                                }
                                this.dataSource.data = tipoReporte.listSameSearched
                                this.dataSource.sort = this.sort
                                this.dataSource.paginator = this.paginator
                              }
                            }
                          }
                        ).add(
                          () => {
                          }
                        )
                      }
                    )
                }
              )
            }
          )
        }
      )

      this.loading = false
    }else{

      this.ticketService.getTicketActual().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.number = response.data.intValue
            this.cupon = response.data.strValue
          }
        }
      )
      this.loading = false
    }

    // this.comboService.getRiesgoCrediticio().subscribe((response) =>{
    //   if(response.isSuccess === true && response.isWarning === false){
    //     this.calificacionCrediticia = response.data
    //   }
    // })

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
  addDays(noOfDaysToAdd:number,orderDate:Date){     
    var endDate : Date=new Date, count = 0;
    while(count < noOfDaysToAdd){
        endDate = new Date(orderDate.setDate(orderDate.getDate() + 1));
        if(endDate.getDay() != 0 && endDate.getDay() != 6){           
           count++;
        }
    }
    return endDate;

  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      number : this.number,
      idSubscriber : this.idSubscriber,
      revealName : this.revealName,
      nameRevealed : this.revealName === true ? this.nameRevealed : "",
      referenceNumber : this.referenceNumber,
      language : this.language,
      queryCredit : this.queryCredit,
      timeLimit : this.timeLimit,
      aditionalData : this.aditionalData,
      about : this.about,
      orderDate : new Date(this.orderDateD),
      expireDate : new Date(this.expireDateD),
      realExpireDate : new Date(this.realExpireDateD),
      idContinent : this.idContinent,
      idCountry : this.idCountry,
      reportType : this.reportType,
      procedureType : this.procedureType,
      idCompany : this.idCompany,
      idPerson : 0,
      busineesName : this.busineesName === null ? "" : this.busineesName,
      comercialName : this.comercialName === null ? "" : this.comercialName,
      taxType : this.taxType === null ? "" : this.taxType,
      taxCode : this.taxCode === null ? "" : this.taxCode,
      email : this.email === null ? "" : this.email,
      address :  this.address === null ? "" : this.address,
      city : this.city === null ? "" : this.city,
      telephone : this.telephone === null ? "" : this.telephone,
      creditrisk : 0,
      enable : true,
      requestedName : this.requestedName,
      price : this.precio
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      number : this.number,
      idSubscriber : this.idSubscriber,
      revealName : this.revealName,
      nameRevealed : this.revealName === true ? this.nameRevealed : "",
      referenceNumber : this.referenceNumber,
      language : this.language,
      queryCredit : this.queryCredit,
      timeLimit : this.timeLimit,
      aditionalData : this.aditionalData,
      about : this.about,
      orderDate : new Date(this.orderDateD),
      expireDate : new Date(this.expireDateD),
      realExpireDate : new Date(this.realExpireDateD),
      idContinent : this.idContinent,
      idCountry : this.idCountry,
      reportType : this.reportType,
      procedureType : this.procedureType,
      idCompany : this.idCompany,
      idPerson : 0,
      busineesName : this.busineesName === null ? "" : this.busineesName,
      comercialName : this.comercialName === null ? "" : this.comercialName,
      taxType : this.taxType === null ? "" : this.taxType,
      taxCode : this.taxCode === null ? "" : this.taxCode,
      email : this.email === null ? "" : this.email,
      address :  this.address === null ? "" : this.address,
      city : this.city === null ? "" : this.city,
      telephone : this.telephone === null ? "" : this.telephone,
      creditrisk : 0,
      enable : true,
      requestedName : this.requestedName,
      price : this.precio
    }
  }
  selectContinente(){
    this.abonadoService.getPaises(this.idSubscriber, this.idContinent).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          console.log(response.data)
          this.paisesAbonado = []
          this.paisesAbonado = response.data
          this.limpiarSeleccionPais()
        }
      })
  }
  mostrarBandera(){
    this.iconoSeleccionado = this.paisesAbonado.filter(x => x.id === this.idCountry)[0].bandera
    this.abonadoService.getPreciosPorPais(this.idSubscriber,this.idContinent,this.idCountry).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.listaPrecio = response.data
          }
        }
      )
  }
  selectFecha1(event: MatDatepickerInputEvent<Date>) { 
   
    this.orderDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.expireDateD = this.addDays(5,new Date(this.orderDateD));
      this.realExpireDateD = this.addDays(6,new Date(this.orderDateD));
      this.orderDate = this.formatDate(new Date(selectedDate));
    }
   
  }
  selectFecha2(event: MatDatepickerInputEvent<Date>) {
    this.expireDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.expireDate = this.formatDate(new Date(selectedDate));
    }
  }
  selectFecha3(event: MatDatepickerInputEvent<Date>) {
    this.realExpireDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.realExpireDate = this.formatDate(new Date(selectedDate));
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  tipotramite(){
    this.tipoTramite = this.listaPrecio.filter(x => x.name === this.procedureType)[0]
    this.precio = this.tipoTramite.price
    if(this.tipoTramite.price === 0){
      Swal.fire({
        title: 'El tipo de trámite seleccionado no tiene un precio asignado.',
        text: '',
        icon: 'warning',
        width: '30rem',
        heightAuto: true
      })
    }
  }
  limpiarSeleccionPais() {
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  revelarNombre(){
    if(this.revealName){
      this.nombre_abonado = "SI"
    }else{
      this.nombre_abonado = "NO"
      this.nombreAbonado = ""
    }
  }
  buscarAbonado() {
    this.codAbonado = '';
    this.idSubscriber=0;
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
            this.revealName = abonado.revealName
            this.nameRevealed = abonado.name
            this.estado = abonado.enable;
            this.indicacionesAbonado = abonado.indications;
            this.aditionalData = abonado.observations;
            this.language = abonado.language;
            this.tipoFacturacion=abonado.facturationType;
            this.remainingCoupons=abonado.remainingCoupons;
          }
        }
      }
     ).add(
      () => {
        this.abonadoService.getContinentes(this.idSubscriber).subscribe(
          (response) => {
          if(response.isSuccess == true){
            console.log(response)
            this.continentes = response.data;
            this.idContinent = 0
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
    
      if(data.idCompany > 0){
      this.loading = true;
      this.datosEmpresaService.getDatosEmpresaPorId(data.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const datosEmpresa = response.data
            if(datosEmpresa){
              this.idCompany = datosEmpresa.id
              this.busineesName = datosEmpresa.name
              this.comercialName = datosEmpresa.socialName
              this.taxType = datosEmpresa.taxTypeName
              this.taxCode = datosEmpresa.taxTypeCode
              this.email = datosEmpresa.email
              this.city = datosEmpresa.place
              this.address = datosEmpresa.address
              this.telephone = datosEmpresa.telephone
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
                  this.reportType = tipoReporte.typeReport
                  if(tipoReporte.lastSearchedDate !== "" && tipoReporte.lastSearchedDate !== null){
                    const lastSearched = tipoReporte.lastSearchedDate.split("/")
                    if(lastSearched.length > 0){
                      this.fechaInformeDate = new Date(parseInt(lastSearched[2]),parseInt(lastSearched[1])-1,parseInt(lastSearched[0]))
                    }else{
                      this.fechaInformeDate = null
                    }
                  }
                  this.dataSource.data = tipoReporte.listSameSearched
                  this.dataSource.sort = this.sort
                  this.dataSource.paginator = this.paginator
                  this.loading=false;
                }
              }
            }
          )
        }
      )
      }
    });
  }
  volver(){
    this.router.navigate(['pedidos/lista']);
  }

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
                this.revealName = abonado.revealName
                this.nameRevealed = abonado.name
                this.estado = abonado.enable;
                this.indicacionesAbonado = abonado.indications;
                this.aditionalData = abonado.observations;
                this.language = abonado.language;
                this.tipoFacturacion=abonado.facturationType;
                this.remainingCoupons=abonado.remainingCoupons;
              }
            }else{
              this.idSubscriber = 0
              this.codAbonado = ""
              this.revealName = false
              this.nameRevealed = ""
              this.estado = false
              this.indicacionesAbonado = ""
              this.aditionalData = ""
              this.language = ""
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

  guardar(){
    if(this.id === 0){
      this.armarModeloNuevo()
      console.log(this.modeloNuevo[0])
      Swal.fire({
        title: '¿Está seguro de guardar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('loader-detalle-cupon') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.ticketService.addTicket(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.router.navigate(['pedidos/lista']);
                })
                //this.id = response.data
              }
            }
          ).add(
            () => {
              if(loader){
                loader.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }else{
      this.armarModeloModificado()
      console.log(this.modeloModificado[0])
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('loader-detalle-cupon') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.ticketService.addTicket(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.router.navigate(['pedidos/lista']);
                })
                //this.id = response.data
              }
            }
          ).add(
            () => {
              if(loader){
                loader.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }

  }
}
