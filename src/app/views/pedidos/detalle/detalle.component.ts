import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BuscarAbonadoDialogComponent } from '@shared/components/buscar-abonado-dialog/buscar-abonado-dialog.component';
import { MatTableDataSource} from '@angular/material/table';
import { RequestedReports } from 'app/models/requested-reports';
import { RequestedReportsService } from 'app/services/requested-reports.service';
import { BuscarEmpresaDialogComponent } from '@shared/components/buscar-empresa-dialog/buscar-empresa-dialog.component';
import { Abonado } from 'app/models/abonado';
import { AbonadoService } from 'app/services/abonado.service';

interface Idioma {
  value: string;
  viewValue: string;
}
interface Continente {
  value: string;
  viewValue: string;
}
interface TipoInforme {
  value: string;
  viewValue: string;
}
interface TipoTramite {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  /**/
  nombreAbonado : string = ''
  isChecked = true;
  pais : string = ''
  codigoPais : string = ''
  estado : string = ''
  nmrReferencia : string = ''
  creditoConsultado : string = ''
  indicacionesAbonado : string = ''
  datosAdicionales : string = ''

  /**/
  idiomas: Idioma[] = [
    {value: 'SPANISH', viewValue: 'Español'},
    {value: 'ENGLISH', viewValue: 'Inglés'}
  ];
  continentes: Continente[] = [
    {value: 'AMERICA', viewValue: 'América'},
    {value: 'AFRICA', viewValue: 'Africa'},
    {value: 'ASIA', viewValue: 'Asia'},
    {value: 'EUROPA', viewValue: 'Europa'},
    {value: 'OCEANIA', viewValue: 'Oceanía'}
  ];
  tipoInformes: TipoInforme[] = [
    {value: 'RV', viewValue: 'RV'},
    {value: 'OR', viewValue: 'OR'}
  ];
  tipoTramites: TipoTramite[] = [
    {value: 'T1', viewValue: 'T1'},
    {value: 'T2', viewValue: 'T2'},
    {value: 'T3', viewValue: 'T3'},
    {value: 'T4', viewValue: 'T4'}
  ];

  idiomaSeleccionado = this.idiomas[0].value
  continenteSeleccionado = this.continentes[0].value
  tipoInformeSeleccionado = this.tipoInformes[0].value
  tipoTramiteSeleccionado = this.tipoTramites[0].value

  columnsToDisplay = ['tipo', 'cupon', 'nombreSolicitado', 'despacho', 'abonado', 'tramite', 'pais', 'balance', 'calidad', 'estado' ];
  dataSource: MatTableDataSource<RequestedReports>;

  public tipo_formulario: string | null = '';
  public formulario: string = '';
  public nmrCupon: string | null = '';

  codAbonado: string = ''

  nombre_abonado : string = "SI"
  breadscrums = [
    {
      title: '',
      items: [''],
      active: '',
    },
  ];



  revelarNombre(){
    if(this.isChecked){
      this.nombre_abonado = "SI"
    }else{
      this.nombre_abonado = "NO"
    }
  }

  ngOnInit() {
    this.tipo_formulario = this.activatedRoute.snapshot.paramMap.get('tipo');
    this.nmrCupon = this.activatedRoute.snapshot.paramMap.get('cupon');

    if (this.tipo_formulario == 'editar') {
      this.breadscrums = [
        {
          title: 'Editar Cupón',
          items: ['Home', 'Pedidos'],
          active: 'Editar',
        },
      ];
    } else if (this.tipo_formulario == 'agregar') {
      this.breadscrums = [
        {
          title: 'Nuevo Cupón',
          items: ['Home', 'Pedidos'],
          active: '1',
        },
      ];
    }
  }
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private requestedReportsService : RequestedReportsService,
    private router : Router,
    private abonadoService : AbonadoService
  ) {

    this.dataSource = new MatTableDataSource(this.requestedReportsService.getRequestedReports());
    console.log(this.dataSource)
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
    dialogRef.afterClosed().subscribe((codAbonado) => {
      if (codAbonado) {
        this.codAbonado = codAbonado.codigoAbonado
        this.asignarDatosAbonado()
      }
    });
  }
  buscarEmpresaPersona() {
    this.dialog.open(BuscarEmpresaDialogComponent);
  }
  volver(){
    this.router.navigate(['pedidos/lista']);
  }

  asignarDatosAbonado() {
    const abonado: Abonado | null = this.abonadoService.getAbonadoPorCodigo(this.codAbonado);

    if (abonado !== null) {
      this.nombreAbonado = abonado.codigo + ' - ' + abonado.nombre;
      this.isChecked = abonado.revelarNombre;
      this.pais = abonado.pais;
      this.codigoPais = abonado.codigoPais;
      this.estado = abonado.estado;
      this.nmrReferencia = abonado.nroReferencia;
      this.creditoConsultado = abonado.creditoConsultado;
      this.indicacionesAbonado = abonado.indicaciones;
      this.datosAdicionales = abonado.dtsAdicionales;
      console.log("Se está usando el código del abonado " + this.codAbonado);
    } else {
      console.log("No se encontró el abonado con el código " + this.codAbonado);
    }
  }


}
