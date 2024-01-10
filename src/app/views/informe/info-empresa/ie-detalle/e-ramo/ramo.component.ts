import { add } from '@ckeditor/ckeditor5-utils/src/translation-service';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CuadroImpoExpoComponent } from '@shared/components/cuadro-impo-expo/cuadro-impo-expo.component';
import { RamoActividadDialogComponent } from './ramo-actividad/ramo-actividad.component';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Observable, map, startWith } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Actividad } from 'app/models/informes/ramo-negocio';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { DialogComercioComponent } from './dialog-comercio/dialog-comercio.component';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';
import { ActivatedRoute } from '@angular/router';
import { RamoNegociosService } from 'app/services/informes/empresa/ramo-negocios.service';
import { CompanyBranch, WorkerHistory } from 'app/models/informes/empresa/ramo-negocios';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStates,
} from 'ng-apexcharts';

export interface data {
  name: string;
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  colors: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  states: ApexStates;
  fill: ApexFill;
};

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.scss']
})


export class RamoComponent implements OnInit{

  id = 0
  idCompany = 0
  idBranchSector = 0
  idBusinessBranch = 0
  idBusinessBranchN = ""
  import = false
  export = false

  cashSale = ""
  cashSalePercentage = 0
  cashSaleComentary = ""
  cashSaleComentaryEng = ""

  creditSale = ""
  creditSalePercentage = 0
  creditSaleComentary = ""
  creditSaleComentaryEng = ""

  territorySale = ""
  territorySalePercentage = 0
  territorySaleComentary = ""
  territorySaleComentaryEng = ""

  abroadSale = ""
  abroadSalePercentage = 0
  abroadSaleComentary = ""
  abroadSaleComentaryEng = ""

  nationalPurchase = ""
  nationalPurchasesPercentage = 0
  nationalPurchasesComentary = ""
  nationalPurchasesComentaryEng = ""

  internationPurchase = ""
  internationalPurchasesPercentage = 0
  internationalPurchasesComentary = ""
  internationalPurchasesComentaryEng = ""

  workerNumber = 0
  idLandOwnership = 0
  totalArea = ""
  totalAreaEng = ""
  previousAddress = ""
  otherLocations = ""
  otherLocationsEng = ""
  activityDetailCommentary = ""
  activityDetailCommentaryEng = ""
  aditionalCommentary = ""
  aditionalCommentaryEng = ""
  tabCommentary = ""
  countriesExport = ""
  countriesImport = ""
  specificActivities = ""

  modeloNuevo : CompanyBranch[] = []
  modeloModificado : CompanyBranch[] = []

