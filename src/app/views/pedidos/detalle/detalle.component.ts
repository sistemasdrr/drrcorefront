import { DatosEmpresa } from './../../../models/informes/empresa/datos-empresa';
import { EmpresaPersonaService } from 'app/services/empresa-persona.service';
import { PaisService } from './../../../services/pais.service';
import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BuscarAbonadoDialogComponent } from '@shared/components/buscar-abonado-dialog/buscar-abonado-dialog.component';
import { MatTableDataSource} from '@angular/material/table';
import { ReportesSolicitados } from 'app/models/informes/reportes-solicitados';
import { RequestedReportsService } from 'app/services/pedidos/reportes-solicitados.service';
import { BuscarEmpresaDialogComponent } from '@shared/components/buscar-empresa-dialog/buscar-empresa-dialog.component';
import { Abonado } from 'app/models/pedidos/abonado';
import { AbonadoService } from 'app/services/pedidos/abonado.service';
import { Pais } from 'app/models/pais';
import { PedidoService } from 'app/services/pedido.service';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'app/services/mantenimiento/personal.service';

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

  /**/
  paisSeleccionado : number =0
  iconoSeleccionado: string = ""
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

  //DATOS GENERALES
  informePara = "E"
  tipoTramite = ""
  fechaIngreso = ""
  fechaIngresoDate = new Date()
  fechaVencimiento = ""
  fechaVencimientoDate = new Date()
  fechaVencimientoReal = ""
  fechaVencimientoRealDate = new Date()
  fechaInforme = ""
  fechaInformeDate = new Date()
  //FORM ABONADO
  abonadoNoEncontrado = ""
  nombreAbonado = ""
  isChecked = true;
  pais = ""
  codigoPais = ""
  estado = ""
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
  riesgoCrediticioInforme = ""

  calificacionCrediticia : string[] = []

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
  continenteSeleccionado = 1
  tipoInformeSeleccionado = 1

  codAbonado: string = ''
  nombre_abonado : string = "SI"
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
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource()
    this.filterPaisAbonado = new Observable<Pais[]>()
    this.filterPaisEmpresa = new Observable<Pais[]>()
    this.filterPaisPersona = new Observable<Pais[]>()
  }
  ngOnInit() {
    this.pedidoService.getContinente().subscribe(response => {
      if(response.isSuccess == true){
        console.log(response)
        this.continentes = response.data;
      }
    });
    this.paisService.getPaises().subscribe(response => {
      if(response.isSuccess == true){
        this.paisesAbonado = response.data;
        this.paisesPersona = response.data;
      }else{
        this.snackBar.open('Ha ocurrido un problema en la conexión', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger',
        });
      }
    });
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
        return name ? this._filterPaisEmpresa(name as string) : this.paisesEmpresa.slice()
      }),
    )
    this.filterPaisPersona = this.controlPaisesPersona.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisPersona(name as string) : this.paisesPersona.slice()
      }),
    )
    this.actualizarContinente(this.continenteSeleccionado)

    this.tipo_formulario = this.activatedRoute.snapshot.paramMap.get('tipo');
    this.nmrCupon = this.activatedRoute.snapshot.paramMap.get('cupon');
    this.calificacionCrediticia = this.datosEmpresaService.getCalificacionCrediticia()

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
          active: (this.pedidoService.getLastNumCupon() + 1) + '',
        },
      ];
      this.nmrCupon = (this.pedidoService.getLastNumCupon() + 1) + ''
    }

    this.dataSource = new MatTableDataSource(this.requestedReportsService.getRequestedReports());
  }
  actualizarContinente(continente : number){
    this.paisEmpresa = {
      id : 0,
      valor : '',
      bandera : ''
    }
    this.pedidoService.getPaisPorContinente(continente).subscribe(response => {
      if(response.isSuccess == true){
        this.paisesEmpresa = response.data;
      }
    });
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
    }
  }
  TipoFormulario(tipo: string) {
    this.tipo_formulario = tipo;
  }

  getTipoFormulario(): string {
    return this.tipo_formulario || '';
  }

  getNmrCupon() {
    return this.nmrCupon;
  }

  buscarAbonado() {
    const dialogRef = this.dialog.open(BuscarAbonadoDialogComponent, {
    data: {
      mensaje: 'Abonado',
    },
  });
    dialogRef.afterClosed().subscribe((data) => {
      if (data.abonado) {
        console.log(data.abonado)
        this.codAbonado = data.abonado.codigo
        this.nombreAbonado = data.abonado.codigo + ' - ' + data.abonado.nombre
        this.paisAbonado = data.abonado.pais
        this.estado = data.abonado.estado
        this.nmrReferencia = data.abonado.nroReferencia
        this.creditoConsultado = data.abonado.creditoConsultado
        this.indicacionesAbonado = data.abonado.indicaciones
        this.datosAdicionales = data.abonado.dtsAdicionales
        this.abonadoNoEncontrado = "Abonado Encontrado"
      }
    });
  }
  buscarEmpresaPersona() {
    const dialogRef1 = this.dialog.open(BuscarEmpresaDialogComponent);
    dialogRef1.afterClosed().subscribe((informe) => {
      console.log(informe)
      if (informe.datosEmpresa) {
        this.razonSocialInforme = informe.datosEmpresa.razonSocial
        this.nombreComercialInforme = informe.datosEmpresa.nombreComercial
        this.tipoRT = informe.datosEmpresa.tipoRuc
        this.codigoRT = informe.datosEmpresa.codigoRuc
        this.correo = informe.datosEmpresa.emailCorporativo
        this.paisEmpresa = informe.datosEmpresa.pais
        this.ciudad = informe.datosEmpresa.dptoEstado
        this.direccion = informe.datosEmpresa.direccionCompleta
        this.telefono = informe.datosEmpresa.numeroTelefono
        const fechaInforme = informe.datosEmpresa.informeInvestigadoEl.split('/')
        this.fechaInformeDate = new Date(parseInt(fechaInforme[2]),(parseInt(fechaInforme[1])-1),parseInt(fechaInforme[0]))
        this.riesgoCrediticioInforme = informe.datosEmpresa.riesgoCrediticio
      }
    });
  }
  volver(){
    this.router.navigate(['pedidos/lista']);
  }

  asignarDatosAbonado() {
    const abonado: Abonado | null = this.abonadoService.getAbonadoPorCodigo(this.codAbonado);

    if (abonado !== null) {
      this.nombreAbonado = abonado.codigo + ' - ' + abonado.nombre;
      this.isChecked = abonado.revelarNombre;
      this.paisAbonado = abonado.pais
      this.estado = abonado.estado;
      this.nmrReferencia = abonado.nroReferencia;
      this.creditoConsultado = abonado.creditoConsultado;
      this.indicacionesAbonado = abonado.indicaciones;
      this.datosAdicionales = abonado.dtsAdicionales;
      this.abonadoNoEncontrado = "Abonado Encontrado"
    } else {
      this.nombreAbonado = ""
      this.isChecked = false
      this.paisAbonado = {
        id : 0,
        valor : '',
        bandera : ''
      }
      this.estado = ""
      this.nmrReferencia = ""
      this.creditoConsultado = ""
      this.indicacionesAbonado = ""
      this.datosAdicionales = ""
      this.abonadoNoEncontrado = "No se encontró el abonado"
    }
  }


}