  listaSectorPrincipal : ComboData[] = []
  listaRamoNegocio : ComboData[] = []
  listaActividadEspecifica : ComboData[] = []
  listaTitularidad : ComboData[] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];

  controlPaisesImpo = new FormControl<string | Pais>('')
  paisesImpo : Pais[] = []
  paisesSeleccionadosImpo : Pais[] = []
  filterPaisImpo : Observable<Pais[]>
  paisInformeImpo : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }

  controlPaisesExpo = new FormControl<string | Pais>('')
  paisesExpo : Pais[] = []
  paisesSeleccionadosExpo : Pais[] = []
  filterPaisExpo : Observable<Pais[]>
  paisInformeExpo : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }

  columnsWorkerHistory : string[] = ['numberYear', 'numberWorker','acciones']
  dataSourceWorkerHistory : MatTableDataSource<WorkerHistory>
  public areaChartOptions!: Partial<ChartOptions>;

  @ViewChild('paisExpoInput') paisExpoInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  public Editor: any = ClassicEditor;

  constructor(private dialog : MatDialog, private activatedRoute : ActivatedRoute,
    private paisService : PaisService, private comboService : ComboService, private ramoNegocioService : RamoNegociosService){

    this.filteredOptions = new Observable<data[]>()
    this.filterPaisImpo = new Observable<Pais[]>()
    this.filterPaisExpo = new Observable<Pais[]>()
    this.dataSourceWorkerHistory = new MatTableDataSource
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }
  }
  ngOnInit() {
    const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
    if(paginaDetalleEmpresa){
      paginaDetalleEmpresa.classList.remove('hide-loader');
    }
    this.paisService.getPaises().subscribe(data => {
      if(data.isSuccess == true){
        this.paisesImpo = data.data;
        this.paisesExpo = data.data;
      }
    }
    )
    this.comboService.getTitularidad().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaTitularidad = response.data
        }
      }
    )

    if(this.idCompany !== 0){
      this.ramoNegocioService.getListWorkerHistory(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceWorkerHistory.data = response.data
          }
        }
      )
      this.ramoNegocioService.getRamoNegocioByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const ramoNegocio = response.data
            if(ramoNegocio){
              this.id = ramoNegocio.id
              this.idBranchSector = ramoNegocio.idBranchSector
              this.idBusinessBranch = ramoNegocio.idBusinessBranch
              this.specificActivities = ramoNegocio.specificActivities
              this.import = ramoNegocio.import
              this.export = ramoNegocio.export
              this.cashSale = ramoNegocio.cashSalePercentage + '% | ' + ramoNegocio.cashSaleComentary
              this.cashSalePercentage = ramoNegocio.cashSalePercentage
              this.cashSaleComentary = ramoNegocio.cashSaleComentary

              this.creditSale = ramoNegocio.creditSalePercentage + '% | ' + ramoNegocio.creditSaleComentary
              this.creditSalePercentage = ramoNegocio.creditSalePercentage
              this.creditSaleComentary = ramoNegocio.creditSaleComentary

              this.territorySale = ramoNegocio.territorySalePercentage + '% | ' + ramoNegocio.territorySaleComentary
              this.territorySalePercentage = ramoNegocio.territorySalePercentage
              this.territorySaleComentary = ramoNegocio.territorySaleComentary

              this.abroadSale = ramoNegocio.abroadSalePercentage + '% | ' + ramoNegocio.abroadSaleComentary
              this.abroadSalePercentage = ramoNegocio.abroadSalePercentage
              this.abroadSaleComentary = ramoNegocio.abroadSaleComentary

              this.nationalPurchase = ramoNegocio.nationalPurchasesPercentage + '% | ' + ramoNegocio.nationalPurchasesComentary
              this.nationalPurchasesPercentage = ramoNegocio.nationalPurchasesPercentage
              this.nationalPurchasesComentary = ramoNegocio.nationalPurchasesComentary

              this.internationPurchase = ramoNegocio.internationalPurchasesPercentage + '% | ' + ramoNegocio.internationalPurchasesComentary
              this.internationalPurchasesPercentage = ramoNegocio.internationalPurchasesPercentage
              this.internationalPurchasesComentary = ramoNegocio.internationalPurchasesComentary

              this.workerNumber = ramoNegocio.workerNumber
              this.idLandOwnership = ramoNegocio.idLandOwnership
              this.totalArea = ramoNegocio.totalArea
              this.previousAddress = ramoNegocio.previousAddress
              this.otherLocations = ramoNegocio.otherLocations
              this.activityDetailCommentary = ramoNegocio.activityDetailCommentary
              this.aditionalCommentary = ramoNegocio.aditionalCommentary
              this.tabCommentary = ramoNegocio.tabCommentary

              if(ramoNegocio.traductions.length > 0){
                this.cashSaleComentaryEng = ramoNegocio.traductions[0].value
                this.creditSaleComentaryEng = ramoNegocio.traductions[1].value
                this.territorySaleComentaryEng = ramoNegocio.traductions[2].value
                this.abroadSaleComentaryEng = ramoNegocio.traductions[3].value
                this.nationalPurchasesComentaryEng = ramoNegocio.traductions[4].value
                this.internationalPurchasesComentaryEng = ramoNegocio.traductions[5].value
                this.totalAreaEng = ramoNegocio.traductions[6].value
                this.otherLocationsEng = ramoNegocio.traductions[7].value
                this.activityDetailCommentaryEng = ramoNegocio.traductions[8].value
                this.aditionalCommentaryEng = ramoNegocio.traductions[9].value
              }
              if(ramoNegocio.countriesImport !== '' && ramoNegocio.countriesImport !== null){
                this.countriesImport = ramoNegocio.countriesImport
                const paises = ramoNegocio.countriesImport.split(',')
                if(paises.length > 0){
                  paises.forEach(idPais => {
                    const pais = this.paisesImpo.filter(x => x.id === parseInt(idPais))[0]
                    if(pais){
                      this.paisesSeleccionadosImpo.push(pais)
                    }
                  });
                }
              }

              if(ramoNegocio.countriesExport.length > 0 && ramoNegocio.countriesExport !== null){
                this.countriesExport = ramoNegocio.countriesExport
                const paises = ramoNegocio.countriesExport.split(',')
                if(paises.length > 0){
                  paises.forEach(idPais => {
                    const pais = this.paisesExpo.filter(x => x.id === parseInt(idPais))[0]
                    if(pais){
                      this.paisesSeleccionadosExpo.push(pais)
                    }
                  });
                }
              }
            }
          }
        }
      ).add(
        () => {
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
        }
      )
    }else{
      if(paginaDetalleEmpresa){
        paginaDetalleEmpresa.classList.add('hide-loader');
      }
    }
    this.comboService.getSectorPrincipal().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaSectorPrincipal = response.data
        }
      }
    ).add(
      () => {
        this.comboService.getRamoNegocio().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.listaRamoNegocio = response.data
            }
          }
        ).add(
          () => {
            this.comboService.getActividadesEspecificas(this.idBusinessBranch).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                  this.listaActividadEspecifica = response.data
                }
              }
            )
          }
        )
      }
    )

    this.chart1();
    this.filterPaisImpo = this.controlPaisesImpo.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisImpo(name as string) : this.paisesImpo.slice()
      }),
    )
    this.filterPaisExpo = this.controlPaisesExpo.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPaisExpo(name as string) : this.paisesExpo.slice()
      }),
    )
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Clients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Clients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FC8380', '#6973C6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idBranchSector : this.idBranchSector,
      idBusinessBranch : this.idBusinessBranch,
      import : this.import,
      export : this.export,
      cashSalePercentage : this.cashSalePercentage,
      cashSaleComentary : this.cashSaleComentary,
      creditSalePercentage : this.creditSalePercentage,
      creditSaleComentary : this.creditSaleComentary,
      territorySalePercentage : this.territorySalePercentage,
      territorySaleComentary : this.territorySaleComentary,
      abroadSalePercentage : this.abroadSalePercentage,
      abroadSaleComentary : this.abroadSaleComentary,
      nationalPurchasesPercentage : this.nationalPurchasesPercentage,
      nationalPurchasesComentary : this.nationalPurchasesComentary,
      internationalPurchasesPercentage : this.internationalPurchasesPercentage,
      internationalPurchasesComentary : this.internationalPurchasesComentary,
      workerNumber : this.workerNumber,
      idLandOwnership : this.idLandOwnership,
      totalArea : this.totalArea,
      previousAddress : this.previousAddress,
      otherLocations : this.otherLocations,
      activityDetailCommentary : this.activityDetailCommentary,
      aditionalCommentary : this.aditionalCommentary,
      tabCommentary : this.tabCommentary,
      countriesExport : this.countriesExport,
      countriesImport : this.countriesImport,
      specificActivities : this.specificActivities,
      traductions : [
        {
          key : 'S_R_SALEPER',
          value : this.cashSaleComentaryEng
        },
        {
          key : 'S_R_CREDITPER',
          value : this.creditSaleComentaryEng
        },
        {
          key : 'S_R_TERRITORY',
          value : this.territorySaleComentaryEng
        },
        {
          key : 'S_R_EXTSALES',
          value : this.abroadSaleComentaryEng
        },
        {
          key : 'S_R_NATIBUY',
          value : this.nationalPurchasesComentaryEng
        },
        {
          key : 'S_R_INTERBUY',
          value : this.internationalPurchasesComentaryEng
        },
        {
          key : 'S_R_TOTALAREA',
          value : this.totalAreaEng
        },
        {
          key : 'L_R_OTRHERLOCALS',
          value : this.otherLocationsEng
        },
        {
          key : 'L_R_PRINCACT',
          value : this.activityDetailCommentaryEng
        },
        {
          key : 'L_R_ADIBUS',
          value : this.aditionalCommentaryEng
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idBranchSector : this.idBranchSector,
      idBusinessBranch : this.idBusinessBranch,
      import : this.import,
      export : this.export,
      cashSalePercentage : this.cashSalePercentage,
      cashSaleComentary : this.cashSaleComentary,
      creditSalePercentage : this.creditSalePercentage,
      creditSaleComentary : this.creditSaleComentary,
      territorySalePercentage : this.territorySalePercentage,
      territorySaleComentary : this.territorySaleComentary,
      abroadSalePercentage : this.abroadSalePercentage,
      abroadSaleComentary : this.abroadSaleComentary,
      nationalPurchasesPercentage : this.nationalPurchasesPercentage,
      nationalPurchasesComentary : this.nationalPurchasesComentary,
      internationalPurchasesPercentage : this.internationalPurchasesPercentage,
      internationalPurchasesComentary : this.internationalPurchasesComentary,
      workerNumber : this.workerNumber,
      idLandOwnership : this.idLandOwnership,
      totalArea : this.totalArea,
      previousAddress : this.previousAddress,
      otherLocations : this.otherLocations,
      activityDetailCommentary : this.activityDetailCommentary,
      aditionalCommentary : this.aditionalCommentary,
      tabCommentary : this.tabCommentary,
      countriesExport : this.countriesExport,
      countriesImport : this.countriesImport,
      specificActivities : this.specificActivities,
      traductions : [
        {
          key : 'S_R_SALEPER',
          value : this.cashSaleComentaryEng
        },
        {
          key : 'S_R_CREDITPER',
          value : this.creditSaleComentaryEng
        },
        {
          key : 'S_R_TERRITORY',
          value : this.territorySaleComentaryEng
        },
        {
          key : 'S_R_EXTSALES',
          value : this.abroadSaleComentaryEng
        },
        {
          key : 'S_R_NATIBUY',
          value : this.nationalPurchasesComentaryEng
        },
        {
          key : 'S_R_INTERBUY',
          value : this.internationalPurchasesComentaryEng
        },
        {
          key : 'S_R_TOTALAREA',
          value : this.totalAreaEng
        },
        {
          key : 'L_R_OTRHERLOCALS',
          value : this.otherLocationsEng
        },
        {
          key : 'L_R_PRINCACT',
          value : this.activityDetailCommentaryEng
        },
        {
          key : 'L_R_ADIBUS',
          value : this.aditionalCommentaryEng
        },
      ]
    }
  }

  private _filterPaisImpo(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesImpo.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filterPaisExpo(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paisesExpo.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayPais(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  displayFn(user: data): string {
    return user && user.name ? user.name : '';
  }

  addImpo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    event.chipInput!.clear();
    this.controlPaisesImpo.setValue(null);
  }

  removeImpo(pais: string): void {
    const deletePais = this.paisesSeleccionadosImpo.filter(x => x.valor === pais)
    if (deletePais.length > 0) {
      this.paisesSeleccionadosImpo = this.paisesSeleccionadosImpo.filter(x => x.valor !== pais)
      this.announcer.announce(`Se Removio  ${pais}`);
    }
  }
  selectedImpo(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)
    const pais = this.paisesImpo.filter(x => x.valor === event.option.value)[0]
    if(pais){
      const paisRepetido = this.paisesSeleccionadosImpo.filter(x => x.valor === event.option.value)[0]
      if(paisRepetido){
        console.log('Pais Repetido')
      }else{
        this.paisesSeleccionadosImpo.push(pais)
      }
    }
    this.paisExpoInput.nativeElement.value = '';
    this.controlPaisesImpo.setValue(null);
  }
  addExpo(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    event.chipInput!.clear();
    this.controlPaisesExpo.setValue(null);
  }

  removeExpo(pais: string): void {
    const deletePais = this.paisesSeleccionadosExpo.filter(x => x.valor === pais)
    if (deletePais.length > 0) {
      this.paisesSeleccionadosExpo = this.paisesSeleccionadosExpo.filter(x => x.valor !== pais)
      this.announcer.announce(`Se Removio  ${pais}`);
    }
  }
  selectedExpo(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)
    const pais = this.paisesExpo.filter(x => x.valor === event.option.value)[0]
    if(pais){
      const paisRepetido = this.paisesSeleccionadosExpo.filter(x => x.valor === event.option.value)[0]
      if(paisRepetido){
        console.log('Pais Repetido')
      }else{
        this.paisesSeleccionadosExpo.push(pais)
      }
    }
    this.paisExpoInput.nativeElement.value = '';
    this.controlPaisesExpo.setValue(null);
  }

  ramoActividadDialog() {
    const dialogRef1 = this.dialog.open(RamoActividadDialogComponent, {
      data: {
        idBusinessBranch : this.idBusinessBranch,
        specificActivities : this.specificActivities
        },
      });
    dialogRef1.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        this.idBusinessBranch = data.idBusinessBranch
        this.specificActivities = ''
        data.specificActivities.forEach((actividad : ComboData)  => {
          if(data.specificActivities[data.specificActivities.length-1] == actividad){
            this.specificActivities += actividad.valor
          }else{
            this.specificActivities += actividad.valor + ' - '
          }
        });
      }
    })
  }
  ImportacionDialog() {
    let dialogRef2 = this.dialog.open(CuadroImpoExpoComponent, {
      data: {
        titulo : "Importaciones",
        idCompany : this.idCompany,
        tipo : "I"
      },
    });
  }
  ExportacionDialog() {
    const dialogRef3 = this.dialog.open(CuadroImpoExpoComponent, {
      data: {
        titulo : "Exportaciones",
        idCompany : this.idCompany,
        tipo : "E"
      },
  });
  }
  comercioDialog(titulo : string, porcentaje : number, comentario : string, comentarioEng : string, input : string){
    const dialogRef1 = this.dialog.open(DialogComercioComponent, {
      data: {
        titulo : titulo,
        porcentaje : porcentaje,
        comentario : comentario,
        comentarioEng : comentarioEng,
        },
      });
    dialogRef1.afterClosed().subscribe(
      (data) => {
        if(data){
          switch(input){
            case 'cashSale':
              this.cashSalePercentage = data.porcentaje
              this.cashSaleComentary = data.comentario
              this.cashSaleComentaryEng = data.comentarioEng
              this.cashSale = this.cashSalePercentage + '% | ' + this.cashSaleComentary
              break
            case 'creditSale':
              this.creditSalePercentage = data.porcentaje
              this.creditSaleComentary = data.comentario
              this.creditSaleComentaryEng = data.comentarioEng
              this.creditSale = this.creditSalePercentage + '% | ' + this.creditSaleComentary
              break
            case 'territorySale':
              this.territorySalePercentage = data.porcentaje
              this.territorySaleComentary = data.comentario
              this.territorySaleComentaryEng = data.comentarioEng
              this.territorySale = this.territorySalePercentage + '% | ' + this.territorySaleComentary
              break
            case 'abroadSale':
              this.abroadSalePercentage = data.porcentaje
              this.abroadSaleComentary = data.comentario
              this.abroadSaleComentaryEng = data.comentarioEng
              this.abroadSale = this.abroadSalePercentage + '% | ' + this.abroadSaleComentary
              break
            case 'nationalPurchase':
              this.nationalPurchasesPercentage = data.porcentaje
              this.nationalPurchasesComentary = data.comentario
              this.nationalPurchasesComentaryEng = data.comentarioEng
              this.nationalPurchase = this.nationalPurchasesPercentage + '% | ' + this.nationalPurchasesComentary
              break
            case 'internationPurchase':
              this.internationalPurchasesPercentage = data.porcentaje
              this.internationalPurchasesComentary = data.comentario
              this.internationalPurchasesComentaryEng = data.comentarioEng
              this.internationPurchase = this.internationalPurchasesPercentage + '% | ' + this.internationalPurchasesComentary
              break
          }
        }
      }
    )
  }

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'Alquilado'}, {name: 'Comodato'}, {name: 'Compartido'}, {name: 'No Revelado'}, {name: 'Oficina Virtual'}, {name: 'Propio Cancelado'}, {name: 'Propio Pagandolo'}];
  filteredOptions: Observable<data[]>;

  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo : titulo,
      subtitulo : subtitulo,
      tipo : 'textarea',
      comentario_es : comentario_es,
      comentario_en : comentario_en

    },
  });
  dialogRef.afterClosed().subscribe((data) => {
    if (data) {
      console.log(data)
      switch(input){
        case 'otrosLocales':
        this.otherLocations = data.comentario_es;
        this.otherLocationsEng = data.comentario_en;
        break
        case 'comentarioActividadPrincipal':
        this.activityDetailCommentary = data.comentario_es;
        this.activityDetailCommentaryEng = data.comentario_en;
        break
        case 'comentarioNegocio':
        this.aditionalCommentary = data.comentario_es;
        this.aditionalCommentaryEng = data.comentario_en;
        break

      }
    }
  });
  }
  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en
      },
    });
  dialogRef.afterClosed().subscribe((data) => {
    if (data) {
      console.log(data)
      switch(input){

        case 'areaTotal':
        this.totalArea = data.comentario_es;
        this.totalAreaEng = data.comentario_en;
        break

      }
    }
  });
  }

  //TITULOS DE COMENTARIOS
  codEmpresa = "cod de empresa o nombre"
  titulo : string = 'Comentario - Traduccion'
  tituloImportacion : string = 'Importación en Países '
  tituloExportacion : string = 'Exportación en Países '
  tituloVentaContado : string = '% de Venta al Contado / Forma '
  tituloCreditoTerminos : string = '% de Créditos / Términos'
  tituloTerritorioVentas : string = 'Territorio de Ventas '
  tituloVentaExterior : string = '% de Ventas al Exterior '
  tituloComprasNacionales : string = '% de Compras Nacionales '
  tituloExterior : string = '% del Exterior'
  tituloAreaTotal : string = 'Área Total '
  tituloOtrosLocales : string = 'Otros Locales '
  subtituloOtrosLocales: string = 'Plantas, Almacenes, Depósitos y Sucursales'

  guardar(){
    if(this.id === 0){
      this.countriesImport = ""
      this.countriesExport = ""
      this.paisesSeleccionadosImpo.forEach(pais => {
        if(this.paisesSeleccionadosImpo[this.paisesSeleccionadosImpo.length-1] == pais){
          this.countriesImport += pais.id
        }else{
          this.countriesImport += pais.id + ','
        }
      });
      this.paisesSeleccionadosExpo.forEach(pais => {
        if(this.paisesSeleccionadosExpo[this.paisesSeleccionadosExpo.length-1] == pais){
          this.countriesExport += pais.id
        }else{
          this.countriesExport += pais.id + ','
        }
      });
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
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.ramoNegocioService.addRamoNegocio(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }else{
      this.countriesImport = ""
      this.countriesExport = ""
      this.paisesSeleccionadosImpo.forEach(pais => {
        if(this.paisesSeleccionadosImpo[this.paisesSeleccionadosImpo.length-1] == pais){
          this.countriesImport += pais.id
        }else{
          this.countriesImport += pais.id + ','
        }
      });
      this.paisesSeleccionadosExpo.forEach(pais => {
        if(this.paisesSeleccionadosExpo[this.paisesSeleccionadosExpo.length-1] == pais){
          this.countriesExport += pais.id
        }else{
          this.countriesExport += pais.id + ','
        }
      });
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
        width: '20rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.ramoNegocioService.addRamoNegocio(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }

  }
}
